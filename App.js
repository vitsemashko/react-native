import { useEffect } from "react";
import { loadFonts } from "./src/shared/functions";
import { NavigationContainer } from "@react-navigation/native";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import UserNav from "./src/shared/UserNav/UserNav";

export default function App() {
	useEffect(() => {
		loadFonts();
	}, []);
	return (
		<NavigationContainer>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<UserNav />
			</TouchableWithoutFeedback>
		</NavigationContainer>
	);
}
