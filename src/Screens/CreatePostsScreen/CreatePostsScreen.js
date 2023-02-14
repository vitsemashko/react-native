import { useState, useEffect, useRef } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
	KeyboardAvoidingView,
	Alert,
	Image,
	TouchableOpacity,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";

const CreatePostsScreen = ({ navigation }) => {
	const isFocused = useIsFocused();
	const [hasPermission, setHasPermission] = useState(null);
	const [cameraRef, setCameraRef] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);

	// onPress={() => {
	// 	setType(
	// 	  type === Camera.Constants.Type.back
	// 		? Camera.Constants.Type.front
	// 		: Camera.Constants.Type.back
	// 	);

	const [photo, setPhoto] = useState("");
	const [name, setName] = useState("");
	const [location, setLocation] = useState("");
	const [loc, setLoc] = useState(null);
	const onNameChange = (text) => {
		setName(text);
	};
	const onLocationChange = (text) => {
		setLocation(text);
	};
	const onPublish = async () => {
		let loc = await Location.getCurrentPositionAsync({});
		setLoc(loc);
		navigation.navigate("PostsScreen", { photo, name, location, loc });
		setName("");
		setLocation("");
		setPhoto("");
	};
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
	// console.log(loc?.coords);
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
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
					<Text style={{ color: "#fff" }} onPress={onPublish}>
						Publish
					</Text>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default CreatePostsScreen;
