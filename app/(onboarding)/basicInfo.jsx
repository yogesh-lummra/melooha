import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

const BasicInfo = () => {
  const router = useRouter();

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Header */}
      <View className="bg-violet-600 px-6 pt-6 pb-6 rounded-b-3xl mb-8">
        <Text className="text-white text-4xl font-bold leading-tight mb-2">
        Profile Setup
        </Text>
        <Text className="text-violet-200 text-sm">
          Fill in your details to generate your birth chart
        </Text>
      </View>

      <View className="px-6">

        {/* Section: Personal */}
        <View className="mb-6">
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
              keyboardType="numeric"
              placeholderTextColor="#C4B5FD"
              className="bg-violet-50 border border-violet-100 text-gray-900 px-4 py-3 rounded-xl text-sm font-medium"
            />
          </View>

          {/* Gender */}
          <View>
            <Text className="text-xs font-semibold text-gray-500 mb-1 ml-1">
              Gender
            </Text>
            <TextInput
              placeholder="e.g. Female, Male, Non-binary"
              placeholderTextColor="#C4B5FD"
              className="bg-violet-50 border border-violet-100 text-gray-900 px-4 py-3 rounded-xl text-sm font-medium"
            />
          </View>
        </View>

        {/* Divider */}
        <View className="flex-row items-center mb-6">
          <View className="flex-1 h-px bg-gray-100" />
          <Text className="mx-3 text-gray-400 text-xs font-medium">✦</Text>
          <View className="flex-1 h-px bg-gray-100" />
        </View>

        {/* Section: Birth Details */}
        <View className="mb-8">
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
                placeholderTextColor="#C4B5FD"
                className="flex-1 text-gray-900 text-sm font-medium"
              />
            </View>
          </View>

          {/* Place of Birth */}
          <View>
            <Text className="text-xs font-semibold text-gray-500 mb-1 ml-1">
              Place of Birth
            </Text>
            <View className="bg-violet-50 border border-violet-100 rounded-xl px-4 py-3 flex-row items-center">
              <Text className="text-violet-400 mr-3 text-base">📍</Text>
              <TextInput
                placeholder="City, Country"
                placeholderTextColor="#C4B5FD"
                className="flex-1 text-gray-900 text-sm font-medium"
              />
            </View>
          </View>
        </View>

        {/* Info Card */}
        <View className="bg-violet-50 border border-violet-100 rounded-2xl p-4 mb-8 flex-row items-start">
          <Text className="text-violet-500 text-lg mr-3 mt-0.5">✦</Text>
          <Text className="flex-1 text-violet-700 text-xs leading-5 font-medium">
            Your birth time and place are used to calculate accurate planetary
            positions. This data stays private and secure.
          </Text>
        </View>

        {/* CTA Button */}
        <Pressable
          className="bg-violet-600 active:bg-violet-700 py-4 rounded-2xl mb-4 shadow-sm"
          onPress={() => router.replace("/(tabs)/home")}
        >
          <Text className="text-white text-center font-bold text-base tracking-wide">
            ✦  Generate My Chart
          </Text>
        </Pressable>

        <Text className="text-center text-gray-400 text-xs mb-2">
          Your details are encrypted and never shared
        </Text>

      </View>
    </ScrollView>
  );
};

export default BasicInfo;