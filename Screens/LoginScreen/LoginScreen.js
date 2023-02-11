import { useState } from "react";
import {
	Alert,
	Text,
	View,
	TextInput,
	Platform,
	KeyboardAvoidingView,
} from "react-native";
import { styles } from "./styles";
const LoginScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSecure, setIsSecure] = useState(true);
	const [onFocusEmail, setOnFocusEmail] = useState(false);
	const [onFocusPassword, setOnFocusPassword] = useState(false);
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
		Alert.alert(`Email:${email}/Password:${password}`);
		setEmail("");
		setPassword("");
	};
	return (
		<View style={styles.container}>
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
				<Text style={styles.enterText} onPress={onLogin}>
					Enter
				</Text>
			</View>
			<View style={styles.signup}>
				<Text style={styles.signupText}>No account?</Text>
				<Text>Sign Up</Text>
			</View>
		</View>
	);
};

export default LoginScreen;
