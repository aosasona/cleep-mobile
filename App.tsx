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
import { NativeBaseProvider } from "native-base";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MainStack from "./app/stacks/main";
import { GlobalProvider } from "./context/global/Provider";
import { colorModeManager, extendedTheme } from "./lib/configs/theme";
import { migrate } from "./lib/db/database";

(async () => await SplashScreen.preventAutoHideAsync())();

export default function App() {
	const [navReady, setNavReady] = useState(false);
	const [appIsReady, setAppIsReady] = useState(false);
	const [migrationComplete, setMigrationComplete] = useState(false);
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
		migrate();
		setMigrationComplete(true);
	}, []);

	useEffect(() => {
		(async () => {
			if (appIsReady && navReady && migrationComplete) {
				await SplashScreen.hideAsync();
			}
		})();
	}, [appIsReady, navReady, migrationComplete]);

	const onNavReady = () => {
		setNavReady(true);
	};

	if (!fontsLoaded) {
		return null;
	}

	return (
		<View style={{ flex: 1 }} onLayout={() => setAppIsReady(true)}>
			<NativeBaseProvider
				colorModeManager={colorModeManager}
				theme={extendedTheme}
			>
				<GlobalProvider>
					<SafeAreaProvider>
						<MainStack onNavReady={onNavReady} />
					</SafeAreaProvider>
				</GlobalProvider>
			</NativeBaseProvider>
		</View>
	);
}
