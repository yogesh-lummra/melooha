import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function LuckyPage() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-white px-6 p-10" showsVerticalScrollIndicator={false}>
      <Text className="text-3xl font-bold text-gray-900   text-center">Lucky Color & Number</Text>
      <Text className="mt-2 text-base text-gray-500  text-center">Today&apos;s cosmic fortune</Text>

      <View className="mb-8 mt-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <Pressable className="items-center rounded-xl bg-violet-600 py-4">
          <Text className="text-sm font-semibold text-white">Reveal My Luck</Text>
        </Pressable>
      </View>

      <View className="mb-8 rounded-2xl border border-gray-100 bg-gray-50 p-5 shadow-sm">
        <View className="h-16 w-16 rounded-full border border-violet-200 bg-violet-500" />
        <Text className="mt-4 text-sm font-medium text-gray-500">Lucky Number</Text>
        <Text className="mt-1 text-4xl font-bold text-violet-700">27</Text>
        <Text className="mt-3 text-sm leading-6 text-gray-600">
          Trust your timing today. Consistent effort and calm focus can open meaningful
          opportunities.
        </Text>
      </View>
    </ScrollView>
  );
}
