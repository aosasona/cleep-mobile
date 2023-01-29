const IS_IN_DEVELOPMENT = process.env.APP_ENVIRONMENT === "development";

export default {
	name: IS_IN_DEVELOPMENT ? "Cleep Dev" : "Cleep",
	slug: "cleep",
	version: "0.1.0",
	orientation: "portrait",
	icon: "./assets/" + (IS_IN_DEVELOPMENT ? "icon-alternate.png" : "icon.png"),
	userInterfaceStyle: "automatic",
	jsEngine: "hermes",
	scheme: "cleep",
	splash: {
		image: "./assets/splash.png",
		resizeMode: "contain",
		backgroundColor: "#000000",
	},
	updates: {
		fallbackToCacheTimeout: 0,
	},
	assetBundlePatterns: ["**/*"],
	ios: {
		associatedDomains: ["applinks:cleep.app", "applinks:www.cleep.app"],
		supportsTablet: false,
		bundleIdentifier: IS_IN_DEVELOPMENT
		  ? "com.wytehq.cleep.dev"
		  : "com.wytehq.cleep",
	},
	android: {
		adaptiveIcon: {
			foregroundImage:
			  "./assets/adaptive-icon" + (IS_IN_DEVELOPMENT ? "-dev" : "") + ".png",
			backgroundColor: IS_IN_DEVELOPMENT ? "#F5F5F5" : "#E11D48",
		},
		package: IS_IN_DEVELOPMENT ? "com.wytehq.cleep.dev" : "com.wytehq.cleep",
		useNextNotificationsApi: true,
		allowBackup: true,
	},
	extra: {
		eas: {
			projectId: "22a5b25f-046e-4430-aa05-733cde068d46",
		},
	},
	notification: {
		icon: "./assets/96x96.png",
		color: "#E11D48",
	},
	plugins: ["expo-notifications"],
};