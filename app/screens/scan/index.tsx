import {useIsFocused} from "@react-navigation/native";
import {BarCodeScanner, BarCodeScannerResult} from "expo-barcode-scanner";
import * as Haptics from "expo-haptics";
import {AspectRatio, Button, Flex, Input, KeyboardAvoidingView, Text, useColorModeValue, View, VStack} from "native-base";
import {Fragment, useContext, useEffect, useState} from "react";
import {useWindowDimensions} from "react-native";
import {screens} from "../../../constants/screens";
import {GlobalContext} from "../../../context/global/Provider";
import {GlobalActionEnum} from "../../../context/global/Reducer";
import {parseURL} from "../../../lib/parse";
import {isAndroid} from "../../../lib/platform";
import {showToast} from "../../../lib/toast";
import {ScreenProps} from "../../../lib/types";

export default function Scan({navigation}: ScreenProps) {
	const {state, dispatch} = useContext(GlobalContext);

	const [sessionID, setSessionID] = useState("");
	const [inputFocused, setInputFocused] = useState<boolean>(false);

	const {width} = useWindowDimensions();

	const focused = useIsFocused();
	const bg = useColorModeValue("muted.50", "muted.900");

	const getCameraPermissions = async () => {
		const {status} = await BarCodeScanner.requestPermissionsAsync();
		dispatch({
			type: GlobalActionEnum.TOGGLE_BARCODE_PERMISSION,
			payload: {hasBarCodePermission: status === "granted"},
		});
	};

	const handleScan = ({type, data}: BarCodeScannerResult) => {
		const session_id = parseURL(data);

		setSessionID(session_id);

		if (sessionID) {
			handleJoin();
		}
	};

	const handleJoin = () => {
		if (!sessionID) {
			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
			  .then()
			  .catch();
			return showToast("Error", "Oops! Invalid QR code", "error");
		}

		Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
		  .then()
		  .catch();
		return navigation.navigate(screens.CLEEPBOARD, {session_id: sessionID});
	};

	useEffect(() => {
		getCameraPermissions().then().catch()
	}, []);

	return (
	  <View flex={1}>
		  <KeyboardAvoidingView height="full" behavior="padding">
			  <View flex={1}>
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
								onBarCodeScanned={handleScan}
								style={{width: "100%", height: "100%"}}
							  />
							) : null}
						</AspectRatio>
						<VStack space={4} px={5} pb={!isAndroid && inputFocused ? 20 : 0}>
							<Text textAlign="center">
								Having trouble scanning the code?
							</Text>
							<Input
							  bg={bg}
							  textAlign="center"
							  variant="filled"
							  placeholder="Type in session ID here"
							  value={sessionID}
							  onChangeText={setSessionID}
							  onFocus={() => setInputFocused(true)}
							  onBlur={() => setInputFocused(false)}
							/>
							<Button
							  _text={{color: "primary"}}
							  _pressed={{opacity: 0.5}}
							  onPress={handleJoin}
							>
								Join session manually
							</Button>
						</VStack>
					</Fragment>
				  )}
			  </View>
		  </KeyboardAvoidingView>
	  </View>
	);
}