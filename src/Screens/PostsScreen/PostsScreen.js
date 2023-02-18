import { useState, useEffect } from "react";
import { doc, onSnapshot, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { View, Text, Image, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { useSelector } from "react-redux";

const PostsScreen = ({ route, navigation }) => {
	const { nickname } = useSelector((state) => {
		return state.auth;
	});
	const props = route.params;
	const [post, setPost] = useState({});
	const [posts, setPosts] = useState([]);
	const [uri, setUri] = useState("");
	const [serverLoc, setServerLoc] = useState("");
	useEffect(() => {
		getAllPosts();
	}, []);
	const getOnePost = () => {
		onSnapshot(doc(db, "posts", "Asd"), (doc) => {
			setPost(doc.data());
		});
	};
	const getAllPosts = async () => {
		const querySnapshot = await getDocs(collection(db, "posts"));
		let arr = [];
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			arr.push(doc.data());
			return arr;
		});
		setPosts(arr);
	};
	const onFilterPosts = (name) => {
		const filtered = posts.filter((item) => {
			return item.name === name;
		});
		const uri = filtered.map((item) => item.globalUri);
		setUri(uri[0]);
	};
	const onFilterByLoc = (name) => {
		const filtered = posts.filter((item) => {
			return item.name === name;
		});
		const loc = filtered.map((item) => item?.loc?.coords);
		setServerLoc(loc[0]);
	};
	const goToComments = (data) => {
		onFilterPosts(data);

		navigation.navigate("Comments", {
			postUri: uri,
			postName: data,
		});
	};
	const goToMap = (data) => {
		onFilterByLoc(data);

		navigation.navigate("MapScreen", serverLoc);
	};
	return (
		<View style={styles.container}>
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
							<Text style={{ color: "#bdbdbd", marginRight: 24 }}>
								<Ionicons
									name="chatbubble"
									size={24}
									color="#bdbdbd"
									onPress={() => goToComments(item.name)}
								/>{" "}
								0
							</Text>
							<Text style={{ color: "#bdbdbd" }}>
								<Ionicons name="thumbs-up-sharp" size={24} color="#bdbdbd" /> 0
							</Text>
							{item && (
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
							)}
						</View>
					</View>
				)}
			/>
		</View>
	);
};

export default PostsScreen;
