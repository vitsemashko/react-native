import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
	View,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
	ActivityIndicator,
	KeyboardAvoidingView,
	Alert,
	Image,
	TouchableOpacity,
} from "react-native";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { TouchableHighlight } from "react-native-gesture-handler";

const CreatePostsScreen = ({ navigation }) => {
	const { nickname, userId } = useSelector((state) => {
		return state.auth;
	});
	const isFocused = useIsFocused();
	const [hasPermission, setHasPermission] = useState(null);
	const [cameraRef, setCameraRef] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);

	const [photo, setPhoto] = useState("");
	const [name, setName] = useState("");
	const [location, setLocation] = useState("");
	const [loc, setLoc] = useState(null);
	const [globalUri, setGlobalUri] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const onNameChange = (text) => {
		setName(text);
	};
	const onLocationChange = (text) => {
		setLocation(text);
	};
	async function onPublish() {
		const locat = await Location.getCurrentPositionAsync({});
		const storage = getStorage();
		const storageRef = ref(storage, name);
		const data = await fetch(photo);
		const file = await data.blob();
		await uploadBytes(storageRef, file).then((snapshot) => {
			console.log("Uploaded a blob or file!");
		});
		const processed = await getDownloadURL(storageRef);
		await setDoc(doc(db, "posts", name), {
			name: name,
			photo: photo,
			location: location,
			loc: locat,
			globalUri: processed,
			nickname: nickname,
			userId: userId,
		});
		Alert.alert("Post created");
		setName("");
		setLocation("");
		setPhoto("");
		setLoc(null);
		setGlobalUri("");
	}
	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}
		})();
	}, []);
	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === "granted");
		})();
	}, []);
	if (hasPermission === null) {
		return <View />;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				{isLoading && <ActivityIndicator size="small" color="#ff6c00" />}
				{error && <Text>An error occurred...</Text>}
				{isFocused && (
					<Camera
						style={{ width: 300, height: 200 }}
						type={type}
						ref={setCameraRef}
					>
						<View style={styles.placeholder}>
							<View style={styles.iconWrapper}>
								<TouchableOpacity
									onPress={async () => {
										if (cameraRef) {
											const { uri } = await cameraRef.takePictureAsync();
											setPhoto(uri);
										}
									}}
								>
									<Ionicons name="camera-outline" size={24} color="#bdbdbd" />
								</TouchableOpacity>
							</View>
						</View>
					</Camera>
				)}
				<View style={styles.wrapper}>
					<TouchableHighlight>
						<Text
							style={{
								color: "#bdbdbd",
								marginBottom: 16,
								fontSize: 16,
								fontWeight: "500",
							}}
						>
							{photo && (
								<Image
									source={{ uri: photo }}
									style={{
										width: 20,
										height: 20,
										position: "absolute",
										top: 0,
									}}
								/>
							)}
							Upload photo
						</Text>
					</TouchableHighlight>

					<TextInput
						style={styles.wrapperText}
						placeholder="Name"
						onChangeText={onNameChange}
						value={name}
					/>

					<View style={{ display: "flex", flexDirection: "row" }}>
						<Ionicons name="md-location-outline" size={24} color="#bdbdbd" />
						<TextInput
							style={{
								color: "#212121",
								fontSize: 16,
								fontWeight: "500",
							}}
							placeholder="Location"
							value={location}
							onChangeText={onLocationChange}
						/>
					</View>
				</View>
				<View style={styles.button}>
					<TouchableHighlight>
						<Text style={{ color: "#fff" }} onPress={onPublish}>
							Publish
						</Text>
					</TouchableHighlight>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default CreatePostsScreen;
