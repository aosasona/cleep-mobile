import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import {
    Fab,
    Flex,
    HStack,
    Icon,
    IconButton,
    Spinner,
    useDisclose,
    View,
} from "native-base";
import { useEffect, useLayoutEffect, useState } from "react";
import { Alert } from "react-native";
import CustomSafeAreaView from "../../../components/custom/CustomSafeAreaView";
import { appColors } from "../../../lib/configs/theme";
import { getSessionBySessionID } from "../../../lib/db/session";
import CustomException, { handleException } from "../../../lib/error";
import { WEB_URL } from "../../../lib/requests/api";
import { getPassSSKey } from "../../../lib/storage/keys";
import SecureStore from "../../../lib/storage/secure";
import { Cleep, ScreenProps } from "../../../lib/types";
import ConnectionSheet from "../../../components/sessions/ConnectionSheet";
import StatusIndicator from "../../../components/sessions/StatusIndicator";
import { initSocket } from "../../../lib/realtime/socket";
import { handleSocketEvent } from "../../../lib/realtime/handler";
import { showToast } from "../../../lib/toast";
import { MasonryFlashList } from "@shopify/flash-list";
import CleepCard from "../../../components/cleeps/CleepCard";
import Ghost from "../../../components/sessions/Ghost";

interface SessionState {
    session_id: string;
    signing_key: string;
    ttl: number;
}

export default function Cleepboard({ navigation, route }: ScreenProps) {
    const { session_id } = route.params as any;

    if (!session_id) {
        navigation.goBack();
    }

    const { isOpen, onOpen, onClose } = useDisclose();

    const [loading, setLoading] = useState(true);
    const [connected, setConnected] = useState(false);
    const [retrying, setRetrying] = useState(false);
    const [reconnectionCount, setReconnectionCount] = useState(0);
    const [hasFetchedOnce, setHasFetchedOnce] = useState(false);
    const [cleeps, setCleeps] = useState<Cleep[]>([]);
    const [session, setSession] = useState<SessionState>({
        session_id: "",
        signing_key: "",
        ttl: 0,
    });
    const [error, setError] = useState<Error | CustomException>(null);

    useEffect(() => {
        (async () => await loadSessionData())();
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: "",
            headerTintColor: appColors.primary,
            headerRight: () => (
                <HStack>
                    <QRButton onOpen={onOpen} />
                </HStack>
            ),
        });
    }, [navigation]);

    async function loadSessionData(toggleLoading: boolean = true) {
        try {
            if (!loading && toggleLoading) setLoading(true);
            const data = getSessionBySessionID(session_id);
            const key = await SecureStore.get<string>(getPassSSKey(session_id));

            if (!(data && key)) {
                throw new CustomException("Missing required data!");
            }

            setSession((prev) => ({
                ...prev,
                session_id: data.session_id,
                signing_key: key,
                ttl: data.duration,
            }));
        } catch (err: any) {
            const msg = handleException(err);
            Alert.alert("Error", msg);
            navigation.goBack();
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!error) return;
        const msg = handleException(error);
        showToast("Error", msg, "error");
        setTimeout(() => setError(null), 5000);
    }, [error]);

    useEffect(() => {
        const { session_id, signing_key } = session;

        if (!(session_id && signing_key)) return;

        const socket = initSocket({
            session_id,
            signing_key,
            reconnection_count: reconnectionCount,
        });

        socket.connect();

        handleSocketEvent({
            socket,
            session: { session_id, signing_key },
            data: cleeps,
            setData: setCleeps,
            hasFetchedOnce,
            toggleConnectionStatus: setConnected,
            reconnectionCount,
            setReconnectionCount,
            onFetch: () => setHasFetchedOnce(true),
            onError: (err) => {
                setError(err);
            },
            startRetrying: () => setRetrying(true),
            stopRetrying: () => setRetrying(false),
        });

        return () => {
            socket.disconnect();
        };
    }, [session.session_id, session.signing_key, loading]);

    const connectionUrl = `https://${WEB_URL}/connect?sessionID=${session_id}`;

    if (loading || !connected) {
        return (
            <CustomSafeAreaView>
                <Flex flex={1} alignItems="center" justifyContent="center">
                    <Spinner size="lg" color="primary" />
                </Flex>
            </CustomSafeAreaView>
        );
    }

    return (
        <View flex={1} pl={3}>
            <MasonryFlashList
                data={cleeps}
                renderItem={({ item }) => <CleepCard key={item.id} cleep={item} />}
                numColumns={2}
                estimatedItemSize={200}
                ListEmptyComponent={() => (
                    <Ghost
                        headerText="Yikes!"
                        message="Good news is, it looks like you're connected. Bad news is, there's nothing on your Cleepboard."
                    />
                )}
            />
            <Fab
                renderInPortal={false}
                shadow={3}
                bottom={6}
                right={6}
                bg="primary"
                icon={<Icon color="muted.50" as={AntDesign} name="plus" size="2xl" />}
            />
            <StatusIndicator retrying={retrying} connected={connected} />
            <ConnectionSheet url={connectionUrl} isOpen={isOpen} onClose={onClose} />
        </View>
    );
}

export function QRButton({ onOpen }: { onOpen: () => void }) {
    return (
        <IconButton
            icon={<Icon as={MaterialCommunityIcons} name="qrcode-scan" />}
            _icon={{ size: 5, color: "primary" }}
            _pressed={{ opacity: 0.5 }}
            onPress={onOpen}
        />
    );
}
