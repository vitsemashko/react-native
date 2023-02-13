import { useEffect } from "react";
import { loadFonts } from "./shared/functions";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "./Screens/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import Home from "./Screens/Home/Home";
import {
	StyleSheet,
	TouchableWithoutFeedback,
	View,
	Keyboard,
	ImageBackground,
	Button,
} from "react-native";
const MainStack = createStackNavigator();

export default function App() {
	useEffect(() => {
		loadFonts();
	}, []);
	return (
		<NavigationContainer>
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
						<MainStack.Navigator initialRouteName="Login">
							<MainStack.Screen
								name="Registration"
								component={RegistrationScreen}
							/>
							<MainStack.Screen name="Login" component={LoginScreen} />
							<MainStack.Screen name="Home" component={Home} />
						</MainStack.Navigator>
					</ImageBackground>
				</View>
			</TouchableWithoutFeedback>
		</NavigationContainer>
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
