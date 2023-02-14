import {
	View,
	Text,
	Image,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
	KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
const CommentsScreen = ({ route }) => {
	const props = route.params;
	return (
		<View style={styles.container}>
			{props && <Image source={{ uri: props }} style={styles.placeholderImg} />}
			<View style={{ display: "flex", alignItems: "center" }}>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<View style={styles.noPhoto}></View>
					<Text style={styles.commentRight}>
						Really love your most recent photo. I’ve been trying to capture the
						same thing for a few months and would love some tips!
					</Text>
				</View>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<Text style={styles.commentLeft}>
						Really love your most recent photo. I’ve been trying to capture the
						same thing for a few months and would love some tips!
					</Text>
					<View style={styles.noPhotoSecond}></View>
				</View>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<View style={styles.noPhoto}></View>
					<Text style={styles.commentRight}>
						Really love your most recent photo. I’ve been trying to capture the
						same thing for a few months and would love some tips!
					</Text>
				</View>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<Text style={styles.commentLeft}>
						Really love your most recent photo. I’ve been trying to capture the
						same thing for a few months and would love some tips!
					</Text>
					<View style={styles.noPhotoSecond}></View>
				</View>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<KeyboardAvoidingView
						behavior={Platform.OS === "ios" ? "padding" : "height"}
					>
						<View>
							<TextInput placeholder="Leave a comment" style={styles.input} />
							<Ionicons
								name="arrow-up-circle"
								size={34}
								color="#ff6c00"
								style={{
									position: "absolute",
									top: "50%",
									right: 0,
									marginRight: 8,
								}}
							/>
						</View>
					</KeyboardAvoidingView>
				</TouchableWithoutFeedback>
			</View>
		</View>
	);
};
export default CommentsScreen;
