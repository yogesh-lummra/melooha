
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import {
   getReactNativePersistence,
   initializeAuth
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
   apiKey: "AIzaSyDtreNWxcfPrrkak58-qLlkYuNE5MsLymE",
   authDomain: "melooha-e7c54.firebaseapp.com",
   projectId: "melooha-e7c54",
   storageBucket: "melooha-e7c54.firebasestorage.app",
   messagingSenderId: "222377696882",
   appId: "1:222377696882:web:6b35a0bf78ab5f23cbaceb",
   measurementId: "G-JX15FMQ4WK"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getFirestore(app);