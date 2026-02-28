import { useRouter } from "expo-router";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { signupUser } from "../../src/api/auth";
import { auth } from "../../src/config/firebase";
import { signOut } from "firebase/auth";

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

const formatTime = (date) => {
  const hours24 = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const period = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 || 12;

  return `${String(hours12).padStart(2, "0")}:${minutes} ${period}`;
};

const Signup = () => {
  const router = useRouter();
  const genderOptions = ["Male", "Female", "Other"];

  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [showGenderOptions, setShowGenderOptions] = useState(false);

  const [dateOfBirth, setDateOfBirth] = useState("");
  const [timeOfBirth, setTimeOfBirth] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [dobDate, setDobDate] = useState(new Date());
  const [birthTimeDate, setBirthTimeDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

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

  const handleDateChange = (_event, selectedDate) => {
    setShowDatePicker(false);

    if (!selectedDate) return;

    setDobDate(selectedDate);
    setDateOfBirth(formatDate(selectedDate));
  };

  const handleTimeChange = (_event, selectedTime) => {
    setShowTimePicker(false);

    if (!selectedTime) return;

    setBirthTimeDate(selectedTime);
    setTimeOfBirth(formatTime(selectedTime));
  };

  const handleSignup = async () => {
    try {
      setLoading(true);

      const userData = {
        firstName: firstName.trim(),
        surname: surname.trim(),
        age: age.trim(),
        gender: gender.trim(),
        dateOfBirth: dateOfBirth.trim(),
        timeOfBirth: timeOfBirth.trim(),
        placeOfBirth: placeOfBirth.trim(),
        email: email.trim(),
        password,
      };

      await signupUser(userData);
      await signOut(auth);

      Alert.alert(
        "Account Created",
        "Your account has been created successfully. Please log in to continue.",
        [{ text: "Login", onPress: () => router.replace("/login") }]
      );
    } catch (error) {
      Alert.alert("Signup Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StatusBar hidden={true} />
      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-violet-600 px-6 pt-6 pb-6 rounded-b-3xl mb-8">
          <Text className="text-white text-4xl font-bold leading-tight mb-2">
            Create Account
          </Text>
          <Text className="text-violet-200 text-sm">
            Sign up to generate your personalized birth chart
          </Text>
        </View>

        <View className="px-6">
          <Text className="text-xs font-bold tracking-widest text-violet-500 uppercase mb-3">
            Account Details
          </Text>

          <View className="mb-3">
            <Text className="text-xs font-semibold text-gray-500 mb-1 ml-1">
              Email Address
            </Text>
            <TextInput
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#C4B5FD"
              className="bg-violet-50 border border-violet-100 rounded-xl px-4 py-3 text-gray-900 text-sm font-medium"
            />
          </View>

          <View className="mb-3">
            <Text className="text-xs font-semibold text-gray-500 mb-1 ml-1">
              Password
            </Text>
            <View className="bg-violet-50 border border-violet-100 rounded-xl px-4 py-3 flex-row items-center">
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

          <View className="mb-6">
            <Text className="text-xs font-semibold text-gray-500 mb-1 ml-1">
              Confirm Password
            </Text>
            <View
              className={`bg-violet-50 border rounded-xl px-4 py-3 flex-row items-center ${
                confirmPassword && confirmPassword !== password
                  ? "border-red-300"
                  : "border-violet-100"
              }`}
            >
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

          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-px bg-gray-100" />
            <View className="mx-3 h-1.5 w-1.5 rounded-full bg-gray-300" />
            <View className="flex-1 h-px bg-gray-100" />
          </View>

          <Text className="text-xs font-bold tracking-widest text-violet-500 uppercase mb-3">
            Personal Details
          </Text>

          <View className="flex-row gap-3 mb-3">
            <View className="flex-1">
              <Text className="text-xs font-semibold text-gray-500 mb-1 ml-1">
                First Name
              </Text>
              <TextInput
                placeholder="e.g. Yogesh"
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
                placeholder="e.g. Shinde"
                value={surname}
                onChangeText={setSurname}
                placeholderTextColor="#C4B5FD"
                className="bg-violet-50 border border-violet-100 text-gray-900 px-4 py-3 rounded-xl text-sm font-medium"
              />
            </View>
          </View>

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

          <View className="mb-6">
            <Text className="text-xs font-semibold text-gray-500 mb-1 ml-1">
              Gender
            </Text>
            <Pressable
              onPress={() => setShowGenderOptions((prev) => !prev)}
              className="bg-violet-50 border border-violet-100 rounded-xl px-4 py-3 flex-row items-center justify-between"
            >
              <Text className={`${gender ? "text-gray-900" : "text-violet-300"} text-sm font-medium`}>
                {gender || "Select gender"}
              </Text>
              <Text className="text-violet-500 text-xs font-semibold">
                {showGenderOptions ? "Hide" : "Select"}
              </Text>
            </Pressable>
            {showGenderOptions && (
              <View className="mt-2 rounded-xl border border-violet-100 bg-white overflow-hidden">
                {genderOptions.map((option, index) => (
                  <Pressable
                    key={option}
                    onPress={() => {
                      setGender(option);
                      setShowGenderOptions(false);
                    }}
                    className={`px-4 py-3 ${index !== genderOptions.length - 1 ? "border-b border-violet-100" : ""}`}
                  >
                    <Text className={`text-sm font-medium ${gender === option ? "text-violet-700" : "text-gray-700"}`}>
                      {option}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>

          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-px bg-gray-100" />
            <View className="mx-3 h-1.5 w-1.5 rounded-full bg-gray-300" />
            <View className="flex-1 h-px bg-gray-100" />
          </View>

          <Text className="text-xs font-bold tracking-widest text-violet-500 uppercase mb-3">
            Birth Details
          </Text>

          <View className="mb-3">
            <Text className="text-xs font-semibold text-gray-500 mb-1 ml-1">
              Date of Birth
            </Text>
            <Pressable
              onPress={() => setShowDatePicker(true)}
              className="bg-violet-50 border border-violet-100 rounded-xl px-4 py-3"
            >
              <Text className={`${dateOfBirth ? "text-gray-900" : "text-violet-300"} text-sm font-medium`}>
                {dateOfBirth || "Select date"}
              </Text>
            </Pressable>
            {showDatePicker && (
              <DateTimePicker
                value={dobDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>

          <View className="mb-3">
            <Text className="text-xs font-semibold text-gray-500 mb-1 ml-1">
              Time of Birth
            </Text>
            <Pressable
              onPress={() => setShowTimePicker(true)}
              className="bg-violet-50 border border-violet-100 rounded-xl px-4 py-3"
            >
              <Text className={`${timeOfBirth ? "text-gray-900" : "text-violet-300"} text-sm font-medium`}>
                {timeOfBirth || "Select time"}
              </Text>
            </Pressable>
            {showTimePicker && (
              <DateTimePicker
                value={birthTimeDate}
                mode="time"
                display="default"
                onChange={handleTimeChange}
              />
            )}
          </View>

          <View className="mb-8">
            <Text className="text-xs font-semibold text-gray-500 mb-1 ml-1">
              Place of Birth
            </Text>
            <TextInput
              placeholder="City, Country"
              value={placeOfBirth}
              onChangeText={setPlaceOfBirth}
              placeholderTextColor="#C4B5FD"
              className="bg-violet-50 border border-violet-100 text-gray-900 px-4 py-3 rounded-xl text-sm font-medium"
            />
          </View>

          <Pressable
            className={`py-4 rounded-2xl mb-4 shadow-sm ${
              isFormValid && !loading ? "bg-violet-600 active:bg-violet-700" : "bg-violet-300"
            }`}
            onPress={handleSignup}
            disabled={!isFormValid || loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text className="text-white text-center font-bold text-base tracking-wide">
                Create My Account
              </Text>
            )}
          </Pressable>

          <Pressable onPress={() => router.replace("/login")} className="mb-2">
            <Text className="text-center text-gray-500 text-xs">
              Already have an account?{" "}
              <Text className="text-violet-600 font-semibold underline">Sign In</Text>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
};

export default Signup;
