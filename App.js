import { useEffect } from "react";
import { loadFonts } from "./shared/functions";
import RegistrationScreen from "./Screens/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import {
	StyleSheet,
	TouchableWithoutFeedback,
	View,
	Keyboard,
	ImageBackground,
} from "react-native";

export default function App() {
	useEffect(() => {
		loadFonts();
	}, []);
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<ImageBackground
					source={require("./assets/bg.png")}
					resizeMode="cover"
					style={{
						width: 375,
						height: 812,
						filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
					}}
				>
					{/* <RegistrationScreen /> */}

					<LoginScreen />
				</ImageBackground>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		fontFamily: "Roboto",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		paddingRight: 16,
		paddingLeft: 16,
	},
});
