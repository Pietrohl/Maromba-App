import "@azure/core-asynciterator-polyfill";
import { useEffect } from "react";
import { Platform, useColorScheme } from "react-native";
import { useFonts } from "expo-font";
import { Link, Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { TamaguiProvider, Theme } from "tamagui";
import "react-native-reanimated";
import tamaguiConfig from "@/tamagui.config";
import { SystemProvider } from "@/providers/System";
import { AuthProvider } from "@/providers/AuthContext";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";

if (__DEV__) {
  require("../ReactotronConfig");
}

if (Platform.OS === "web") {
  require("@tamagui/core/reset.css");
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  const colorScheme = useColorScheme();

  if (Platform.OS === "web") {
    // Use a basic custom layout on web.
    return (
      <div style={{ flex: 1 }}>
        <header>
          <Link href="/">Home</Link>
        </header>
        <Slot />
      </div>
    );
  }
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
        <SystemProvider>
          <Slot />
        </SystemProvider>
      </TamaguiProvider>
    </SafeAreaProvider>
  );
}
