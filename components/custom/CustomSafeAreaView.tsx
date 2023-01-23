import { StatusBar } from "expo-status-bar";
import { useColorMode } from "native-base";
import React, { Fragment } from "react";
import SafeAreaView from "react-native-safe-area-view";
import { appColors } from "../../lib/theme";

interface CustomSafeAreaViewProps {
  children: React.ReactNode;
}

export default function CustomSafeAreaView({
  children,
}: CustomSafeAreaViewProps) {
  const { colorMode } = useColorMode();

  return (
    <Fragment>
      <StatusBar style={colorMode == "dark" ? "light" : "dark"} />
      <SafeAreaView
        forceInset={{ top: "always" }}
        style={{
          flex: 1,
          backgroundColor:
            colorMode == "dark" ? appColors.dark : appColors.light,
        }}
      >
        {children}
      </SafeAreaView>
    </Fragment>
  );
}
