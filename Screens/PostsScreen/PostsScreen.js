import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

const PostsScreen = () => {
	return (
		<View style={styles.container}>
			<View style={styles.wrapper}>
				<View style={styles.placeholder}></View>
				<View style={{ marginTop: 48, marginBottom: 32 }}>
					<Text style={styles.fullname}>Natali Romanova</Text>
					<Text style={styles.email}>email@example.com</Text>
				</View>
			</View>
			<View style={styles.placeholderImg}></View>
			<Text style={styles.name}>Name</Text>
			<View
				style={{
					display: "flex",
					flexDirection: "row",
				}}
			>
				<Text style={{ color: "#bdbdbd", marginRight: 24 }}>
					<Ionicons name="chatbubble" size={24} color="#bdbdbd" /> 0
				</Text>
				<Text style={{ color: "#bdbdbd" }}>
					<Ionicons name="thumbs-up-sharp" size={24} color="#bdbdbd" /> 0
				</Text>
				<Text style={{ marginLeft: 67, textDecorationLine: "underline" }}>
					<Ionicons name="md-location-outline" size={24} color="#bdbdbd" />
					Location
				</Text>
			</View>
		</View>
	);
};

export default PostsScreen;
