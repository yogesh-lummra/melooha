import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";

export const signupUser = async (userData) => {
  const {
    email,
    password,
    firstName,
    surname,
    age,
    gender,
    dateOfBirth,
    timeOfBirth,
    placeOfBirth,
  } = userData;

  // 1. Create Auth Account
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;

  // 2. Store user data in Firestore (NO PASSWORD)
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    firstName,
    surname,
    age: Number(age),
    gender,
    dateOfBirth,
    timeOfBirth,
    placeOfBirth,
    email,
    createdAt: new Date(),
  });

  return user;
};


export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  

  return userCredential.user;
};