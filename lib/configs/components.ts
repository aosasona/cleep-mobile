import {isAndroid} from "../platform";

export const componentsConfig = {
  ScrollView: {
    baseStyle: () => ({
      _dark: {bg: "dark"},
      _light: {bg: "light"},
      px: 3,
      py: 2,
    }),
  },
  View: {
    baseStyle: () => ({
      _dark: {bg: "dark"},
      _light: {bg: "light"},
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
      _dark: {bg: "dark"},
      _light: {bg: "light"},
      px: 4,
    }),
  },
  FlatList: {
    baseStyle: () => ({
      _dark: {bg: "dark"},
      _light: {bg: "light"},
      px: 4,
    }),
  },
  Switch: {
    defaultProps: {
      onTrackColor: "primary",
      size: isAndroid ? "lg" : "md",
    },
  },
  Input: {
    defaultProps: {
      py: 4,
      rounded: 10,
    },
  },
  Checkbox: {
    defaultProps: {
      _checked: {
        bg: "primary",
        color: "muted.50",
        borderColor: "primary",
      },
    },
  },
};