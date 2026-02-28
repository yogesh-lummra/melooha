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
      className="rounded-2xl bg-white px-5 py-5 border border-gray-500"
    >
      {({ pressed }) => (
        <View
          className={`flex-row items-center ${pressed ? "opacity-70" : "opacity-100"}`}
        >
          {/* Icon */}
          <View className="h-12 w-12 items-center justify-center rounded-xl bg-violet-100">
            <Text className="text-xs font-extrabold tracking-wide text-violet-700">
              {iconLabel}
            </Text>
          </View>

          {/* Text content */}
          <View className="ml-4 flex-1">
            <Text className="text-[15px] font-bold text-gray-900">{title}</Text>
            <Text className="mt-1 text-sm leading-5 text-gray-500" numberOfLines={2}>
              {description}
            </Text>
          </View>

          {/* Arrow */}
          <Text className="ml-3 text-lg text-gray-300">›</Text>
        </View>
      )}
    </Pressable>
  );
}