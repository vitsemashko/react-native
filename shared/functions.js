import * as Font from "expo-font";
export const loadFonts = async () => {
	await Font.loadAsync({
		"Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
		"Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
	});
};
