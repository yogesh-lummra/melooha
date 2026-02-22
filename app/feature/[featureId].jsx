import { ScrollView, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

const FEATURE_DATA = {
  "daily-horoscope": {
    title: "Daily Horoscope",
    iconLabel: "DH",
    description: "See your personalized guidance for today.",
    longDescription:
      "Get an aligned daily reading based on your chart placements, moon phase energy, and current planetary movement to support better decisions.",
    benefits: [
      "Personalized day forecast",
      "Clarity for relationships and work",
      "Actionable guidance for timing",
      "Mood and energy insights",
    ],
  },
  "compatibility-match": {
    title: "Compatibility Match",
    iconLabel: "CM",
    description: "Check relationship harmony with detailed insights.",
    longDescription:
      "Analyze relationship dynamics through astrological compatibility patterns to understand emotional chemistry, communication, and long-term alignment.",
    benefits: [
      "Partnership compatibility score",
      "Strength and challenge areas",
      "Communication style guidance",
      "Long-term potential highlights",
    ],
  },
  "tarot-reading": {
    title: "Tarot Reading",
    iconLabel: "TR",
    description: "Draw your cards and unlock symbolic direction.",
    longDescription:
      "Receive focused tarot insights for your current situation with intuitive interpretation and practical direction for your next steps.",
    benefits: [
      "Single and multi-card spreads",
      "Guidance for present challenges",
      "Emotional and spiritual perspective",
      "Clear next-step suggestions",
    ],
  },
  "birth-chart": {
    title: "Birth Chart",
    iconLabel: "BC",
    description: "Explore your natal placements and planetary positions.",
    longDescription:
      "Understand your core personality blueprint through houses, signs, and planetary placements to unlock deeper self-awareness and life direction.",
    benefits: [
      "Complete natal chart overview",
      "Career and purpose indicators",
      "Relationship and life-pattern insights",
      "Deeper self-understanding",
    ],
  },
};

const FALLBACK_FEATURE = {
  title: "Feature",
  iconLabel: "FT",
  description: "Feature details are not available.",
  longDescription: "The requested feature could not be found.",
  benefits: [
    "Explore available features",
    "Return to Home and try again",
    "Stay tuned for updates",
  ],
};

export default function FeatureDetailScreen() {
  const { featureId } = useLocalSearchParams();
  const key = Array.isArray(featureId) ? featureId[0] : featureId;
  const feature = (key && FEATURE_DATA[key]) || FALLBACK_FEATURE;

  return (
    <View className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <View className="bg-violet-50 border-b border-violet-100 px-6 pt-14 pb-7">
          <View className="h-14 w-14 items-center justify-center rounded-2xl border border-violet-200 bg-violet-100">
            <Text className="text-lg font-bold text-violet-700">{feature.iconLabel}</Text>
          </View>
          <Text className="mt-4 text-3xl font-bold text-violet-950">{feature.title}</Text>
          <Text className="mt-2 text-sm text-violet-700">{feature.description}</Text>
        </View>

        <View className="px-6 pt-6">
          <View className="rounded-2xl border border-violet-100 bg-white p-5 shadow-sm">
            <Text className="text-base font-semibold text-gray-900">Overview</Text>
            <Text className="mt-2 text-sm leading-6 text-gray-600">{feature.longDescription}</Text>
          </View>

          <View className="mt-4 rounded-2xl border border-violet-100 bg-violet-50 p-5">
            <Text className="text-base font-semibold text-violet-900">Benefits</Text>
            <View className="mt-3 gap-2">
              {feature.benefits.map((item) => (
                <View key={item} className="flex-row items-start">
                  <View className="mt-2 mr-2 h-1.5 w-1.5 rounded-full bg-violet-500" />
                  <Text className="flex-1 text-sm leading-6 text-violet-800">{item}</Text>
                </View>
              ))}
            </View>
          </View>

          <View className="mt-4 rounded-2xl border border-violet-100 bg-white p-5 shadow-sm">
            <Text className="text-base font-semibold text-gray-900">How It Works</Text>
            <View className="mt-3 gap-2">
              <Text className="text-sm text-gray-600">1. Select your intent and context.</Text>
              <Text className="text-sm text-gray-600">2. Receive AI-powered personalized insights.</Text>
              <Text className="text-sm text-gray-600">3. Apply guidance to your day with confidence.</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
