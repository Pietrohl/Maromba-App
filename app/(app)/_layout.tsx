import "@azure/core-asynciterator-polyfill";
import { Suspense } from "react";
import { Platform } from "react-native";
import { Redirect, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Text } from "tamagui";
import "react-native-reanimated";
import { useSystem } from "@/hooks/useSystem";
import { AuthProvider } from "@/providers/AuthContext";

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
            options={({ route }) => ({
              title:
                (route.params &&
                  "name" in route.params &&
                  (route.params?.name as string)) ||
                "Routine",
              presentation: "modal",
              animation: "fade",
              headerShown: true,
            })}
          />
        </Stack>
      </AuthProvider>
    </Suspense>
  );
}
