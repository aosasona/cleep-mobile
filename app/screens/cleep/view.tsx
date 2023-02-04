import { View } from "native-base";
import { Cleep, ScreenProps } from "../../../lib/types";

export default function ViewCleep({ navigation, route }: ScreenProps) {
  const data = (route.params as any)?.data as Cleep;

  if (!data) {
    navigation.goBack();
  }

  return <View></View>;
}
