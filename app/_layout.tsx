import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import "../global.css";
import { useAuth } from "../src/hooks/useAuth";
export default function RootLayout() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inTabsGroup = segments[0] === "(tabs)";

    console.log("Segments:", segments);
    if (!user && inTabsGroup) {
      router.replace("/(auth)/login");
    }

    if (user && inAuthGroup) {
      router.replace("/(tabs)/home");
    }

  }, [user, loading, segments]);




  return <Stack screenOptions={{ headerShown: false }} />;
}
