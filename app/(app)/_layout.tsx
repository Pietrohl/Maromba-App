import "@azure/core-asynciterator-polyfill";
import { Suspense } from "react";
import { Platform } from "react-native";
import { Redirect, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Text } from "tamagui";
import "react-native-reanimated";
import { useSystem } from "@/hooks/useSystem";

if (Platform.OS === "web") {
  require("@tamagui/core/reset.css");
}

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { loading, session, initDB } = useSystem();

  initDB()

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  return (
      <Suspense fallback={<Text>Loading...</Text>}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </Suspense>
  );
}
