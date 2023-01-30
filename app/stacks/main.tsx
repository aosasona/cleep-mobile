import {AntDesign, Ionicons} from "@expo/vector-icons";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer, Route} from "@react-navigation/native";
import {StatusBar} from "expo-status-bar";
import {ColorMode, Icon, useColorMode} from "native-base";
import React from "react";
import CustomHeader from "../../components/custom/CustomHeader";
import CustomHeaderTitle from "../../components/custom/CustomHeaderTitle";
import {tabs} from "../../constants/tabs";
import {appColors} from "../../lib/configs/theme";
import {isAndroid} from "../../lib/platform";
import HomeStack from "./home";
import ScanStack from "./scan";
import SettingsStack from "./settings";

interface MainStackProps {
	onNavReady: () => void;
}

interface TabIconProps {
	focused: boolean;
	route: Route<any>;
	colorMode: ColorMode;
}

function TabIcon({focused, route, colorMode}: TabIconProps) {
	const icons = {
		[tabs.HOME]: {
			component: AntDesign,
			name: "home",
		},
		[tabs.SCAN]: {
			component: Ionicons,
			name: "scan",
		},
		[tabs.SETTINGS]: {
			component: Ionicons,
			name: "settings-outline",
		},
	};

	const color = focused
	  ? appColors.primary
	  : colorMode == "dark"
		? appColors["dark-faded"]
		: appColors["light-faded"];

	const name = icons[route.name]?.name
	const as = icons[route.name]?.component

	return (
	  <Icon
		name={name}
		as={as}
		color={color}
		size={5}
	  />
	);
}


export default function MainStack({
	onNavReady,
}: MainStackProps) {
	const {colorMode} = useColorMode();

	const screenOptions = {
		headerShown: false,
		headerShadowVisible: false,
		headerBackground: () => <CustomHeader/>,
		headerTitle: (props: any) => <CustomHeaderTitle>{props.title}</CustomHeaderTitle>,
		tabBarLabel: () => null,
		tabBarActiveTintColor: appColors.primary,
		tabBarInactiveTintColor: colorMode === "dark" ? appColors["dark-faded"] : appColors["light-faded"],

		tabBarStyle: {
			height: isAndroid ? 70 : 85,
			backgroundColor: colorMode === "dark" ? appColors.dark : appColors.light,
			borderTopWidth: 0,
		},
	};

	const Tab = createBottomTabNavigator();

	return (
	  <>
		  <StatusBar
			animated={true}
			style={colorMode === "dark" ? "light" : "dark"}
		  />

		  <NavigationContainer onReady={onNavReady}>
			  <Tab.Navigator
				initialRouteName={tabs.HOME}
				backBehavior="history"
				screenOptions={({route}) => ({
					...screenOptions,
					tabBarIcon: ({focused}) => (
					  <TabIcon focused={focused} route={route} colorMode={colorMode}/>
					),
				})}>
				  <Tab.Screen
					name={tabs.HOME}
					component={HomeStack}
				  />
				  <Tab.Screen
					name={tabs.SCAN}
					component={ScanStack}
				  />
				  <Tab.Screen
					name={tabs.SETTINGS}
					component={SettingsStack}
				  />
			  </Tab.Navigator>
		  </NavigationContainer>
	  </>
	);
}