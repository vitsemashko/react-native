import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
const ProfileScreen = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.profileText}>Natali Romanova</Text>
			<View style={styles.placeholder}></View>
			<Text style={styles.name}>Name</Text>
			<View style={{ display: "flex", flexDirection: "row" }}>
				<Text style={{ marginRight: 24 }}>
					<Ionicons name="chatbubble" size={24} color="#ff6c00" /> 8
				</Text>
				<Text>
					<Ionicons name="thumbs-up-sharp" size={24} color="#ff6c00" /> 153
				</Text>
				<Text style={{ marginLeft: "auto", textDecorationLine: "underline" }}>
					<Ionicons name="md-location-outline" size={24} color="#bdbdbd" />
					Location
				</Text>
			</View>
		</View>
	);
};
export default ProfileScreen;
