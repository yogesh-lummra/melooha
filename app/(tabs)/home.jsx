import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import FeatureCard from "../../src/components/FeatureCard";
import LifeAreaCard from "../../src/components/LifeAreaCard";
import PrimaryFeatureCard from "../../src/components/PrimaryFeatureCard";

export default function Home() {
  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >

        {/* ── Header ── */}
        <View className="px-6 pt-14 pb-5 bg-violet-50 border-b border-violet-100">
          <Text className="text-xs font-bold uppercase tracking-widest text-violet-500 mb-2">
            Dashboard
          </Text>
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-2xl font-bold text-gray-900">Welcome to Melooha</Text>
              <Text className="mt-1 text-sm text-violet-600">Your cosmic journey begins here</Text>
            </View>
            <View className="h-11 w-11 rounded-full bg-violet-200 items-center justify-center border-2 border-violet-300">
              <Text className="text-violet-700 font-bold text-base">M</Text>
            </View>
          </View>
        </View>

        {/* ── Today's Planets ── */}
        <View className="px-6 mt-6">
          <Text className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">Today's Planets</Text>
          <View className="flex-row gap-3">
            <View className="flex-1 rounded-2xl bg-violet-50 border border-violet-100 p-3 items-center">
              <Text className="text-xl mb-1">🌙</Text>
              <Text className="text-xs text-violet-400 font-medium">Moon</Text>
              <Text className="text-sm font-bold text-gray-800">Pisces</Text>
            </View>
            <View className="flex-1 rounded-2xl bg-amber-50 border border-amber-100 p-3 items-center">
              <Text className="text-xl mb-1">☀️</Text>
              <Text className="text-xs text-amber-400 font-medium">Sun</Text>
              <Text className="text-sm font-bold text-gray-800">Aquarius</Text>
            </View>
            <View className="flex-1 rounded-2xl bg-rose-50 border border-rose-100 p-3 items-center">
              <Text className="text-xl mb-1">⬆️</Text>
              <Text className="text-xs text-rose-400 font-medium">Rising</Text>
              <Text className="text-sm font-bold text-gray-800">Scorpio</Text>
            </View>
          </View>
        </View>

        {/* ── Primary Feature Card ── */}
        <View className="px-6 mt-6">
          <PrimaryFeatureCard />
        </View>

        {/* ── Feature Cards ── */}
        <View className="px-6 mt-6">
          <Text className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">Features</Text>
          <View className="gap-3">
            <FeatureCard
              iconLabel="DH"
              title="Daily Horoscope"
              description="See your personalized guidance for today."
            />
            <FeatureCard
              iconLabel="CM"
              title="Compatibility Match"
              description="Check relationship harmony with detailed insights."
            />
            <FeatureCard
              iconLabel="TR"
              title="Tarot Reading"
              description="Draw your cards and unlock symbolic direction."
            />
            <FeatureCard
              iconLabel="BC"
              title="Birth Chart"
              description="Explore your natal placements and planetary positions."
            />
          </View>
        </View>

        {/* ── Explore Life Areas ── */}
        <View className="mt-6">
          <View className="px-6 flex-row items-center justify-between mb-3">
            <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Explore Life Areas</Text>
            <TouchableOpacity>
              <Text className="text-xs text-violet-500 font-semibold">See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, gap: 10 }}
          >
            <LifeAreaCard title="Marriage" className="bg-violet-50" />
            <LifeAreaCard title="Career" className="bg-gray-50" />
            <LifeAreaCard title="Finance" className="bg-violet-50" />
            <LifeAreaCard title="Health" className="bg-gray-50" />
            <LifeAreaCard title="Education" className="bg-violet-50" />
            <LifeAreaCard title="Travel" className="bg-blue-50" />
          </ScrollView>
        </View>

      </ScrollView>
    </View>
  );
}