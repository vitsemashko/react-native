import { useState } from "react";
import {
	Alert,
	ActivityIndicator,
	Text,
	View,
	TextInput,
	Platform,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
	authSignInUser,
	authStateChangeUser,
} from "../../redux/auth/authOperations";
import { auth } from "../../firebase/config";
import { styles } from "./styles";
import { TouchableHighlight } from "react-native-gesture-handler";

const LoginScreen = ({ navigation }) => {
	const { stateChanged } = useSelector((state) => {
		return state.auth;
	});
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSecure, setIsSecure] = useState(true);
	const [onFocusEmail, setOnFocusEmail] = useState(false);
	const [onFocusPassword, setOnFocusPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const handleEmailChange = (text) => {
		setEmail(text);
	};
	const handlePasswordChange = (text) => {
		setPassword(text);
	};
	const handleShowPress = () => {
		if (!password) {
			return;
		}
		setIsSecure((prev) => !prev);
	};
	const onLogin = () => {
		try {
			setIsLoading(true);
			dispatch(authSignInUser(email, password));
			dispatch(authStateChangeUser());
			if (stateChanged) {
				navigation.navigate("Home");
			} else {
				// navigation.navigate("Registration");
			}
		} catch (error) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.container}>
					{isLoading && <ActivityIndicator size="small" color="#ff6c00" />}
					{error && <Text>An error occurred...</Text>}
					<Text style={styles.title}>Login</Text>
					<TextInput
						placeholder="Email"
						value={email}
						onChangeText={handleEmailChange}
						style={onFocusEmail ? styles.inputNoFocus : styles.input}
						onFocus={() => {
							setOnFocusEmail(true);
						}}
						onBlur={() => {
							setOnFocusEmail(false);
						}}
					/>
					<KeyboardAvoidingView
						behavior={Platform.OS === "ios" ? "padding" : "height"}
					>
						<View style={styles.passwordWrapper}>
							<TextInput
								placeholder="Password"
								secureTextEntry={isSecure}
								value={password}
								onChangeText={handlePasswordChange}
								style={onFocusPassword ? styles.inputNoFocus : styles.input}
								onFocus={() => {
									setOnFocusPassword(true);
								}}
								onBlur={() => {
									setOnFocusPassword(false);
								}}
							/>
							<Text style={styles.show} onPress={handleShowPress}>
								{isSecure ? "Show" : "Hide"}
							</Text>
						</View>
					</KeyboardAvoidingView>
					<View style={styles.enter}>
						<TouchableHighlight>
							<Text style={styles.enterText} onPress={onLogin}>
								Enter
							</Text>
						</TouchableHighlight>
					</View>
					<View style={styles.signup}>
						<Text style={styles.signupText}>No account?</Text>
						<TouchableHighlight>
							<Text onPress={() => navigation.navigate("Registration")}>
								Sign Up
							</Text>
						</TouchableHighlight>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</>
	);
};

export default LoginScreen;
