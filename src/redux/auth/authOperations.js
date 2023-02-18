import { auth } from "../../firebase/config";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	updateProfile,
} from "firebase/auth";
import { Alert } from "react-native";
import {
	resetUser,
	updateUserId,
	updateUserNickname,
	authStateChanged,
} from "./authReducer";

const authSignInUser = (email, password) => (dispatch, getState) => {
	const auth = getAuth();
	signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in
			const user = userCredential.user;
			dispatch(updateUserNickname(user.displayName));
			Alert.alert(`Welcome, ${user.displayName}!`);
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorCode);
			console.log(errorMessage);
			// ..
		});
};

const authSignUpUser = (email, password, login) => (dispatch, getState) => {
	const auth = getAuth();
	createUserWithEmailAndPassword(auth, email, password, login)
		.then((userCredential) => {
			// Signed in
			const user = userCredential.user;
			updateProfile(user, { displayName: login });
			Alert.alert(`User created`);
			dispatch(updateUserId(user.uid));
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorCode);
			console.log(errorMessage);
			// ..
		});
};

const authSignOutUser = () => (dispatch, getState) => {
	dispatch(resetUser());
};
const authStateChangeUser = () => (dispatch, getState) => {
	const auth = getAuth();
	onAuthStateChanged(auth, (user) => {
		if (user) {
			dispatch(updateUserId(user.uid));
			dispatch(updateUserNickname(user.displayName));
			dispatch(authStateChanged(true));
		} else {
			// User is signed out
			// ...
		}
	});
};

export { authSignInUser, authSignUpUser, authSignOutUser, authStateChangeUser };
