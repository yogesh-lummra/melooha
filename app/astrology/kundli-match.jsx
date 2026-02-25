import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function KundliMatchPage() {
  const [person1Date, setPerson1Date] = useState(null);
  const [person1Time, setPerson1Time] = useState(null);
  const [person2Date, setPerson2Date] = useState(null);
  const [person2Time, setPerson2Time] = useState(null);
  const [activePicker, setActivePicker] = useState(null);

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day} / ${month} / ${year}`;
  };

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours} : ${minutes}`;
  };

  const handlePickerChange = (_, selectedValue) => {
    if (!activePicker) return;
    if (selectedValue) {
      if (activePicker === "person1Date") setPerson1Date(selectedValue);
      if (activePicker === "person1Time") setPerson1Time(selectedValue);
      if (activePicker === "person2Date") setPerson2Date(selectedValue);
      if (activePicker === "person2Time") setPerson2Time(selectedValue);
    }
    setActivePicker(null);
  };

  const currentPickerValue =
    activePicker === "person1Date"
      ? person1Date
      : activePicker === "person1Time"
        ? person1Time
        : activePicker === "person2Date"
          ? person2Date
          : activePicker === "person2Time"
            ? person2Time
            : null;

  return (
    <ScrollView className="flex-1 bg-white px-6 p-10" showsVerticalScrollIndicator={false}>

      <Text className="text-3xl font-bold text-gray-900  text-center">Kundli Match</Text>
      <Text className="mt-2 text-base text-gray-500  text-center">Detailed marriage compatibility</Text>

      <View className="mb-8 mt-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <Text className="text-sm font-semibold text-gray-800">Person 1 Birth Details</Text>
        <Pressable
          onPress={() => setActivePicker("person1Date")}
          className="mt-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
        >
          <Text className="text-sm text-gray-400">
            {person1Date ? formatDate(person1Date) : "Date of Birth"}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setActivePicker("person1Time")}
          className="mt-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
        >
          <Text className="text-sm text-gray-400">
            {person1Time ? formatTime(person1Time) : "Time of Birth"}
          </Text>
        </Pressable>

        <Text className="mt-5 text-sm font-semibold text-gray-800">Person 2 Birth Details</Text>
        <Pressable
          onPress={() => setActivePicker("person2Date")}
          className="mt-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
        >
          <Text className="text-sm text-gray-400">
            {person2Date ? formatDate(person2Date) : "Date of Birth"}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setActivePicker("person2Time")}
          className="mt-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
        >
          <Text className="text-sm text-gray-400">
            {person2Time ? formatTime(person2Time) : "Time of Birth"}
          </Text>
        </Pressable>
        {activePicker && (
          <DateTimePicker
            value={currentPickerValue || new Date()}
            mode={activePicker.includes("Time") ? "time" : "date"}
            display="default"
            onChange={handlePickerChange}
          />
        )}

        <Pressable className="mt-4 items-center rounded-xl bg-violet-600 py-3">
          <Text className="text-sm font-semibold text-white">Match Now</Text>
        </Pressable>
      </View>

      <View className="mb-8 rounded-2xl border border-violet-100 bg-violet-50 p-5 shadow-sm">
        <Text className="text-sm font-medium text-violet-700">Ashtakoot Score</Text>
        <Text className="mt-1 text-3xl font-bold text-violet-700">28 / 36</Text>
        <Text className="mt-3 text-base font-semibold text-violet-700">Status: Strong Match</Text>
        <Text className="mt-4 text-sm leading-6 text-violet-700">� Balanced emotional understanding</Text>
        <Text className="text-sm leading-6 text-violet-700">� Strong communication compatibility</Text>
        <Text className="text-sm leading-6 text-violet-700">� Supportive long-term growth potential</Text>
      </View>
    </ScrollView>
  );
}
