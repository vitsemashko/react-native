import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
	container: {
		display: "flex",
		alignItems: "baseline",
		justifyContent: "flex-start",
		backgroundColor: "#fff",
		width: "100%",
		height: "100%",
		paddingLeft: 16,
		paddingRight: 16,
	},
	wrapper: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	placeholder: {
		display: "flex",
		flexDirection: "row",
		width: 60,
		height: 60,
		backgroundColor: "#f6f6f6",
		marginTop: 5,
		marginRight: 8,
		borderRadius: 16,
	},
	placeholderImg: {
		width: 300,
		height: 200,
		borderRadius: 8,
	},
	fullname: {
		fontWeight: "700",
		fontSize: 13,
	},
	email: {
		fontWeight: "400",
		size: 11,
		color: "#bdbdbd",
	},
	name: {
		paddingTop: 8,
		paddingBottom: 8,
		paddingLeft: 16,
		color: "#212121",
		fontSize: 16,
		fontWeight: "500",
	},
});
