import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import {
	doc,
	onSnapshot,
	querySnapshot,
	collection,
	getDocs,
	updateDoc,
	increment,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import MapView, { Marker } from "react-native-maps";
import { styles } from "./styles";
const MapScreen = ({ route }) => {
	const [serverLocation, setServerLocation] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const props = route.params;

	useEffect(() => {
		onSnapshot(doc(db, "posts", props), (doc) => {
			setServerLocation(doc.data()?.loc?.coords);
		});
	}, []);
	return (
		<View>
			{isLoading && <ActivityIndicator size="small" color="#ff6c00" />}
			{error && <Text>An error occurred...</Text>}
			<Text>{props}</Text>

			<MapView
				style={{ width: "100%", height: "100%" }}
				initialRegion={{
					latitude: serverLocation?.latitude,
					longitude: serverLocation?.longitude,
					longitudeDelta: 0.1,
					latitudeDelta: 0.1,
				}}
			>
				<Marker
					coordinate={{
						latitude: serverLocation?.latitude,
						longitude: serverLocation?.longitude,
					}}
				/>
			</MapView>
		</View>
	);
};
export default MapScreen;
