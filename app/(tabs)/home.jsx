import { Text, View } from "react-native";

export default function Home() {
  return (
    <View className="flex-1 bg-white px-6 pt-16">

      <View className="mb-8">
        <Text className="text-xs font-bold tracking-widest text-violet-500 uppercase mb-2">
          Dashboard
        </Text>
        <Text className="text-3xl font-bold text-gray-900">
          Welcome to Melooha
        </Text>
        <Text className="text-gray-400 text-sm mt-1">
          Your cosmic journey begins here
        </Text>
      </View>


      <View className="bg-violet-50 border border-violet-100 rounded-2xl p-5 mb-4">
        <Text className="text-violet-500 text-xs font-bold tracking-widest uppercase mb-2">
          ✦ Today's Insight
        </Text>
        <Text className="text-gray-800 text-base font-semibold mb-1">
          Your stars are aligned
        </Text>
        <Text className="text-gray-500 text-sm leading-5">
          The universe is guiding you toward clarity and purpose today.
        </Text>
      </View>

      <View className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
        <Text className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">
          Quick Actions
        </Text>
        <Text className="text-gray-800 text-base font-semibold mb-1">
          View your birth chart
        </Text>
        <Text className="text-gray-400 text-sm">
          Tap to explore your full cosmic profile
        </Text>
      </View>

    </View>
  );
}