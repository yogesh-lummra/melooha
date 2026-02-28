import { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { useAuth } from "../../src/hooks/useAuth";
import { getCompatibility, getZodiacSign } from "../../src/services/astrologyService";
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

export default function CompatibilityPage() {
  const { firebaseUser, profileData } = useAuth();
  const [yourDateOfBirth, setYourDateOfBirth] = useState(null);
  const [partnerDateOfBirth, setPartnerDateOfBirth] = useState(null);
  const [activePicker, setActivePicker] = useState(null);
  const [result, setResult] = useState(null);

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day} / ${month} / ${year}`;
  };

  const handlePickerChange = (_, selectedDate) => {
    if (selectedDate) {
      if (activePicker === "you") setYourDateOfBirth(selectedDate);
      if (activePicker === "partner") setPartnerDateOfBirth(selectedDate);
    }
    setActivePicker(null);
  };

  const handleCalculate = async () => {
    if (!yourDateOfBirth || !partnerDateOfBirth) {
      setResult(null);
      return;
    }

    const yourSign = getZodiacSign(yourDateOfBirth.getDate(), yourDateOfBirth.getMonth() + 1);
    const partnerSign = getZodiacSign(
      partnerDateOfBirth.getDate(),
      partnerDateOfBirth.getMonth() + 1
    );

    if (!yourSign || !partnerSign) {
      setResult(null);
      return;
    }

    const compatibility = getCompatibility(yourSign.name, partnerSign.name);
    const nextResult = {
      yourSign: yourSign.name,
      partnerSign: partnerSign.name,
      score: compatibility?.score ?? 0,
      description: compatibility?.description || "",
    };
    setResult(nextResult);

    if (!firebaseUser?.uid) {
      return;
    }

    try {
      await saveToolHistory(
        firebaseUser.uid,
        "Compatibility Calculator",
        {
          yourDateOfBirth: formatDate(yourDateOfBirth),
          partnerDateOfBirth: formatDate(partnerDateOfBirth),
          yourSign: yourSign.name,
          partnerSign: partnerSign.name,
        },
        nextResult
      );
    } catch {
      Alert.alert("History Save Failed", "Unable to save compatibility history right now.");
    }
  };

  useEffect(() => {
    if (yourDateOfBirth || !profileData?.dateOfBirth) {
      return;
    }

    const parsedProfileDob = parseDobStringToDate(profileData.dateOfBirth);
    if (parsedProfileDob) {
      setYourDateOfBirth(parsedProfileDob);
    }
  }, [profileData?.dateOfBirth, yourDateOfBirth]);

  return (
    <ScrollView className="flex-1 bg-white px-6 p-10" showsVerticalScrollIndicator={false}>

      <Text className="text-3xl font-bold text-gray-900  text-center">Compatibility Checker</Text>
      <Text className="mt-2 text-base text-gray-500  text-center">Check love compatibility</Text>

      <View className="mb-8 mt-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <Text className="text-sm font-semibold text-gray-700">Your Date of Birth</Text>
        <Pressable
          onPress={() => setActivePicker("you")}
          className="mt-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
        >
          <Text className="text-sm text-gray-400">
            {yourDateOfBirth ? formatDate(yourDateOfBirth) : "DD / MM / YYYY"}
          </Text>
        </Pressable>

        <Text className="mt-4 text-sm font-semibold text-gray-700">Partner Date of Birth</Text>
        <Pressable
          onPress={() => setActivePicker("partner")}
          className="mt-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
        >
          <Text className="text-sm text-gray-400">
            {partnerDateOfBirth ? formatDate(partnerDateOfBirth) : "DD / MM / YYYY"}
          </Text>
        </Pressable>
        {activePicker && (
          <DateTimePicker
            value={
              activePicker === "you"
                ? yourDateOfBirth || new Date()
                : partnerDateOfBirth || new Date()
            }
            mode="date"
            display="default"
            onChange={handlePickerChange}
          />
        )}

        <Pressable onPress={handleCalculate} className="mt-4 items-center rounded-xl bg-violet-600 py-3">
          <Text className="text-sm font-semibold text-white">Check Compatibility</Text>
        </Pressable>
      </View>

      <View className="mb-8 rounded-2xl border border-gray-100 bg-gray-50 p-5 shadow-sm">
        <Text className="text-sm font-medium text-gray-500">Compatibility Score</Text>
        <Text className="mt-1 text-3xl font-bold text-violet-700">{result ? `${result.score}%` : "-"}</Text>
        <View className="mt-4 h-3 w-full overflow-hidden rounded-full bg-violet-100">
          <View className="h-3 rounded-full bg-violet-600" style={{ width: `${result?.score || 0}%` }} />
        </View>
        <Text className="mt-4 text-sm font-medium text-gray-500">
          {result ? `${result.yourSign} + ${result.partnerSign}` : "Your signs will appear here"}
        </Text>
        <Text className="mt-4 text-sm leading-6 text-gray-600">
          {result?.description || "Enter both birth dates to check compatibility details."}
        </Text>
      </View>
    </ScrollView>
  );
}
