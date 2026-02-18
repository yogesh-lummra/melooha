import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StatusBar, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Decorative Stars - More visible */}
      <View className="absolute top-20 left-10 w-3 h-3 bg-purple-400 rounded-full opacity-70" />
      <View className="absolute top-36 right-14 w-4 h-4 bg-purple-500 rounded-full opacity-60" />
      <View className="absolute top-56 left-14 w-3 h-3 bg-purple-400 rounded-full opacity-65" />
      <View className="absolute top-80 right-12 w-2 h-2 bg-purple-300 rounded-full opacity-75" />
      <View className="absolute bottom-40 right-12 w-3 h-3 bg-purple-500 rounded-full opacity-60" />
      <View className="absolute bottom-56 left-12 w-2 h-2 bg-purple-400 rounded-full opacity-80" />
      <View className="absolute top-[45%] right-20 w-2 h-2 bg-purple-300 rounded-full opacity-70" />
      <View className="absolute top-[60%] left-16 w-3 h-3 bg-purple-400 rounded-full opacity-65" />
      
      <View className="flex-1 px-6">
        {/* Logo at top */}
        <View className="items-center mt-8 mb-12">
          <View className="w-20 h-20 rounded-full bg-purple-600 items-center justify-center shadow-md shadow-purple-300/50">
            <Text className="text-4xl">🌌</Text>
          </View>
        </View>

        {/* Main Content */}
        <View className="flex-1">
          {/* Title */}
          <Text className="text-3xl font-bold text-gray-900 mb-3">
            Let's Get Started!
          </Text>

          {/* Subtitle */}
          <Text className="text-base text-gray-600 mb-8 leading-6">
            Enter your phone number to get your account registered with Melooha or access your account.
          </Text>

          {/* Phone Number Label */}
          <Text className="text-sm font-medium text-gray-700 mb-3">
            Phone Number
          </Text>

          {/* Phone Input Row with more spacing */}
          <View className="flex-row gap-4 mb-8">
            {/* Country Code Dropdown */}
            <View className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-4 flex-row items-center justify-between w-32">
              <Text className="text-gray-800 font-medium">+91 - IN</Text>
              <Text className="text-gray-600">▼</Text>
            </View>

            {/* Phone Number Input */}
            <TextInput
              placeholder="9373979469"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              className="flex-1 bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-4 text-gray-900 font-medium"
              placeholderTextColor="#9ca3af"
            />
          </View>
        </View>

        {/* Bottom Section */}
        <View className="mb-6">
          {/* Terms & Privacy */}
          <Text className="text-center text-sm text-gray-600 mb-4">
            By continuing, you agree to{" "}
            <Text className="text-purple-600 underline">Terms</Text>
            {" & "}
            <Text className="text-purple-600 underline">Privacy Policy</Text>.
          </Text>

          {/* Get OTP Button */}
          <Pressable
            onPress={() => router.push("/verifyOtp")}
            className="active:scale-98"
          >
            {({ pressed }) => (
              <View
                className={`rounded-2xl py-5 flex-row items-center justify-center shadow-md ${
                  pressed ? "bg-purple-700 shadow-purple-400/50" : "bg-purple-600 shadow-purple-300/50"
                }`}
              >
                <Text className="text-white text-center font-semibold text-lg mr-2">
                  Get OTP
                </Text>
                <Text className="text-white text-xl">→</Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}