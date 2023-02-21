import { useState, useEffect } from "react";
import {
	doc,
	onSnapshot,
	collection,
	getDocs,
	updateDoc,
	increment,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { useSelector } from "react-redux";
import { TouchableHighlight } from "react-native-gesture-handler";

const PostsScreen = ({ route, navigation }) => {
	const { nickname } = useSelector((state) => {
		return state.auth;
	});
	const props = route.params;
	const [posts, setPosts] = useState([]);
	const [uri, setUri] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [likes, setLikes] = useState(0);
	const [serverComments, setServerComments] = useState("");
	const [serverLikes, setServerLikes] = useState("");
	useEffect(() => {
		getAllPosts();
		getAllCommentsFromServer();
		// getAllLikesfromServer();
	}, []);
	useEffect(() => {
		getAllLikesfromServer();
	}, [likes]);
	const getAllLikesfromServer = async () => {
		try {
			const querySnapshot = await getDocs(collection(db, "posts"));
			// let arr = [];
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				// arr.push(doc.data());
				setServerLikes(doc.data().likes);
			});
		} catch (error) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};
	const getAllPosts = async () => {
		try {
			setIsLoading(true);
			const querySnapshot = await getDocs(collection(db, "posts"));
			let arr = [];
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				arr.push(doc.data());
				setPosts(arr);
			});
		} catch (error) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};
	const getAllCommentsFromServer = async () => {
		try {
			setIsLoading(true);
			const querySnapshot = await getDocs(collection(db, "posts"));
			// let arr = [];
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				// arr.push(doc.data());
				setServerComments(doc.data().comments);
			});
		} catch (error) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};
	const onLikesPress = (data) => {
		setLikes((prev) => {
			return prev + 1;
		});
		const likesRef = doc(db, "posts", data);
		updateDoc(likesRef, {
			likes: increment(1),
		});
	};
	const goToComments = (name) => {
		navigation.navigate("Comments", name);
	};
	const goToMap = (name) => {
		navigation.navigate("MapScreen", name);
	};
	return (
		<View style={styles.container}>
			{isLoading && <ActivityIndicator size="small" color="#ff6c00" />}
			{error && <Text>{error}</Text>}
			<View style={styles.wrapper}>
				<View style={styles.placeholder}></View>
				<View style={{ marginTop: 5, marginBottom: 32 }}>
					<Text style={styles.fullname}>{nickname}</Text>
					<Text style={styles.email}>email@example.com</Text>
				</View>
			</View>
			<FlatList
				data={posts}
				keyExtractor={(item, idx) => {
					return idx.toString();
				}}
				renderItem={({ item }) => (
					<View>
						<View>
							{item?.photo && (
								<Image
									source={{ uri: item?.photo }}
									style={styles.placeholderImg}
								/>
							)}
							<Text style={styles.name}>{item.name}</Text>
						</View>
						<View
							style={{
								display: "flex",
								flexDirection: "row",
							}}
						>
							<TouchableHighlight>
								<Text
									style={{
										color: Boolean(serverComments) ? "#ff6c00" : "#bdbdbd",
										marginRight: 24,
									}}
								>
									<Ionicons
										name="chatbubble"
										size={24}
										color={Boolean(serverComments) ? "#ff6c00" : "#bdbdbd"}
										onPress={() => goToComments(item.name)}
									/>{" "}
									{serverComments?.length}
								</Text>
							</TouchableHighlight>
							<TouchableHighlight>
								<Text
									style={{
										color: Boolean(serverLikes) ? "#ff6c00" : "#bdbdbd",
									}}
								>
									<Ionicons
										name="thumbs-up-sharp"
										size={24}
										color={Boolean(serverLikes) ? "#ff6c00" : "#bdbdbd"}
										onPress={() => onLikesPress(item.name)}
									/>{" "}
									{serverLikes}
								</Text>
							</TouchableHighlight>
							{item && (
								<TouchableHighlight>
									<Text
										style={{ marginLeft: 67, textDecorationLine: "underline" }}
									>
										<Ionicons
											name="md-location-outline"
											size={24}
											color="#bdbdbd"
											onPress={() => goToMap(item.name)}
										/>
										{item.location}
									</Text>
								</TouchableHighlight>
							)}
						</View>
					</View>
				)}
			/>
		</View>
	);
};

export default PostsScreen;
