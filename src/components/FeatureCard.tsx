import { Pressable, Text, View } from "react-native";

type FeatureCardProps = {
  title: string;
  description: string;
  iconLabel: string;
  onPress?: () => void;
};

export default function FeatureCard({ title, description, iconLabel, onPress }: FeatureCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="mb-3 rounded-2xl border border-violet-100 bg-white p-4 shadow-sm active:bg-violet-50"
    >
      <View className="flex-row items-center">
        <View className="mr-3 h-10 w-10 items-center justify-center rounded-full border border-violet-200 bg-violet-100">
          <Text className="text-xs font-bold text-violet-700">{iconLabel}</Text>
        </View>

        <View className="flex-1">
          <Text className="text-base font-semibold text-gray-900">{title}</Text>
          <Text className="mt-1 text-sm text-gray-500">{description}</Text>
        </View>
        <Text className="ml-2 text-lg text-violet-300">{">"}</Text>
      </View>
    </Pressable>
  );
}
