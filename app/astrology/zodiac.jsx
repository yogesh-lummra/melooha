import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function ZodiacPage() {
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  return (
    <ScrollView className="flex-1 bg-white px-6 p-10" showsVerticalScrollIndicator={false}>

      <Text className="text-3xl font-bold text-gray-900   text-center  ">Zodiac Sign Calculator</Text>
      <Text className="mt-2 text-base text-gray-500 text-center ">Discover your zodiac identity</Text>

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
        <Pressable className="mt-4 items-center rounded-xl bg-violet-600 py-3">
          <Text className="text-sm font-semibold text-white">Calculate Sign</Text>
        </Pressable>
      </View>

      <View className="mb-8 rounded-2xl border border-gray-100 bg-violet-50 p-5 shadow-sm">
        <Text className="text-4xl">{"\u2648"}</Text>
        <Text className="mt-3 text-2xl font-bold text-violet-700">Aries</Text>
        <Text className="mt-2 text-sm leading-6 text-violet-700">
          Bold and energetic, Aries thrives on initiative, courage, and fresh beginnings in every
          phase of life.
        </Text>
      </View>
    </ScrollView>
  );
}
