import { ColorMode, extendTheme, StorageManager } from "native-base";
import Keys from "../../constants/keys";
import storage from "../storage/default";
import { componentsConfig } from "./components";

export const appColors = {
	dark: "#000000",
	light: "#f1f1f1",
	primary: "#E11D48",
	"primary-faded": "#E11D4833",
	"light-faded": "#6A6A6A",
	"dark-faded": "#A8A8A8",
};

export const colorModeManager: StorageManager = {
	get: async () => {
		try {
			const hasColorMode = storage.contains(Keys.COLOR_MODE);
			if (!hasColorMode) return "light";
			return storage.getString(Keys.COLOR_MODE) as ColorMode;
		} catch (err) {
			return "light";
		}
	},

	set: (value: ColorMode) => {
		if (!value) return;
		storage.set(Keys.COLOR_MODE, value);
	},
};

export const fontsConfig = {
	Poppins: {
		100: {
			normal: "Poppins_100Thin",
		},
		200: {
			normal: "Poppins_200ExtraLight",
		},
		300: {
			normal: "Poppins_300Light",
		},
		400: {
			normal: "Poppins_400Regular",
		},
		500: {
			normal: "Poppins_500Medium",
		},
		600: {
			normal: "Poppins_600SemiBold",
		},
		700: {
			normal: "Poppins_700Bold",
		},
		800: {
			normal: "Poppins_800ExtraBold",
		},
		900: {
			normal: "Poppins_900Black",
		},
	},
};

const fonts = {
	heading: "Poppins",
	body: "Poppins",
	mono: "Poppins",
};

export const extendedTheme = extendTheme({
	fontConfig: fontsConfig,
	fonts: fonts,
	components: componentsConfig,
	colors: appColors,
});
