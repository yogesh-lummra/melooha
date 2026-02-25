import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function CareerPage() {
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [timeOfBirth, setTimeOfBirth] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

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

  const handleDateChange = (_, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };

  const handleTimeChange = (_, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTimeOfBirth(selectedTime);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white px-6 p-10" showsVerticalScrollIndicator={false}>
      <Text className="text-3xl font-bold text-gray-900  text-center">Career Prediction</Text>
      <Text className="mt-2 text-base text-gray-500  text-center">Discover your career strengths</Text>

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

        <Text className="mt-4 text-sm font-semibold text-gray-700">Time of Birth</Text>
        <Pressable
          onPress={() => setShowTimePicker(true)}
          className="mt-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
        >
          <Text className="text-sm text-gray-400">
            {timeOfBirth ? formatTime(timeOfBirth) : "HH : MM"}
          </Text>
        </Pressable>
        {showTimePicker && (
          <DateTimePicker value={timeOfBirth || new Date()} mode="time" display="default" onChange={handleTimeChange} />
        )}

        <Pressable className="mt-4 items-center rounded-xl bg-violet-600 py-3">
          <Text className="text-sm font-semibold text-white">Analyze Career</Text>
        </Pressable>
      </View>

      <View className="mb-8 rounded-2xl border border-gray-100 bg-gray-50 p-5 shadow-sm">
        <Text className="text-sm font-medium text-gray-500">Career Strength</Text>
        <Text className="mt-1 text-2xl font-bold text-violet-700">Leadership</Text>

        <Text className="mt-4 text-sm font-medium text-gray-500">Suitable Fields</Text>
        <View className="mt-3 flex-row flex-wrap gap-2">
          <View className="rounded-full bg-violet-100 px-3 py-1.5">
            <Text className="text-xs font-semibold text-violet-700">Management</Text>
          </View>
          <View className="rounded-full bg-violet-100 px-3 py-1.5">
            <Text className="text-xs font-semibold text-violet-700">Entrepreneurship</Text>
          </View>
          <View className="rounded-full bg-violet-100 px-3 py-1.5">
            <Text className="text-xs font-semibold text-violet-700">Public Relations</Text>
          </View>
        </View>

        <Text className="mt-4 text-sm leading-6 text-gray-600">
          Your chart suggests confidence in decision-making and people guidance, making you well
          suited for dynamic, responsibility-driven roles.
        </Text>
      </View>
    </ScrollView>
  );
}
