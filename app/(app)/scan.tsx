import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Heading,
  Text,
  View,
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

  useEffect(() => {
    getCameraPermissions();
  }, []);

  return (
    <CustomSafeAreaView>
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
              _dark={{ borderColor: "muted.900" }}
              _light={{ borderColor: "muted.50" }}
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
            <Box>
              <Text textAlign="center">Having trouble scanning the code?</Text>
              <Button
                _text={{ color: "primary" }}
                _pressed={{ opacity: 0.5 }}
                p={4}
              >
                Enter ID manually
              </Button>
            </Box>
          </Fragment>
        )}
      </View>
    </CustomSafeAreaView>
  );
}
