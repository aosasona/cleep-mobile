export const SharedSettingsStackProps = {
  _dark: { bg: "muted.900" },
  _light: { bg: "muted.50" },
  px: 4,
  py: 3,
  rounded: 14,
};

export const SettingsHStackProps = {
  alignItems: "center",
  justifyContent: "space-between",
  ...SharedSettingsStackProps,
};

export const SettingsVStackProps = {
  ...SharedSettingsStackProps,
};
