import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React from "react";
import CustomHeader from "../../components/custom/CustomHeader";
import CustomHeaderTitle from "../../components/custom/CustomHeaderTitle";
import {screens} from "../../constants/screens";
import Scan from "../screens/scan";

export default function ScanStack() {
	const Stack = createNativeStackNavigator();

	const screenOptions = {
		headerShown: false,
		headerShadowVisible: false,
		headerBackground: () => <CustomHeader/>,
		headerTitle: (props: any) => <CustomHeaderTitle {...props} />,
	}

	return (
	  <Stack.Navigator screenOptions={screenOptions}>
		  <Stack.Screen
			name={screens.SCAN}
			component={Scan}
		  />
	  </Stack.Navigator>
	)
}