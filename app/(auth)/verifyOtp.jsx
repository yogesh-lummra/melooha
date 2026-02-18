import { useRouter } from "expo-router";
import { Pressable, StatusBar, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const VerifyOtp = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Decorative Stars */}
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
            Verify OTP
          </Text>

          {/* Subtitle */}
          <Text className="text-base text-gray-600 mb-8 leading-6">
            Enter the 4-digit code sent to your phone number to verify your account.
          </Text>

          {/* OTP Label */}
          <Text className="text-sm font-medium text-gray-700 mb-3">
            Enter OTP
          </Text>

          {/* OTP Input Box - Single field */}
          <View className="mb-6">
            <TextInput
              keyboardType="number-pad"
              maxLength={4}
              placeholder="Enter 4-digit OTP"
              className="w-full bg-gray-50 border-2 border-gray-300 rounded-xl px-6 py-5 text-center text-2xl font-bold text-gray-900 tracking-widest"
              placeholderTextColor="#9ca3af"
            />
          </View>

          {/* Resend OTP */}
          <Pressable className="mb-8">
            <Text className="text-center text-sm text-gray-600">
              Didn't receive code?{" "}
              <Text className="text-purple-600 font-semibold">Resend OTP</Text>
            </Text>
          </Pressable>
        </View>

        {/* Bottom Section */}
        <View className="mb-6">
          {/* Verify Button */}
          <Pressable
            onPress={() => router.push("/basicInfo")}
            className="active:scale-98"
          >
            {({ pressed }) => (
              <View
                className={`rounded-2xl py-5 flex-row items-center justify-center shadow-md ${
                  pressed
                    ? "bg-purple-700 shadow-purple-400/50"
                    : "bg-purple-600 shadow-purple-300/50"
                }`}
              >
                <Text className="text-white text-center font-semibold text-lg mr-2"  >
                  Verify OTP
                </Text>
                <Text className="text-white text-xl">✓</Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VerifyOtp;