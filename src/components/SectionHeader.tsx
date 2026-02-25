import { Text, View } from "react-native";

type SectionHeaderProps = {
  title: string;
  subtitle: string;
};

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <View className="mb-4">
      <Text className="text-xl font-bold text-gray-900">{title}</Text>
      <Text className="mt-1 text-sm text-gray-400">{subtitle}</Text>
    </View>
  );
}
