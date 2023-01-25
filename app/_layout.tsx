import { SplashScreen, Stack } from "expo-router";
import { appColors } from "../lib/theme";
import { useEffect, useState } from "react";
import { NativeBaseProvider } from "native-base";
import { colorModeManager, extendedTheme } from "../lib/theme";
import {
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
  useFonts,
} from "@expo-google-fonts/poppins";
import { GlobalProvider } from "../context/global/Provider";
import { migrate } from "../lib/database";

export default function AppEntry() {
  const [appIsReady, setAppIsReady] = useState(false);
  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
  });

  useEffect(() => {
    if (fontsLoaded) {
      setAppIsReady(true);
    }
  }, [fontsLoaded]);

  useEffect(() => {
    migrate();
  }, []);

  if (!appIsReady) {
    return <SplashScreen />;
  }

  return (
    <NativeBaseProvider
      colorModeManager={colorModeManager}
      theme={extendedTheme}
    >
      <GlobalProvider>
        <Stack
          initialRouteName="app"
          screenOptions={{
            headerShown: false,
            headerTintColor: appColors.primary,
            headerBackTitleVisible: false,
          }}
        />
      </GlobalProvider>
    </NativeBaseProvider>
  );
}
