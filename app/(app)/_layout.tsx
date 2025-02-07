import "@azure/core-asynciterator-polyfill";
import { Suspense } from "react";
import { Platform } from "react-native";
import { Redirect, router, Stack } from "expo-router";
import { Text } from "tamagui";
import "react-native-reanimated";
import { useSystem } from "@/hooks/useSystem";
import { AuthProvider } from "@/providers/AuthContext";
import AppHeader from "@/components/AppHeaderButtons";
import AppHeaderButtons from "@/components/AppHeaderButtons";
import { ROUTINE } from "@/constants/url";

export default function RootLayout() {
  const { loading, session, initDB } = useSystem();

  initDB();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <AuthProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="routine/[routineId]"
            options={() => ({
              presentation: "modal",
              animation: "fade",
              headerShown: false,
            })}
          />
        </Stack>
      </AuthProvider>
    </Suspense>
  );
}
