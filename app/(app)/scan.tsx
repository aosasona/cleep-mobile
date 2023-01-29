import {
  AspectRatio,
  Button,
  Flex,
  Input,
  KeyboardAvoidingView,
  Text,
  useColorModeValue,
  View,
  VStack,
} from "native-base";
import { BarCodeScanner } from "expo-barcode-scanner";
import CustomSafeAreaView from "../../components/custom/CustomSafeAreaView";
import { Fragment, useContext, useEffect } from "react";
import { GlobalContext } from "../../context/global/Provider";
import { GlobalActionEnum } from "../../context/global/Reducer";
import { useWindowDimensions } from "react-native";
import { Stack } from "expo-router";
import { useIsFocused } from "@react-navigation/native";

export default function Scan() {
  const { state, dispatch } = useContext(GlobalContext);

  const { width } = useWindowDimensions();

  const getCameraPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    dispatch({
      type: GlobalActionEnum.TOGGLE_BARCODE_PERMISSION,
      payload: { hasBarCodePermission: status === "granted" },
    });
  };

  const focused = useIsFocused();

  const bg = useColorModeValue("muted.50", "muted.900");

  useEffect(() => {
    getCameraPermissions();
  }, []);

  return (
    <CustomSafeAreaView>
      <KeyboardAvoidingView height="full" behavior="padding">
        <Stack.Screen options={{ headerShown: false }} />
        <View flex={1} justifyContent="center">
          {!state.hasBarCodePermission ? (
            <Flex flex={1} alignItems="center" justifyContent="center">
              <Text opacity={0.5}>Permission not granted to app</Text>
            </Flex>
          ) : (
            <Fragment>
              <Text maxW="80%" textAlign="center" mx="auto">
                Go to <Text color="primary">cleep.app</Text> or create a session
                on another device to get the QR code
              </Text>
              <AspectRatio
                width={width * 0.9}
                ratio={1}
                borderWidth={2}
                borderColor={bg}
                mx="auto"
                rounded={24}
                overflow="hidden"
                my={10}
              >
                {focused ? (
                  <BarCodeScanner
                    type="back"
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : null}
              </AspectRatio>
              <VStack space={4} px={5}>
                <Text textAlign="center">
                  Having trouble scanning the code?
                </Text>
                <Input
                  bg={bg}
                  textAlign="center"
                  variant="filled"
                  placeholder="Type in session ID here"
                />
                <Button
                  _text={{ color: "primary" }}
                  _pressed={{ opacity: 0.5 }}
                >
                  Join session manually
                </Button>
              </VStack>
            </Fragment>
          )}
        </View>
      </KeyboardAvoidingView>
    </CustomSafeAreaView>
  );
}
