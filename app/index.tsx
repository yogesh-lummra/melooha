import { useRouter } from "expo-router";
import { Pressable, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      
      <View className="absolute top-20 left-10 w-2 h-2 bg-purple-300 rounded-full opacity-60" />
      <View className="absolute top-32 right-16 w-3 h-3 bg-purple-400 rounded-full opacity-40" />
      <View className="absolute top-48 left-16 w-2 h-2 bg-purple-300 rounded-full opacity-50" />
      <View className="absolute bottom-40 right-12 w-2 h-2 bg-purple-400 rounded-full opacity-45" />
      <View className="absolute bottom-60 left-12 w-1 h-1 bg-purple-300 rounded-full opacity-70" />
      <View className="absolute top-64 right-20 w-1 h-1 bg-purple-400 rounded-full opacity-80" />
      
      <View className="flex-1 justify-center items-center px-6">
        
       
        <View className="mb-12">
          <View className="w-28 h-28 rounded-full bg-purple-600 items-center justify-center shadow-lg shadow-purple-300/50">
            <Text className="text-5xl">🌌</Text>
          </View>
          
          <View className="absolute -inset-2 rounded-full bg-purple-200/30 -z-10" />
        </View>

       
        <Text className="text-4xl font-bold text-purple-900 mb-2">
          Melooha
        </Text>
        
        
        <Text className="text-sm text-gray-500 mb-10 w-full text-center">
          Your cosmic journey begins
        </Text>

        
        <Pressable
          onPress={() => router.push("/login")}
          className="w-full max-w-xs"
        >
          {({ pressed }) => (
            <View className={`px-8 py-4 rounded-xl shadow-md ${pressed ? "bg-purple-700 shadow-purple-400/50" : "bg-purple-600 shadow-purple-300/50"}`}>
              <Text className="text-white text-center text-base font-semibold">
                Login
              </Text>
            </View>
          )}
        </Pressable>

      </View>
    </SafeAreaView>
  );
}