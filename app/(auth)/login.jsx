import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { loginUser } from "../../src/api/auth";

export default function LoginEmail() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isFormValid = email.trim().length > 0 && password.length >= 6;

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      console.log(email,password);
      await loginUser(email, password);

      // No router.push here
      // Auth listener handles redirect automatically
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

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
        {/* Logo */}
        <View className="items-center mt-8 mb-12">
          <View className="w-20 h-20 rounded-full bg-purple-600 items-center justify-center shadow-md shadow-purple-300/50">
            <Text className="text-4xl">🌌</Text>
          </View>
        </View>

        {/* Main Content */}
        <View className="flex-1">
          <Text className="text-3xl font-bold text-gray-900 mb-3">
            Welcome Back!
          </Text>

          <Text className="text-base text-gray-600 mb-8 leading-6">
            Sign in with your email and password to access your Melooha account.
          </Text>

          {/* Email */}
          <Text className="text-sm font-medium text-gray-700 mb-3">
            Email Address
          </Text>

          <TextInput
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-4 text-gray-900 font-medium mb-6"
            placeholderTextColor="#9ca3af"
          />

          {/* Password */}
          <Text className="text-sm font-medium text-gray-700 mb-3">
            Password
          </Text>

          <View className="flex-row items-center bg-gray-50 border-2 border-gray-200 rounded-xl px-4 mb-2">
            <TextInput
              placeholder="Min. 6 characters"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              className="flex-1 py-4 text-gray-900 font-medium"
              placeholderTextColor="#9ca3af"
            />
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              className="pl-2"
            >
              <Text className="text-purple-500 text-sm font-medium">
                {showPassword ? "Hide" : "Show"}
              </Text>
            </Pressable>
          </View>

          {/* Error Message */}
          {error ? (
            <Text className="text-red-500 text-sm mb-4">{error}</Text>
          ) : null}

          {/* Forgot Password */}
          <Pressable
            onPress={() => router.push("/forgotPassword")}
            className="self-end mb-8"
          >
            <Text className="text-purple-600 text-sm font-medium underline">
              Forgot Password?
            </Text>
          </Pressable>
        </View>

        {/* Bottom Section */}
        <View className="mb-6">
          <Text className="text-center text-sm text-gray-600 mb-4">
            By continuing, you agree to{" "}
            <Text className="text-purple-600 underline">Terms</Text>
            {" & "}
            <Text className="text-purple-600 underline">Privacy Policy</Text>.
          </Text>

          {/* Sign In Button */}
          <Pressable
            onPress={handleLogin}
            disabled={!isFormValid || loading}
            className="active:scale-98"
          >
            {({ pressed }) => (
              <View
                className={`rounded-2xl py-5 flex-row items-center justify-center shadow-md ${
                  !isFormValid || loading
                    ? "bg-purple-300 shadow-purple-200/50"
                    : pressed
                    ? "bg-purple-700 shadow-purple-400/50"
                    : "bg-purple-600 shadow-purple-300/50"
                }`}
              >
                {loading ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <>
                    <Text className="text-white text-center font-semibold text-lg mr-2">
                      Sign In
                    </Text>
                    <Text className="text-white text-xl">→</Text>
                  </>
                )}
              </View>
            )}
          </Pressable>

          {/* Divider */}
          <View className="flex-row items-center my-5">
            <View className="flex-1 h-px bg-gray-200" />
            <Text className="mx-4 text-gray-400 text-sm">or</Text>
            <View className="flex-1 h-px bg-gray-200" />
          </View>

          {/* Switch to Phone Login */}
          <Pressable
            onPress={() => router.push("/login")}
            className="items-center"
          >
            <Text className="text-gray-600 text-sm">
              Prefer OTP?{" "}
              <Text className="text-purple-600 font-semibold underline">
                Login with Phone
              </Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}