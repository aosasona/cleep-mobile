import { AntDesign } from "@expo/vector-icons";
import { Stack } from "expo-router";
import {
  ScrollView,
  Heading,
  HStack,
  IconButton,
  Icon,
  Box,
  Spinner,
  VStack,
  Text,
  AspectRatio,
} from "native-base";
import { useContext, useState } from "react";
import { RefreshControl, useWindowDimensions } from "react-native";
import CustomSafeAreaView from "../../components/custom/CustomSafeAreaView";
import { GlobalContext } from "../../context/global/Provider";
import Lottie from "lottie-react-native";
import { GlobalActionEnum } from "../../context/global/Reducer";
import { showToast } from "../../lib/toast";

export default function Home() {
  const { state, dispatch } = useContext(GlobalContext);
  const { height, width } = useWindowDimensions();

  const [refreshing, setRefreshing] = useState(false);

  const lottieWidth = width * 0.6;

  const onRefresh = () => {
    try {
      setRefreshing(true);
      dispatch({ type: GlobalActionEnum.LOAD_SESSIONS, payload: {} });
    } catch (error) {
      showToast("Error", "Failed to refresh", "error");
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <CustomSafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Stack.Screen options={{ headerShown: false }} />
        <HStack justifyContent="space-between" alignItems="center">
          <Heading fontSize={32} mt={2}>
            Sessions
          </Heading>
          <IconButton
            icon={<Icon as={AntDesign} name="pluscircleo" />}
            _icon={{ size: "md", color: "primary" }}
            _pressed={{ opacity: 0.5 }}
          />
        </HStack>

        {state.isLoadingSessions ? (
          <Box height={100} justifyContent="center">
            <Spinner color="primary" />
          </Box>
        ) : state.sessions?.length > 0 ? (
          <></>
        ) : (
          <Box
            height={height * 0.7}
            alignItems="center"
            justifyContent="center"
          >
            <VStack space={2}>
              <AspectRatio
                w={lottieWidth > 200 ? lottieWidth : 250}
                ratio={1}
                mx="auto"
              >
                <Box>
                  <Lottie
                    source={require("../../assets/lottie/empty.json")}
                    autoPlay={true}
                    loop={true}
                  />
                </Box>
              </AspectRatio>
              <Heading textAlign="center">No sessions</Heading>
              <Text
                fontSize={14}
                maxW={width * 0.75}
                textAlign="center"
                opacity={0.5}
              >
                Looks like you have not joined any Cleep sessions on this
                device.
              </Text>
            </VStack>
          </Box>
        )}
      </ScrollView>
    </CustomSafeAreaView>
  );
}
