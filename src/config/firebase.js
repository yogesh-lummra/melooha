import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "melooha-e7c54.firebaseapp.com",
  projectId: "melooha-e7c54",
  storageBucket: "melooha-e7c54.firebasestorage.app",
  messagingSenderId: "222377696882",
  appId: "1:222377696882:web:6b35a0bf78ab5f23cbaceb",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const db = getFirestore(app);

export { auth, db };
