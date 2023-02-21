import { useState } from "react";
import {
	Text,
	Button,
	View,
	TextInput,
	Platform,
	Alert,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	ActivityIndicator,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

import { useSelector, useDispatch } from "react-redux";
import {
	authSignUpUser,
	updateUserProfile,
} from "../../redux/auth/authOperations";
import { styles } from "./styles";
const RegistrationScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const [login, setLogin] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSecure, setIsSecure] = useState(true);
	const [onFocusLogin, setOnFocusLogin] = useState(false);
	const [onFocusEmail, setOnFocusEmail] = useState(false);
	const [onFocusPassword, setOnFocusPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const handleLoginChange = (text) => {
		setLogin(text);
	};
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
	const onRegister = () => {
		try {
			setIsLoading(true);
			dispatch(authSignUpUser(email, password, login));
			navigation.navigate("Login");
		} catch (error) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}

		// setLogin("");
		// setEmail("");
		// setPassword("");
	};
	return (
		<>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.container}>
					{isLoading && <ActivityIndicator size="small" color="#ff6c00" />}
					{error && <Text>An error occurred...</Text>}
					<View style={styles.placeholder}>
						<View style={styles.cross}>
							<Text style={styles.inCross}>+</Text>
						</View>
					</View>
					<Text style={styles.title}>Registration</Text>
					<TextInput
						style={onFocusLogin ? styles.inputNoFocus : styles.input}
						placeholder="Login"
						value={login}
						onChangeText={handleLoginChange}
						onFocus={() => {
							setOnFocusLogin(true);
						}}
						onBlur={() => {
							setOnFocusLogin(false);
						}}
					/>
					<TextInput
						style={onFocusEmail ? styles.inputNoFocus : styles.input}
						placeholder="Email"
						value={email}
						onChangeText={handleEmailChange}
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
								style={onFocusPassword ? styles.inputNoFocus : styles.input}
								secureTextEntry={isSecure}
								placeholder="Password"
								value={password}
								onChangeText={handlePasswordChange}
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
					<View style={styles.register}>
						<TouchableHighlight>
							<Text style={styles.registerText} onPress={onRegister}>
								Register
							</Text>
						</TouchableHighlight>
					</View>
					<View style={styles.enter}>
						<Text style={styles.enterText}>Already have an account?</Text>
						<TouchableHighlight>
							<Text onPress={() => navigation.navigate("Login")}>Enter</Text>
						</TouchableHighlight>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</>
	);
};

export default RegistrationScreen;
