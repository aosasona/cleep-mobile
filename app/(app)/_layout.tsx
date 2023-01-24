import { Route } from "@react-navigation/native";
import { Tabs } from "expo-router";
import { Box, ColorMode, Icon, useColorMode, View } from "native-base";
import { useMemo } from "react";
import { appColors } from "../../lib/theme";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { isAndroid } from "../../lib/platform";
import { StatusBar } from "expo-status-bar";
import CustomHeader from "../../components/custom/CustomHeader";
import CustomHeaderTitle from "../../components/custom/CustomHeaderTitle";

interface TabIconProps {
  focused: boolean;
  route: Route<any>;
  colorMode: ColorMode;
}

function TabIcon({ focused, route, colorMode }: TabIconProps) {
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
      size={5}
    />
  );
}

export default function AppLayout() {
  const { colorMode } = useColorMode();

  const screenOptions = {
    headerShown: true,
    headerShadowVisible: false,
    headerBackground: () => <CustomHeader />,
    headerTitle: (props: any) => <CustomHeaderTitle {...props} />,
    tabBarLabel: () => null,
    tabBarActiveTintColor: appColors.primary,
    tabBarStyle: {
      height: isAndroid ? 70 : 85,
      backgroundColor: colorMode === "dark" ? appColors.dark : appColors.light,
      borderTopWidth: 0,
    },
  };

  return (
    <>
      <StatusBar style={colorMode === "dark" ? "light" : "dark"} />
      <Tabs
        screenOptions={({ route }) => ({
          ...screenOptions,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} route={route} colorMode={colorMode} />
          ),
        })}
      >
        <Tabs.Screen name="index" options={{ title: "Home" }} />
        <Tabs.Screen name="scan" options={{ title: "Scan" }} />
        <Tabs.Screen name="settings" options={{ title: "Settings" }} />
      </Tabs>
    </>
  );
}
