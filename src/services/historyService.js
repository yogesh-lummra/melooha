import { addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";

const getToolHistoryCollection = (uid) => collection(db, "users", uid, "toolHistory");

export const saveToolHistory = async (uid, toolName, inputData, result) => {
  if (!uid) {
    return null;
  }

  try {
    const toolHistoryCollection = getToolHistoryCollection(uid);
    return await addDoc(toolHistoryCollection, {
      toolName,
      inputData,
      result,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    throw new Error(error?.message || "Unable to save tool history.");
  }
};

export const getUserHistory = async (uid) => {
  if (!uid) {
    return [];
  }

  try {
    const toolHistoryCollection = getToolHistoryCollection(uid);
    const snapshot = await getDocs(toolHistoryCollection);

    return snapshot.docs.map((docSnapshot) => ({
      id: docSnapshot.id,
      ...docSnapshot.data(),
    }));
  } catch (error) {
    throw new Error(error?.message || "Unable to fetch tool history.");
  }
};
