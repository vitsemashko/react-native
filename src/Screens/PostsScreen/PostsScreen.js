import { useState, useEffect } from "react";
import { View, Text, Image, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

const PostsScreen = ({ route, navigation }) => {
	const props = route.params;
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		if (props) {
			setPosts((prev) => [...prev, props]);
		}
	}, [props]);
	const goToComments = () => {
		navigation.navigate("Comments", props?.photo);
	};
	const goToMap = () => {
		navigation.navigate("MapScreen", props?.loc?.coords);
	};
	return (
		<View style={styles.container}>
			<View style={styles.wrapper}>
				<View style={styles.placeholder}></View>
				<View style={{ marginTop: 5, marginBottom: 32 }}>
					<Text style={styles.fullname}>Natali Romanova</Text>
					<Text style={styles.email}>email@example.com</Text>
				</View>
			</View>
			<View>
				<FlatList
					data={posts}
					keyExtractor={(item, idx) => {
						return idx.toString();
					}}
					renderItem={({ item }) => (
						<View>
							{item?.photo && (
								<Image
									source={{ uri: item?.photo }}
									style={styles.placeholderImg}
								/>
							)}
							{props && <Text style={styles.name}>{item.name}</Text>}
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
										onPress={goToComments}
									/>{" "}
									0
								</Text>
								<Text style={{ color: "#bdbdbd" }}>
									<Ionicons name="thumbs-up-sharp" size={24} color="#bdbdbd" />{" "}
									0
								</Text>
								{item && (
									<Text
										style={{ marginLeft: 67, textDecorationLine: "underline" }}
									>
										<Ionicons
											name="md-location-outline"
											size={24}
											color="#bdbdbd"
											onPress={goToMap}
										/>
										{item.location}
									</Text>
								)}
							</View>
						</View>
					)}
				/>
			</View>
		</View>
	);
};

export default PostsScreen;
