import { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { useAuth } from "../../src/hooks/useAuth";
import { calculateLifePathNumber } from "../../src/services/astrologyService";
import { saveToolHistory } from "../../src/services/historyService";

const parseDobStringToDate = (value) => {
  const parts = String(value || "")
    .split(/[^\d]/)
    .filter(Boolean);

  if (parts.length !== 3) return null;

  const day = Number(parts[0]);
  const month = Number(parts[1]);
  const year = Number(parts[2]);
  if (!day || !month || !year) return null;

  const parsedDate = new Date(year, month - 1, day);
  if (Number.isNaN(parsedDate.getTime())) return null;

  if (
    parsedDate.getDate() !== day ||
    parsedDate.getMonth() + 1 !== month ||
    parsedDate.getFullYear() !== year
  ) {
    return null;
  }

  return parsedDate;
};

export default function LuckyPage() {
  const { firebaseUser, profileData } = useAuth();
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [result, setResult] = useState(null);

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day} / ${month} / ${year}`;
  };

  const handleDateChange = (_, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };

  const handleCalculate = async () => {
    if (!dateOfBirth) {
      setResult(null);
      return;
    }

    const lifePathResult = calculateLifePathNumber(formatDate(dateOfBirth));
    setResult(lifePathResult);

    if (!firebaseUser?.uid || !lifePathResult) {
      return;
    }

    try {
      await saveToolHistory(
        firebaseUser.uid,
        "Lucky Number Calculator",
        { dateOfBirth: formatDate(dateOfBirth) },
        lifePathResult
      );
    } catch {
      Alert.alert("History Save Failed", "Unable to save lucky number history right now.");
    }
  };

  useEffect(() => {
    if (dateOfBirth || !profileData?.dateOfBirth) {
      return;
    }

    const parsedProfileDob = parseDobStringToDate(profileData.dateOfBirth);
    if (parsedProfileDob) {
      setDateOfBirth(parsedProfileDob);
    }
  }, [dateOfBirth, profileData?.dateOfBirth]);

  return (
    <ScrollView className="flex-1 bg-white px-6 p-10" showsVerticalScrollIndicator={false}>
      <Text className="text-3xl font-bold text-gray-900   text-center">Lucky Color & Number</Text>
      <Text className="mt-2 text-base text-gray-500  text-center">Today&apos;s cosmic fortune</Text>

      <View className="mb-8 mt-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <Text className="text-sm font-semibold text-gray-700">Date of Birth</Text>
        <Pressable
          onPress={() => setShowDatePicker(true)}
          className="mt-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
        >
          <Text className="text-sm text-gray-400">
            {dateOfBirth ? formatDate(dateOfBirth) : "DD / MM / YYYY"}
          </Text>
        </Pressable>
        {showDatePicker && (
          <DateTimePicker value={dateOfBirth || new Date()} mode="date" display="default" onChange={handleDateChange} />
        )}
        <Pressable onPress={handleCalculate} className="mt-4 items-center rounded-xl bg-violet-600 py-4">
          <Text className="text-sm font-semibold text-white">Reveal My Luck</Text>
        </Pressable>
      </View>

      <View className="mb-8 rounded-2xl border border-gray-100 bg-gray-50 p-5 shadow-sm">
        <View className="h-16 w-16 rounded-full border border-violet-200 bg-violet-500" />
        <Text className="mt-4 text-sm font-medium text-gray-500">Life Path Number</Text>
        <Text className="mt-1 text-4xl font-bold text-violet-700">{result?.lifePathNumber || "-"}</Text>
        <Text className="mt-3 text-sm leading-6 text-gray-600">
          {result?.meaning || "Pick your date of birth to reveal your life path meaning."}
        </Text>
      </View>
    </ScrollView>
  );
}
