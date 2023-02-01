import { ScrollView, Text } from "native-base";
import CustomSafeAreaView from "../../../components/custom/CustomSafeAreaView";
import { ScreenProps } from "../../../lib/types";

export default function Cleepboard({ navigation, route }: ScreenProps) {
    const { session_id } = route.params as any;

    if (!session_id) {
        navigation.goBack();
    }

    return (
        <CustomSafeAreaView>
            <ScrollView>
                <Text>{session_id}</Text>
            </ScrollView>
        </CustomSafeAreaView>
    );
}
