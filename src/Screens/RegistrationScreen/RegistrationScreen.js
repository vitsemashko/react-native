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
} from "react-native";

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
		dispatch(authSignUpUser(email, password, login));
		navigation.navigate("Login");
		// setLogin("");
		// setEmail("");
		// setPassword("");
	};
	return (
		<>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.container}>
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
						<Text style={styles.registerText} onPress={onRegister}>
							Register
						</Text>
					</View>
					<View style={styles.enter}>
						<Text style={styles.enterText}>Already have an account?</Text>
						<Text onPress={() => navigation.navigate("Login")}>Enter</Text>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</>
	);
};

export default RegistrationScreen;
