import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CreatePostsScreen from "../CreatePostsScreen/CreatePostsScreen";
import PostsScreen from "../PostsScreen/PostsScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";

const Tabs = createBottomTabNavigator();
const Home = ({ navigation }) => {
	return (
		<>
			<Tabs.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;
						if (route.name === "PostsScreen") {
							iconName = focused ? "ios-grid" : "ios-grid-outline";
						} else if (route.name === "CreatePostsScreen") {
							iconName = focused ? "add-circle" : "add-circle-outline";
						} else if (route.name === "ProfileScreen") {
							iconName = focused ? "person" : "person-outline";
						}
						return <Ionicons name={iconName} size={size} color={color} />;
					},
					tabBarActiveTintColor: "#ff6c00",
					tabBarInactiveTintColor: "#212121",
					tabBarStyle: [{ display: "flex" }, null],
				})}
			>
				<Tabs.Screen
					name="PostsScreen"
					component={PostsScreen}
					options={{
						title: "Posts",
						headerTitleStyle: {
							fontWeight: "bold",
							fontSize: 17,
						},
						headerRight: () => (
							<Ionicons
								name="exit-outline"
								size={24}
								color="#bdbdbd"
								onPress={() => navigation.navigate("Login")}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="CreatePostsScreen"
					component={CreatePostsScreen}
					options={{
						title: "Create Post",
						headerTitleStyle: {
							fontWeight: "bold",
							fontSize: 17,
						},
					}}
				/>
				<Tabs.Screen
					name="ProfileScreen"
					component={ProfileScreen}
					options={{
						title: "Profile",
						headerTitleStyle: {
							fontWeight: "bold",
							fontSize: 17,
						},
						headerRight: () => (
							<Ionicons
								name="exit-outline"
								size={24}
								color="#bdbdbd"
								onPress={() => navigation.navigate("Login")}
							/>
						),
					}}
				/>
			</Tabs.Navigator>
		</>
	);
};
export default Home;
