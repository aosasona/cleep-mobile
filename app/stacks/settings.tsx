import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React from "react";
import CustomHeader from "../../components/custom/CustomHeader";
import CustomHeaderTitle from "../../components/custom/CustomHeaderTitle";
import {screens} from "../../constants/screens";
import Settings from "../screens/settings";

export default function SettingsStack() {
	const Stack = createNativeStackNavigator();

	const screenOptions = {
		headerShown: true,
		headerShadowVisible: false,
		headerBackground: () => <CustomHeader/>,
		headerTitle: (props: any) => <CustomHeaderTitle {...props} />,
	}

	return (
	  <Stack.Navigator screenOptions={screenOptions}>
		  <Stack.Screen
			name={screens.SETTINGS}
			component={Settings}
		  />
	  </Stack.Navigator>
	)
}