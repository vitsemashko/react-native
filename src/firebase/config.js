import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyDtesImQ6AxuRLZXz3quz4IgsIyfhUc-o8",
	authDomain: "react-native-b5b0f.firebaseapp.com",
	projectId: "react-native-b5b0f",
	storageBucket: "react-native-b5b0f.appspot.com",
	messagingSenderId: "365504596741",
	appId: "1:365504596741:web:41a54179e3a96a0a75456c",
	measurementId: "G-M1TY3VK6ZB",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
