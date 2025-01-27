import "@azure/core-asynciterator-polyfill";
import { Suspense } from "react";
import { Platform } from "react-native";
import { Redirect, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Text } from "tamagui";
import "react-native-reanimated";
import { useAuth } from "@/hooks/useAuth";
import { TinyBaseProvider } from "@/providers/TinyBase";

if (Platform.OS === "web") {
  require("@tamagui/core/reset.css");
}

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { loading, session } = useAuth();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <TinyBaseProvider>
      <Suspense fallback={<Text>Loading...</Text>}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </Suspense>
    </TinyBaseProvider>
  );
}
