import {
	View,
	Text,
	Image,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
	KeyboardAvoidingView,
} from "react-native";
import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { useSelector } from "react-redux";
const CommentsScreen = ({ route }) => {
	const { postUri, postName } = route.params;
	const { nickname, userId } = useSelector((state) => {
		return state.auth;
	});
	const [comment, setComment] = useState("");
	const [serverComment, setServerComment] = useState("");
	useEffect(() => {
		getCommentFromServer();
	}, []);

	const uploadCommentToServer = async () => {
		await setDoc(doc(db, "comment", postName), {
			text: comment,
			nickname: nickname,
			userId: userId,
		});
		setComment("");
	};
	const getCommentFromServer = async () => {
		onSnapshot(doc(db, "comment", postName), (doc) => {
			setServerComment(doc.data());
		});
	};
	return (
		<View style={styles.container}>
			{postUri && (
				<Image source={{ uri: postUri }} style={styles.placeholderImg} />
			)}
			<Text>{postName}</Text>
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
					<Text style={styles.commentRight}>{serverComment?.text}</Text>
				</View>

				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<KeyboardAvoidingView
						behavior={Platform.OS === "ios" ? "padding" : "height"}
					>
						<View>
							<TextInput
								placeholder="Leave a comment"
								style={styles.input}
								value={comment}
								onChangeText={(text) => setComment(text)}
							/>
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
								onPress={uploadCommentToServer}
							/>
						</View>
					</KeyboardAvoidingView>
				</TouchableWithoutFeedback>
			</View>
		</View>
	);
};
export default CommentsScreen;
