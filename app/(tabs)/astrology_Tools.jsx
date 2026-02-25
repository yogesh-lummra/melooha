import { useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import AstroToolCard from "../../src/components/AstroToolCard";
import SectionHeader from "../../src/components/SectionHeader";

const personalInsightsTools = [
  {
    icon: "\u2648",
    title: "Zodiac Sign Calculator",
    description: "Find your zodiac profile and discover your core cosmic traits.",
    buttonText: "Open Tool",
    route: "/astrology/zodiac",
    bgColor: "violet",
  },
  {
    icon: "\u{1F3A8}",
    title: "Lucky Color & Number",
    description: "Reveal your lucky shades and numbers for daily alignment.",
    buttonText: "Open Tool",
    route: "/astrology/lucky",
    bgColor: "gray",
  },
  {
    icon: "\u{1F4BC}",
    title: "Career Prediction",
    description: "Explore star-guided insights around your professional path.",
    buttonText: "Open Tool",
    route: "/astrology/career",
    bgColor: "violet",
  },
];

const compatibilityTools = [
  {
    icon: "\u{1F4AB}",
    title: "Basic Compatibility Checker",
    description: "Check your energetic compatibility with someone special.",
    buttonText: "Open Tool",
    route: "/astrology/compatibility",
    bgColor: "gray",
  },
  {
    icon: "\u{1F48D}",
    title: "Marriage Compatibility (Kundli Match)",
    description: "View classic kundli matching factors for relationship harmony.",
    buttonText: "Open Tool",
    route: "/astrology/kundli-match",
    bgColor: "violet",
  },
];

export default function AstrologyToolsScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-gray-50 px-5 pt-16">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">

        {/* Page Header */}
        <View className="mb-6">
          <View className="mb-2 self-start rounded-full bg-violet-100 px-3 py-1">
            <Text className="text-xs font-semibold tracking-widest text-violet-500 uppercase">
              ✦ Cosmic Dashboard
            </Text>
          </View>
          <Text className="text-3xl font-bold text-gray-900">Astrology Tools</Text>
          <Text className="mt-1 text-sm text-gray-400">Discover your cosmic insights</Text>
        </View>

        {/* Personal Insights */}
        <View className="mt-2">
          <SectionHeader
            title="Personal Insights"
            subtitle="Discover what the stars reveal about you."
          />
          {personalInsightsTools.map((tool) => (
            <AstroToolCard
              key={tool.route}
              icon={tool.icon}
              title={tool.title}
              description={tool.description}
              buttonText={tool.buttonText}
              bgColor={tool.bgColor}
              onPress={() => router.push(tool.route)}
            />
          ))}
        </View>

        {/* Compatibility */}
        <View className="mt-4 pb-8">
          <SectionHeader
            title="Compatibility & Relationships"
            subtitle="Explore your connection with others."
          />
          {compatibilityTools.map((tool) => (
            <AstroToolCard
              key={tool.route}
              icon={tool.icon}
              title={tool.title}
              description={tool.description}
              buttonText={tool.buttonText}
              bgColor={tool.bgColor}
              onPress={() => router.push(tool.route)}
            />
          ))}
        </View>

      </ScrollView>
    </View>
  );
}