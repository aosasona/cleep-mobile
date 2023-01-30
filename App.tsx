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
import * as SplashScreen from "expo-splash-screen";
import {NativeBaseProvider} from "native-base";
import {useEffect, useState} from "react";
import {SafeAreaProvider} from "react-native-safe-area-context";
import MainStack from "./app/stacks/main";
import {GlobalProvider} from "./context/global/Provider";
import {colorModeManager, extendedTheme} from "./lib/configs/theme";
import {migrate} from "./lib/db/database";

(async () => await SplashScreen.preventAutoHideAsync())();

export default function AppEntry() {
	const [navReady, setNavReady] = useState(false);
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

	useEffect(() => {
		(async () => {
			if (fontsLoaded && navReady && appIsReady) {
				await SplashScreen.hideAsync();
			}
		})();
	}, [fontsLoaded, navReady, appIsReady]);

	const onNavReady = () => {
		setNavReady(true);
	}

	if (!appIsReady) {
		return null;
	}


	return (
	  <NativeBaseProvider
		colorModeManager={colorModeManager}
		theme={extendedTheme}
	  >
		  <GlobalProvider>
			  <SafeAreaProvider>
				  <MainStack onNavReady={onNavReady}/>
			  </SafeAreaProvider>
		  </GlobalProvider>
	  </NativeBaseProvider>
	);
}