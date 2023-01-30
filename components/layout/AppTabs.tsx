import {AntDesign, Ionicons} from "@expo/vector-icons";
import {Route} from "@react-navigation/native";
import {Tabs} from "expo-router";
import {ColorMode, Icon, useColorMode} from "native-base";
import {useMemo} from "react";
import {appColors} from "../../lib/configs/theme";
import {isAndroid} from "../../lib/platform";

interface TabIconProps {
	focused: boolean;
	route: Route<any>;
	colorMode: ColorMode;
}

function TabIcon({focused, route, colorMode}: TabIconProps) {
	const icons = {
		index: {
			component: AntDesign,
			name: "home",
		},
		scan: {
			component: Ionicons,
			name: "scan",
		},
		settings: {
			component: Ionicons,
			name: "settings-outline",
		},
	};

	const color = focused
	  ? appColors.primary
	  : colorMode == "dark"
		? appColors["dark-faded"]
		: appColors["light-faded"];

	return (
	  <Icon
		name={icons[route.name]?.name}
		as={icons[route.name]?.component}
		color={color}
	  />
	);
}

export default function AppTabs() {
	const {colorMode} = useColorMode();

	const screenOptions = useMemo(
	  () => ({
		  headerShown: false,
		  tabBarLabel: () => null,
		  headerShadowVisible: false,
		  tabBarActiveTintColor: appColors.primary,
		  tabBarStyle: {
			  height: isAndroid ? 65 : 80,
			  backgroundColor:
				colorMode === "dark" ? appColors.dark : appColors.light,
		  },
	  }),
	  [],
	);
	return (
	  <Tabs
		screenOptions={({route}) => ({
			...screenOptions,
			tabBarIcon: ({focused}) => (
			  <TabIcon focused={focused} route={route} colorMode={colorMode}/>
			),
		})}
	  >
		  <Tabs.Screen name="home" options={{title: "Home"}}/>
		  <Tabs.Screen name="scan" options={{title: "Scan"}}/>
		  <Tabs.Screen name="settings" options={{title: "Settings"}}/>
	  </Tabs>
	);
}