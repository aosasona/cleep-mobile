import { ColorMode, extendTheme, StorageManager, Theme } from "native-base";
import Keys from "../constants/keys";
import { isAndroid } from "./platform";
import storage from "./storage/default";

export const appColors = {
  dark: "#020202",
  light: "#f5f5f5",
  primary: "#E11D48",
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

export const componentsConfig = {
  ScrollView: {
    baseStyle: () => ({
      _dark: { bg: appColors.dark },
      _light: { bg: appColors.light },
      px: 4,
    }),
  },
  Text: {
    baseStyle: () => ({
      fontSize: 16,
      fontWeight: 500,
    }),
  },
  SectionList: {
    baseStyle: () => ({
      _dark: { bg: appColors.dark },
      _light: { bg: appColors.light },
      px: 4,
    }),
  },
  FlatList: {
    baseStyle: () => ({
      _dark: { bg: appColors.dark },
      _light: { bg: appColors.light },
      px: 4,
    }),
  },
  Switch: {
    defaultProps: {
      onTrackColor: appColors.primary,
      size: isAndroid ? "lg" : "md",
    },
  },
};

export const extendedTheme = extendTheme({
  fontConfig: fontsConfig,
  fonts: fonts,
  components: componentsConfig,
  colors: appColors,
});
