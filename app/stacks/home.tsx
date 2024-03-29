import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CustomHeader from "../../components/custom/CustomHeader";
import CustomHeaderTitle from "../../components/custom/CustomHeaderTitle";
import { screens } from "../../constants/screens";
import { appColors } from "../../lib/configs/theme";
import Create from "../screens/cleep/create";
import Home from "../screens/home";
import Cleepboard from "../screens/home/cleepboard";

export default function HomeStack() {
	const Stack = createNativeStackNavigator();

	const screenOptions = {
		headerShown: false,
		headerShadowVisible: false,
		headerBackground: () => <CustomHeader />,
		headerTitle: (props: any) => (
			<CustomHeaderTitle>{props.title}</CustomHeaderTitle>
		),
	};

	return (
		<Stack.Navigator screenOptions={screenOptions}>
			<Stack.Screen name={screens.HOME} component={Home} />
			<Stack.Screen name={screens.CLEEPBOARD} component={Cleepboard} />
			<Stack.Screen
				name={screens.ADD_CLEEP}
				component={Create}
				options={{
					title: "Manage",
					headerShown: true,
					headerTintColor: appColors.primary,
				}}
			/>
		</Stack.Navigator>
	);
}
