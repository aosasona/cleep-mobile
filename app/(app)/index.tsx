import { Stack } from "expo-router";
import { ScrollView, Heading } from "native-base";
import CustomSafeAreaView from "../../components/custom/CustomSafeAreaView";

export default function Home() {
  return (
    <CustomSafeAreaView>
      <ScrollView>
        <Stack.Screen options={{ headerShown: false }} />
        <Heading fontSize={32} mt={2}>
          Sessions
        </Heading>
      </ScrollView>
    </CustomSafeAreaView>
  );
}
