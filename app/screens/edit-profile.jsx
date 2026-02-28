import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useAuth } from "../../src/hooks/useAuth";
import {
  DEFAULT_PROFILE_IMAGE_URL,
  updateUserProfile,
} from "../../src/services/userService";

const buildFullName = (profileData) => {
  if (!profileData) return "";
  if (profileData.fullName?.trim()) return profileData.fullName.trim();

  return [profileData.firstName, profileData.surname]
    .filter(Boolean)
    .join(" ")
    .trim();
};

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

const formatTime = (date) => {
  const hours24 = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const period = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 || 12;

  return `${String(hours12).padStart(2, "0")}:${minutes} ${period}`;
};

const parseDateString = (value) => {
  const parts = String(value || "").split("/");
  if (parts.length !== 3) return new Date();

  const day = Number(parts[0]);
  const month = Number(parts[1]);
  const year = Number(parts[2]);
  if (!day || !month || !year) return new Date();

  const parsedDate = new Date(year, month - 1, day);
  return Number.isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
};

const parseTimeString = (value) => {
  const match = String(value || "").trim().match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i);
  if (!match) return new Date();

  const base = new Date();
  let hours = Number(match[1]) % 12;
  const minutes = Number(match[2]);
  const period = match[3].toUpperCase();
  if (period === "PM") hours += 12;

  base.setHours(hours, minutes, 0, 0);
  return base;
};

export default function EditProfileScreen() {
  const router = useRouter();
  const { firebaseUser, profileData, loading, refreshProfile } = useAuth();

  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthLocation, setBirthLocation] = useState("");
  const [dobDate, setDobDate] = useState(new Date());
  const [birthTimeDate, setBirthTimeDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
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
    setDobDate(parseDateString(initialValues.dateOfBirth));
    setBirthTimeDate(parseTimeString(initialValues.birthTime));
  }, [initialValues]);

  const handleDateChange = (_event, selectedDate) => {
    setShowDatePicker(false);
    if (!selectedDate) return;

    setDobDate(selectedDate);
    setDateOfBirth(formatDate(selectedDate));
  };

  const handleTimeChange = (_event, selectedTime) => {
    setShowTimePicker(false);
    if (!selectedTime) return;

    setBirthTimeDate(selectedTime);
    setBirthTime(formatTime(selectedTime));
  };

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

  if (loading) {
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
        <Text className="mb-2 text-xs font-semibold text-gray-500">Full Name</Text>
        <TextInput
          value={fullName}
          onChangeText={setFullName}
          placeholder="Your full name"
          className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900"
          placeholderTextColor="#9ca3af"
        />

        <Text className="mb-2 mt-5 text-xs font-semibold text-gray-500">Birth Date</Text>
        <Pressable
          onPress={() => setShowDatePicker(true)}
          className="rounded-xl border border-gray-200 bg-white px-4 py-3"
        >
          <Text className={`text-sm ${dateOfBirth ? "text-gray-900" : "text-gray-400"}`}>
            {dateOfBirth || "Select date"}
          </Text>
        </Pressable>
        {showDatePicker && (
          <DateTimePicker
            value={dobDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <Text className="mb-2 mt-5 text-xs font-semibold text-gray-500">Birth Time</Text>
        <Pressable
          onPress={() => setShowTimePicker(true)}
          className="rounded-xl border border-gray-200 bg-white px-4 py-3"
        >
          <Text className={`text-sm ${birthTime ? "text-gray-900" : "text-gray-400"}`}>
            {birthTime || "Select time"}
          </Text>
        </Pressable>
        {showTimePicker && (
          <DateTimePicker
            value={birthTimeDate}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}

        <Text className="mb-2 mt-5 text-xs font-semibold text-gray-500">Birth Place</Text>
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
          <Text className="text-center text-sm font-semibold text-white">Save Changes</Text>
        )}
      </Pressable>
    </ScrollView>
  );
}
