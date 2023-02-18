import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { styles } from "./styles";
const MapScreen = ({ route }) => {
	const props = route.params;
	const lat = props?.latitude;
	const long = props?.longitude;
	return (
		<View>
			{props && (
				<MapView
					style={{ width: "100%", height: "100%" }}
					initialRegion={{
						latitude: lat,
						longitude: long,
						longitudeDelta: 0.1,
						latitudeDelta: 0.1,
					}}
				>
					<Marker coordinate={{ latitude: lat, longitude: long }} />
				</MapView>
			)}
		</View>
	);
};
export default MapScreen;
