import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "../../Screens/RegistrationScreen/RegistrationScreen";
import LoginScreen from "../../Screens/LoginScreen/LoginScreen";
import Home from "../../Screens/Home/Home";
import CommentsScreen from "../../Screens/CommentsScreen/CommentsScreen";
import MapScreen from "../../Screens/MapScreen/MapScreen";

const MainStack = createStackNavigator();
const UserNav = () => {
	return (
		<MainStack.Navigator initialRouteName="Login">
			<MainStack.Screen name="Registration" component={RegistrationScreen} />
			<MainStack.Screen name="Login" component={LoginScreen} />
			<MainStack.Screen name="Home" component={Home} />
			<MainStack.Screen name="Comments" component={CommentsScreen} />
			<MainStack.Screen name="MapScreen" component={MapScreen} />
		</MainStack.Navigator>
	);
};
export default UserNav;
