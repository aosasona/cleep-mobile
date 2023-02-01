import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { screens } from "../../constants/screens";
import Scan from "../screens/scan";

export default function ScanStack() {
	const Stack = createNativeStackNavigator();

	const screenOptions = {
		headerShown: false,
		headerShadowVisible: false,
	};

	return (
		<Stack.Navigator screenOptions={screenOptions}>
			<Stack.Screen name={screens.SCAN} component={Scan} />
		</Stack.Navigator>
	);
}
