import { Pressable, Text, View } from "react-native";

type PrimaryFeatureCardProps = {
  onPress?: () => void;
};

export default function PrimaryFeatureCard({ onPress }: PrimaryFeatureCardProps) {
  return (
    <View className="mb-5 rounded-2xl bg-violet-400 p-px shadow-md">
      <View className="relative overflow-hidden rounded-2xl border border-violet-200 bg-violet-100 px-5 pt-5 pb-8">
        <View className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-200" />
        <View className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-violet-50" />
        <View className="absolute right-4 top-4 rounded-full bg-white px-3 py-1">
        </View>

        <Text className="mb-2 text-xs font-bold uppercase tracking-widest text-violet-700">
          Featured
        </Text>
        <Text className="mb-1 text-xl font-bold text-violet-950">Generate Your Free AI Kundli</Text>
        <Text className="text-sm text-violet-700">Instant personalized Vedic birth chart</Text>

        <Pressable onPress={onPress} className="mt-4 self-start rounded-xl bg-violet-600 px-5 py-3 shadow-sm active:bg-violet-700">
          <Text className="text-sm font-semibold text-white">Generate Now</Text>
        </Pressable>
      </View>
    </View>
  );
}
