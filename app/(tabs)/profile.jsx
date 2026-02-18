import { Text, View } from "react-native";

export default function Profile() {
  return (
    <View className="flex-1 bg-white px-6 pt-16">


      <View className="mb-8">
        <Text className="text-xs font-bold tracking-widest text-violet-500 uppercase mb-2">
          Your Account
        </Text>
        <Text className="text-3xl font-bold text-gray-900">
          Profile
        </Text>
        <Text className="text-gray-400 text-sm mt-1">
          Manage your cosmic identity
        </Text>
      </View>


      <View className="items-center mb-8">
        <View className="w-20 h-20 rounded-full bg-violet-100 border-2 border-violet-200 items-center justify-center mb-3">
          <Text className="text-3xl">✦</Text>
        </View>
        <Text className="text-gray-900 text-lg font-bold">Luna Starr</Text>
        <Text className="text-gray-400 text-sm">luna@melooha.com</Text>
      </View>


      <View className="bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden mb-4">
        {[
          { label: "Date of Birth", value: "12 / 06 / 1998" },
          { label: "Time of Birth", value: "08:30 AM" },
          { label: "Place of Birth", value: "Mumbai, India" },
          { label: "Gender", value: "Female" },
        ].map((item, index, arr) => (
          <View
            key={item.label}
            className={`px-5 py-4 flex-row justify-between items-center ${
              index !== arr.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            <Text className="text-gray-500 text-sm">{item.label}</Text>
            <Text className="text-gray-900 text-sm font-semibold">{item.value}</Text>
          </View>
        ))}
      </View>


      <View className="bg-violet-50 border border-violet-100 rounded-2xl px-5 py-4 flex-row justify-between items-center">
        <Text className="text-violet-700 text-sm font-semibold">Edit Profile</Text>
        <Text className="text-violet-400 text-base">›</Text>
      </View>

    </View>
  );
}