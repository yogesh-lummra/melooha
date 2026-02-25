import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function CompatibilityPage() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-white px-6 p-10" showsVerticalScrollIndicator={false}>

      <Text className="text-3xl font-bold text-gray-900  text-center">Compatibility Checker</Text>
      <Text className="mt-2 text-base text-gray-500  text-center">Check love compatibility</Text>

      <View className="mb-8 mt-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <Text className="text-sm font-semibold text-gray-700">Your Sign</Text>
        <View className="mt-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
          <Text className="text-sm text-gray-400">Select zodiac sign</Text>
        </View>

        <Text className="mt-4 text-sm font-semibold text-gray-700">Partner Sign</Text>
        <View className="mt-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
          <Text className="text-sm text-gray-400">Select partner sign</Text>
        </View>

        <Pressable className="mt-4 items-center rounded-xl bg-violet-600 py-3">
          <Text className="text-sm font-semibold text-white">Check Compatibility</Text>
        </Pressable>
      </View>

      <View className="mb-8 rounded-2xl border border-gray-100 bg-gray-50 p-5 shadow-sm">
        <Text className="text-sm font-medium text-gray-500">Compatibility Score</Text>
        <Text className="mt-1 text-3xl font-bold text-violet-700">78%</Text>
        <View className="mt-4 h-3 w-full overflow-hidden rounded-full bg-violet-100">
          <View className="h-3 rounded-full bg-violet-600" style={{ width: "78%" }} />
        </View>
        <Text className="mt-4 text-sm leading-6 text-gray-600">
          You both balance passion and emotional stability, creating strong long-term potential.
        </Text>
      </View>
    </ScrollView>
  );
}
