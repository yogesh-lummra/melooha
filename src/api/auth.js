import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { getDefaultProfileImageByGender } from "../services/userService";

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

  const fullName = [firstName, surname].filter(Boolean).join(" ").trim();
  const profileImageUrl = getDefaultProfileImageByGender(gender);

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
    fullName,
    age: Number(age),
    gender,
    dateOfBirth,
    timeOfBirth,
    placeOfBirth,
    profileImageUrl,
    email,
    createdAt: new Date(),
    updatedAt: new Date(),
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
