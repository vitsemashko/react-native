import {
	View,
	Text,
	Image,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
	KeyboardAvoidingView,
	ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import {
	doc,
	setDoc,
	onSnapshot,
	arrayUnion,
	getDocs,
	collection,
	updateDoc,
} from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
const CommentsScreen = ({ route }) => {
	const props = route.params;
	const { nickname, userId } = useSelector((state) => {
		return state.auth;
	});
	const [comment, setComment] = useState("");
	const [comments, setComments] = useState([]);
	const [serverComment, setServerComment] = useState([]);
	const [image, setImage] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	useEffect(() => {
		try {
			setIsLoading(true);
			getImage();
			getCommentFromServer();
		} catch (error) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	}, []);
	useEffect(() => {
		getComments();
	}, [comment]);
	const uploadCommentToServer = async () => {
		try {
			setIsLoading(true);
			const commentsRef = doc(db, "posts", props);
			updateDoc(commentsRef, {
				comments: arrayUnion(comment),
			});
			setComment("");
		} catch (error) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};
	const getImage = async () => {
		onSnapshot(doc(db, "posts", props), (doc) => {
			setImage(doc.data().globalUri);
		});
	};
	const getCommentFromServer = async () => {
		onSnapshot(doc(db, "posts", props), (doc) => {
			setServerComment(doc.data().comments);
		});
	};
	const getComments = async () => {
		const querySnapshot = await getDocs(collection(db, "posts"));
		// let arr = [];
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			// arr.push(doc.data());
			setComments(doc.data());
		});
	};
	return (
		<View style={styles.container}>
			{isLoading && <ActivityIndicator size="small" color="#ff6c00" />}
			{error && <Text>{error}</Text>}
			{image && <Image source={{ uri: image }} style={styles.placeholderImg} />}
			<Text>{props}</Text>
			<View style={{ display: "flex", alignItems: "center" }}>
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
				<FlatList
					data={comments.comments}
					keyExtractor={(item, idx) => idx.toString()}
					renderItem={({ item }) => (
						<View
							style={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
							}}
						>
							<View style={styles.noPhoto}></View>
							<Text style={styles.commentRight}>{item}</Text>
						</View>
					)}
				/>
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
