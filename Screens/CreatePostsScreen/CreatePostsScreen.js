import {
	View,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
	KeyboardAvoidingView,
} from "react-native";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";

const CreatePostsScreen = () => {
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<View style={styles.placeholder}>
					<View style={styles.iconWrapper}>
						<Ionicons name="camera-outline" size={24} color="#bdbdbd" />
					</View>
				</View>
				<View style={styles.wrapper}>
					<Text
						style={{
							color: "#bdbdbd",
							marginBottom: 32,
							fontSize: 16,
							fontWeight: "500",
						}}
					>
						Upload photo
					</Text>
					<TextInput style={styles.wrapperText} placeholder="Name" />
					<KeyboardAvoidingView
						behavior={Platform.OS === "ios" ? "padding" : "height"}
					>
						<View style={{ display: "flex", flexDirection: "row" }}>
							<Ionicons name="md-location-outline" size={24} color="#bdbdbd" />
							<TextInput
								style={{ color: "#212121", fontSize: 16, fontWeight: "500" }}
								placeholder="Location"
							/>
						</View>
					</KeyboardAvoidingView>
				</View>

				<View style={styles.button}>
					<Text style={{ color: "#bdbdbd" }}>Publish</Text>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default CreatePostsScreen;
