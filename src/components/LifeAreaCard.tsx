import { Pressable, Text } from "react-native";

type LifeAreaCardProps = {
  title: string;
  className?: string;
  onPress?: () => void;
};

export default function LifeAreaCard({ title, className = "", onPress }: LifeAreaCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`mr-3 w-24 rounded-xl border border-violet-100 px-4 py-3 shadow-sm active:opacity-80 ${className}`}
    >
      <Text className="text-sm font-medium text-gray-700">{title}</Text>
    </Pressable>
  );
}
