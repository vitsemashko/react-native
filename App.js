import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { loadFonts } from "./src/shared/functions";
import { NavigationContainer } from "@react-navigation/native";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import UserNav from "./src/shared/UserNav/UserNav";

export default function App() {
	useEffect(() => {
		loadFonts();
	}, []);
	return (
		<Provider store={store}>
			<NavigationContainer>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<UserNav />
				</TouchableWithoutFeedback>
			</NavigationContainer>
		</Provider>
	);
}
