import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const DEFAULT_PROFILE_IMAGE_URL = "https://i.pravatar.cc/300";
const MALE_PROFILE_IMAGE_URL = "https://randomuser.me/api/portraits/men/32.jpg";
const FEMALE_PROFILE_IMAGE_URL = "https://randomuser.me/api/portraits/women/44.jpg";

const getUserDocRef = (uid) => doc(db, "users", uid);

const normalizeGender = (gender) => String(gender || "").trim().toLowerCase();

export const getDefaultProfileImageByGender = (gender) => {
  const normalizedGender = normalizeGender(gender);

  if (normalizedGender === "male") return MALE_PROFILE_IMAGE_URL;
  if (normalizedGender === "female") return FEMALE_PROFILE_IMAGE_URL;

  return DEFAULT_PROFILE_IMAGE_URL;
};

export const resolveProfileImageUrl = (profileData) => {
  if (!profileData) return DEFAULT_PROFILE_IMAGE_URL;

  const currentImageUrl = profileData.profileImageUrl;
  const hasCustomImage =
    Boolean(currentImageUrl) &&
    currentImageUrl !== DEFAULT_PROFILE_IMAGE_URL &&
    currentImageUrl !== MALE_PROFILE_IMAGE_URL &&
    currentImageUrl !== FEMALE_PROFILE_IMAGE_URL;

  if (hasCustomImage) return currentImageUrl;

  return getDefaultProfileImageByGender(profileData.gender);
};

const buildMinimalProfile = (uid) => ({
  uid,
  firstName: "",
  surname: "",
  fullName: "",
  dateOfBirth: "",
  timeOfBirth: "",
  placeOfBirth: "",
  profileImageUrl: DEFAULT_PROFILE_IMAGE_URL,
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const getUserProfile = async (uid) => {
  if (!uid) {
    throw new Error("User ID is required to fetch profile.");
  }

  const userDocRef = getUserDocRef(uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const minimalProfile = buildMinimalProfile(uid);
    await setDoc(userDocRef, minimalProfile, { merge: true });
    return minimalProfile;
  }

  const existingProfile = { uid, ...userSnapshot.data() };
  const resolvedImageUrl = resolveProfileImageUrl(existingProfile);

  if (existingProfile.profileImageUrl !== resolvedImageUrl) {
    await setDoc(
      userDocRef,
      {
        profileImageUrl: resolvedImageUrl,
        updatedAt: new Date(),
      },
      { merge: true }
    );
  }

  return { ...existingProfile, profileImageUrl: resolvedImageUrl };
};

export const updateUserProfile = async (uid, data) => {
  if (!uid) {
    throw new Error("User ID is required to update profile.");
  }

  const userDocRef = getUserDocRef(uid);
  const payload = {
    ...data,
    updatedAt: new Date(),
  };

  try {
    await updateDoc(userDocRef, payload);
  } catch (error) {
    const isMissingDocError =
      error?.code === "not-found" ||
      String(error?.message || "").includes("No document to update");

    if (!isMissingDocError) {
      throw error;
    }

    const minimalProfile = buildMinimalProfile(uid);
    await setDoc(userDocRef, { ...minimalProfile, ...payload }, { merge: true });
  }

  return getUserProfile(uid);
};

export { DEFAULT_PROFILE_IMAGE_URL };
