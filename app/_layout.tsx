import { Redirect, Stack, useSegments } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import "../global.css";
import { AuthProvider, useAuth } from "../src/hooks/useAuth";

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

function RootNavigator() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const inAuthGroup = segments[0] === "(auth)";
  const atRoot = segments.length === 0 || segments[0] === "index";

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#7c3aed" />
      </View>
    );
  }

  if (!user && !inAuthGroup) {
    return <Redirect href="/login" />;
  }

  if (user && (inAuthGroup || atRoot)) {
    return <Redirect href="/(tabs)/home" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen
        name="screens/edit-profile"
        options={{
          headerShown: true,
          title: "Edit Profile",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="screens/astrology-history"
        options={{
          headerShown: true,
          title: "Astrology History",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="astrology/zodiac"
        options={{
          headerShown: true,
          title: "Zodiac Sign Calculator",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="astrology/lucky"
        options={{
          headerShown: true,
          title: "Lucky Color & Number",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="astrology/compatibility"
        options={{
          headerShown: true,
          title: "Basic Compatibility Checker",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="astrology/kundli-match"
        options={{
          headerShown: true,
          title: "Marriage Compatibility",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="astrology/career"
        options={{
          headerShown: true,
          title: "Career Prediction",
          headerBackTitleVisible: false,
        }}
      />
    </Stack>
  );
}
