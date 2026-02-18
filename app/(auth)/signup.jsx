import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { signupUser } from "../../src/api/auth";

const Signup = () => {
  const router = useRouter();

  // Personal Details
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  // Birth Details
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [timeOfBirth, setTimeOfBirth] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");

  // Account Details
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const isFormValid =
    firstName.trim() &&
    surname.trim() &&
    age.trim() &&
    gender.trim() &&
    dateOfBirth.trim() &&
    timeOfBirth.trim() &&
    placeOfBirth.trim() &&
    email.trim() &&
    password.length >= 6 &&
    password === confirmPassword;

  const handleSignup = async () => {
    try {
      setLoading(true);
      const userData = {
        firstName,
        surname,
        age,
        gender,
        dateOfBirth,
        timeOfBirth,
        placeOfBirth,
        email,
        password,
      };
      console.log(userData);
      await signupUser(userData);

      Alert.alert(
        "Account Created! 🌌",
        "Your account has been created successfully. Please log in to continue.",
        [{ text: "Login", onPress: () => router.replace("/login") }]
      );
    } catch (error) {
      console.log(error.message);
      Alert.alert("Signup Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Header */}
      <View className="bg-violet-600 px-6 pt-6 pb-6 rounded-b-3xl mb-8">
        <Text className="text-white text-4xl font-bold leading-tight mb-2">
          Create Account
        </Text>
        <Text className="text-violet-200 text-sm">
          Sign up to generate your personalized birth chart
        </Text>
      </View>

      <View className="px-6">

        {/* ── Section: Account ── */}
        <Text className="text-xs font-bold tracking-widest text-violet-500 uppercase mb-3">
          Account Details
        </Text>

        {/* Email */}
        <View className="mb-3">
          <Text className="text-xs font-semibold text-gray-500 mb-1 ml-1">
            Email Address
          </Text>
          <View className="bg-violet-50 border border-violet-100 rounded-xl px-4 py-3 flex-row items-center">
            <Text className="text-violet-400 mr-3 text-base">✉️</Text>
            <TextInput
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#C4B5FD"
              className="flex-1 text-gray-900 text-sm font-medium"
            />
          </View>
        </View>

        {/* Password */}
        <View className="mb-3">
          <Text className="text-xs font-semibold text-gray-500 mb-1 ml-1">
            Password
          </Text>
          <View className="bg-violet-50 border border-violet-100 rounded-xl px-4 py-3 flex-row items-center">
            <Text className="text-violet-400 mr-3 text-base">🔒</Text>
            <TextInput
              placeholder="Min. 6 characters"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholderTextColor="#C4B5FD"
              className="flex-1 text-gray-900 text-sm font-medium"
            />
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Text className="text-violet-500 text-xs font-semibold">
                {showPassword ? "Hide" : "Show"}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Confirm Password */}
        <View className="mb-6">
          <Text className="text-xs font-semibold text-gray-500 mb-1 ml-1">
            Confirm Password
          </Text>
          <View
            className={`bg-violet-50 border rounded-xl px-4 py-3 flex-row items-center ${confirmPassword && confirmPassword !== password
                ? "border-red-300"
                : "border-violet-100"
              }`}
          >
            <Text className="text-violet-400 mr-3 text-base">🔒</Text>
            <TextInput
              placeholder="Re-enter password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              placeholderTextColor="#C4B5FD"
              className="flex-1 text-gray-900 text-sm font-medium"
            />
            <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Text className="text-violet-500 text-xs font-semibold">
                {showConfirmPassword ? "Hide" : "Show"}
              </Text>
            </Pressable>
          </View>
          {confirmPassword && confirmPassword !== password && (
            <Text className="text-red-400 text-xs mt-1 ml-1">
              Passwords do not match
            </Text>
          )}
        </View>

        {/* Divider */}
        <View className="flex-row items-center mb-6">
          <View className="flex-1 h-px bg-gray-100" />
          <Text className="mx-3 text-gray-400 text-xs font-medium">✦</Text>
          <View className="flex-1 h-px bg-gray-100" />
        </View>

        {/* ── Section: Personal ── */}
        <Text className="text-xs font-bold tracking-widest text-violet-500 uppercase mb-3">
          Personal Details
        </Text>

        {/* First Name + Surname row */}
        <View className="flex-row gap-3 mb-3">
          <View className="flex-1">
            <Text className="text-xs font-semibold text-gray-500 mb-1 ml-1">
              First Name
            </Text>
            <TextInput
              placeholder="e.g. Luna"
              value={firstName}
              onChangeText={setFirstName}
              placeholderTextColor="#C4B5FD"
              className="bg-violet-50 border border-violet-100 text-gray-900 px-4 py-3 rounded-xl text-sm font-medium"
            />
          </View>
          <View className="flex-1">
            <Text className="text-xs font-semibold text-gray-500 mb-1 ml-1">
              Surname
            </Text>
            <TextInput
              placeholder="e.g. Starr"
              value={surname}
              onChangeText={setSurname}
              placeholderTextColor="#C4B5FD"
              className="bg-violet-50 border border-violet-100 text-gray-900 px-4 py-3 rounded-xl text-sm font-medium"
            />
          </View>
        </View>

        {/* Age */}
        <View className="mb-3">
          <Text className="text-xs font-semibold text-gray-500 mb-1 ml-1">
            Age
          </Text>
          <TextInput
            placeholder="Your current age"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
            placeholderTextColor="#C4B5FD"
            className="bg-violet-50 border border-violet-100 text-gray-900 px-4 py-3 rounded-xl text-sm font-medium"
          />
        </View>

        {/* Gender */}
        <View className="mb-6">
          <Text className="text-xs font-semibold text-gray-500 mb-1 ml-1">
            Gender
          </Text>
          <TextInput
            placeholder="e.g. Female, Male, Non-binary"
            value={gender}
            onChangeText={setGender}
            placeholderTextColor="#C4B5FD"
            className="bg-violet-50 border border-violet-100 text-gray-900 px-4 py-3 rounded-xl text-sm font-medium"
          />
        </View>

        {/* Divider */}
        <View className="flex-row items-center mb-6">
          <View className="flex-1 h-px bg-gray-100" />
          <Text className="mx-3 text-gray-400 text-xs font-medium">✦</Text>
          <View className="flex-1 h-px bg-gray-100" />
        </View>

        {/* ── Section: Birth Details ── */}
        <Text className="text-xs font-bold tracking-widest text-violet-500 uppercase mb-3">
          Birth Details
        </Text>

        {/* Date of Birth */}
        <View className="mb-3">
          <Text className="text-xs font-semibold text-gray-500 mb-1 ml-1">
            Date of Birth
          </Text>
          <View className="bg-violet-50 border border-violet-100 rounded-xl px-4 py-3 flex-row items-center">
            <Text className="text-violet-400 mr-3 text-base">📅</Text>
            <TextInput
              placeholder="DD / MM / YYYY"
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
              placeholderTextColor="#C4B5FD"
              className="flex-1 text-gray-900 text-sm font-medium"
            />
          </View>
        </View>

        {/* Time of Birth */}
        <View className="mb-3">
          <Text className="text-xs font-semibold text-gray-500 mb-1 ml-1">
            Time of Birth
          </Text>
          <View className="bg-violet-50 border border-violet-100 rounded-xl px-4 py-3 flex-row items-center">
            <Text className="text-violet-400 mr-3 text-base">🕐</Text>
            <TextInput
              placeholder="HH : MM  AM / PM"
              value={timeOfBirth}
              onChangeText={setTimeOfBirth}
              placeholderTextColor="#C4B5FD"
              className="flex-1 text-gray-900 text-sm font-medium"
            />
          </View>
        </View>

        {/* Place of Birth */}
        <View className="mb-8">
          <Text className="text-xs font-semibold text-gray-500 mb-1 ml-1">
            Place of Birth
          </Text>
          <View className="bg-violet-50 border border-violet-100 rounded-xl px-4 py-3 flex-row items-center">
            <Text className="text-violet-400 mr-3 text-base">📍</Text>
            <TextInput
              placeholder="City, Country"
              value={placeOfBirth}
              onChangeText={setPlaceOfBirth}
              placeholderTextColor="#C4B5FD"
              className="flex-1 text-gray-900 text-sm font-medium"
            />
          </View>
        </View>

        {/* Info Card */}
        <View className="bg-violet-50 border border-violet-100 rounded-2xl p-4 mb-8 flex-row items-start">
          <Text className="text-violet-500 text-lg mr-3 mt-0.5">✦</Text>
          <Text className="flex-1 text-violet-700 text-xs leading-5 font-medium">
            Your birth time and place are used to calculate accurate planetary
            positions. Your data stays private, encrypted, and never shared.
          </Text>
        </View>

        {/* CTA Button */}
        <Pressable
          className={`py-4 rounded-2xl mb-4 shadow-sm ${isFormValid && !loading ? "bg-violet-600 active:bg-violet-700" : "bg-violet-300"}`}
          onPress={handleSignup}
          disabled={!isFormValid || loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text className="text-black bg-transparent text-center font-bold text-base tracking-wide">
              ✦  Create My Account
            </Text>
          )}
        </Pressable>

        {/* Login Link */}
        <Pressable onPress={() => router.push("/login")} className="mb-2">
          <Text className="text-center text-gray-500 text-xs">
            Already have an account?{" "}
            <Text className="text-violet-600 font-semibold underline">Sign In</Text>
          </Text>
        </Pressable>

        <Text className="text-center text-gray-400 text-xs mb-2">
          Your details are encrypted and never shared
        </Text>
      </View>
    </ScrollView>
  );
};

export default Signup;