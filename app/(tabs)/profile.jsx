import { signOut } from "firebase/auth";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { auth } from "../../src/config/firebase";
import { useAuth } from "../../src/hooks/useAuth";
import { resolveProfileImageUrl } from "../../src/services/userService";

export default function Profile() {
  const router = useRouter();
  const { firebaseUser, profileData, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch {
      Alert.alert("Logout Failed", "Unable to logout right now. Please try again.");
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        <ActivityIndicator size="large" color="#7c3aed" />
        <Text className="mt-4 text-sm text-gray-500">Loading profile...</Text>
      </View>
    );
  }

  const fullName = profileData?.fullName?.trim()
    ? profileData.fullName.trim()
    : [profileData?.firstName, profileData?.surname].filter(Boolean).join(" ").trim() ||
      "No Name";

  const rows = [
    { label: "Age", value: profileData?.age ? String(profileData.age) : "Not provided" },
    { label: "Gender", value: profileData?.gender || "Not provided" },
    { label: "Birth Date", value: profileData?.dateOfBirth || "Not provided" },
    { label: "Birth Time", value: profileData?.timeOfBirth || "Not provided" },
    { label: "Birth Place", value: profileData?.placeOfBirth || "Not provided" },
  ];

  return (
    <View className="flex-1 bg-white px-6 pt-16">
      <View className="items-center mb-8">
        <Image
          source={{ uri: resolveProfileImageUrl(profileData) }}
          style={styles.profileImage}
        />
        <Text className="mt-4 text-2xl font-bold text-gray-900">{fullName}</Text>
        <Text className="mt-1 text-sm text-gray-400">
          {firebaseUser?.email || profileData?.email || "No email"}
        </Text>

        <Pressable
          onPress={() => router.push("/screens/edit-profile")}
          className="mt-5 rounded-2xl border border-violet-200 bg-violet-50 px-6 py-3"
        >
          <Text className="text-sm font-semibold text-violet-700">Edit Profile</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/screens/astrology-history")}
          className="mt-3 rounded-2xl border border-violet-200 bg-white px-6 py-3"
        >
          <Text className="text-sm font-semibold text-violet-700">Astrology History</Text>
        </Pressable>
      </View>

      <View className="rounded-2xl border border-gray-100 bg-gray-50 overflow-hidden mb-6">
        {rows.map((item, index) => (
          <View
            key={item.label}
            className={`px-5 py-4 flex-row items-center ${
              index !== rows.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            <Text className="text-gray-500 text-sm w-28">{item.label}</Text>
            <Text className="text-gray-900 text-sm font-semibold flex-1 text-right ml-4" numberOfLines={2}>
              {item.value}
            </Text>
          </View>
        ))}
      </View>

      <Pressable onPress={handleLogout}>
        <View className="bg-red-50 border border-red-100 rounded-2xl px-5 py-4 flex-row justify-center items-center">
          <Text className="text-red-600 text-sm font-semibold">Logout</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
  },
});
