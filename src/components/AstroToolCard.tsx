import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type AstroToolCardProps = {
  icon: string;
  title: string;
  description: string;
  onPress: () => void;
  variant: "primary" | "secondary";
};

export default function AstroToolCard({
  icon,
  title,
  description,
  onPress,
  variant,
}: AstroToolCardProps) {
  const isPrimary = variant === "primary";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.96 : 1,
        transform: [{ scale: pressed ? 0.99 : 1 }],
      })}
      className="mb-4 w-full"
    >
      <View
        className={`flex-row items-center rounded-2xl p-5 ${isPrimary ? "bg-violet-50" : "bg-gray-50"
          }`}
        style={{
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 4 },
          elevation: 2,
          borderWidth: 1,
          borderColor: isPrimary ? "#ede9fe" : "#f3f4f6",
        }}
      >
        {/* Icon */}
        <View
          className={`h-14 w-14 items-center justify-center  rounded-2xl ${isPrimary ? "bg-violet-600" : "bg-white"
            }`}
          style={
            !isPrimary
              ? { borderWidth: 1, borderColor: "#e5e7eb" }
              : undefined
          }
        >
          <Text
            className={`text-2xl ${isPrimary ? "text-white" : "text-violet-600"
              }`}
          >
            {icon}
          </Text>
        </View>

        {/* Text Section */}
        <View className="ml-4 flex-1">
          <Text className="text-base font-semibold text-gray-900">
            {title}
          </Text>
          <Text className="mt-1 text-sm leading-5 text-gray-500">
            {description}
          </Text>
        </View>

        {/* Arrow Only */}
        <Ionicons
          name="chevron-forward"
          size={22}
          color={isPrimary ? "#7c3aed" : "#9ca3af"}
        />
      </View>
    </Pressable>
  );
}