import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useAuth } from "../src/hooks/useAuth";
import {
  DEFAULT_PROFILE_IMAGE_URL,
  updateUserProfile,
} from "../src/services/userService";

const buildFullName = (profileData) => {
  if (!profileData) return "";
  if (profileData.fullName?.trim()) return profileData.fullName.trim();

  return [profileData.firstName, profileData.surname]
    .filter(Boolean)
    .join(" ")
    .trim();
};

export default function EditProfileScreen() {
  const router = useRouter();
  const { firebaseUser, profileData, loading, refreshProfile } = useAuth();

  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthLocation, setBirthLocation] = useState("");
  const [saving, setSaving] = useState(false);

  const initialValues = useMemo(
    () => ({
      fullName: buildFullName(profileData),
      dateOfBirth: profileData?.dateOfBirth || "",
      birthTime: profileData?.timeOfBirth || "",
      birthLocation: profileData?.placeOfBirth || "",
    }),
    [profileData]
  );

  useEffect(() => {
    setFullName(initialValues.fullName);
    setDateOfBirth(initialValues.dateOfBirth);
    setBirthTime(initialValues.birthTime);
    setBirthLocation(initialValues.birthLocation);
  }, [initialValues]);

  const handleSave = async () => {
    const trimmedName = fullName.trim();

    if (!trimmedName) {
      Alert.alert("Validation Error", "Full Name cannot be empty.");
      return;
    }

    if (!firebaseUser?.uid) {
      Alert.alert("Session Error", "Unable to find your account. Please login again.");
      return;
    }

    const nameParts = trimmedName.split(/\s+/);
    const firstName = nameParts.shift() || "";
    const surname = nameParts.join(" ");

    try {
      setSaving(true);
      await updateUserProfile(firebaseUser.uid, {
        fullName: trimmedName,
        firstName,
        surname,
        dateOfBirth: dateOfBirth.trim(),
        timeOfBirth: birthTime.trim(),
        placeOfBirth: birthLocation.trim(),
        profileImageUrl: profileData?.profileImageUrl || DEFAULT_PROFILE_IMAGE_URL,
      });

      await refreshProfile();
      router.back();
    } catch {
      Alert.alert("Update Failed", "Unable to update profile right now. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !profileData) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        <ActivityIndicator size="large" color="#7c3aed" />
        <Text className="mt-4 text-sm text-gray-500">Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 40 }}
      keyboardShouldPersistTaps="handled"
    >
      <Text className="text-xs font-semibold tracking-widest uppercase text-violet-500">
        Account Settings
      </Text>
      <Text className="mt-2 text-3xl font-bold text-gray-900">Edit Profile</Text>
      <Text className="mt-1 text-sm text-gray-500">Update your personal and birth details.</Text>

      <View className="mt-8 rounded-2xl border border-gray-100 bg-gray-50 p-5">
        <Text className="text-xs font-semibold text-gray-500 mb-2">Full Name</Text>
        <TextInput
          value={fullName}
          onChangeText={setFullName}
          placeholder="Your full name"
          className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900"
          placeholderTextColor="#9ca3af"
        />

        <Text className="text-xs font-semibold text-gray-500 mb-2 mt-5">Birth Date</Text>
        <TextInput
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
          placeholder="DD / MM / YYYY"
          className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900"
          placeholderTextColor="#9ca3af"
        />

        <Text className="text-xs font-semibold text-gray-500 mb-2 mt-5">Birth Time</Text>
        <TextInput
          value={birthTime}
          onChangeText={setBirthTime}
          placeholder="HH : MM"
          className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900"
          placeholderTextColor="#9ca3af"
        />

        <Text className="text-xs font-semibold text-gray-500 mb-2 mt-5">Birth Place</Text>
        <TextInput
          value={birthLocation}
          onChangeText={setBirthLocation}
          placeholder="City, Country"
          className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900"
          placeholderTextColor="#9ca3af"
        />
      </View>

      <Pressable
        onPress={handleSave}
        disabled={saving}
        className={`mt-8 rounded-2xl py-4 ${saving ? "bg-violet-300" : "bg-violet-600"}`}
      >
        {saving ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text className="text-center text-white text-sm font-semibold">Save Changes</Text>
        )}
      </Pressable>
    </ScrollView>
  );
}
