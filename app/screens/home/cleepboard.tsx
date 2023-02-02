import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
    Box,
    Flex,
    HStack,
    Icon,
    IconButton,
    ScrollView,
    Spinner,
    Text,
    useDisclose,
    View,
} from "native-base";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Alert } from "react-native";
import CustomSafeAreaView from "../../../components/custom/CustomSafeAreaView";
import { appColors } from "../../../lib/configs/theme";
import { getSessionBySessionID } from "../../../lib/db/session";
import CustomException, { handleException } from "../../../lib/error";
import { WEB_URL } from "../../../lib/requests/api";
import { getPassSSKey } from "../../../lib/storage/keys";
import SecureStore from "../../../lib/storage/secure";
import { ScreenProps } from "../../../lib/types";
import ConnectionSheet from "../../../components/sessions/ConnectionSheet";
import StatusIndicator from "../../../components/sessions/StstusIndicator";

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
    const [session, setSession] = useState<SessionState>({
        session_id: "",
        signing_key: "",
        ttl: 0,
    });

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

    const connectionUrl = `https://${WEB_URL}/connect?sessionID=${session_id}`;

    if (loading) {
        return (
            <CustomSafeAreaView>
                <Flex flex={1} alignItems="center" justifyContent="center">
                    <Spinner size="lg" color="primary" />
                </Flex>
            </CustomSafeAreaView>
        );
    }

    return (
        <View flex={1}>
            <ScrollView>
                <Text>{session_id}</Text>
            </ScrollView>
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
