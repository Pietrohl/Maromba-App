import "@azure/core-asynciterator-polyfill";
import { useEffect } from "react";
import { Platform, useColorScheme } from "react-native";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { TamaguiProvider, Theme } from "tamagui";
import "react-native-reanimated";
import tamaguiConfig from "@/tamagui.config";
import { SystemProvider } from "@/providers/system";

if (__DEV__) {
  require("../ReactotronConfig");
}

if (Platform.OS === "web") {
  require("@tamagui/core/reset.css");
}



SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    if (loaded) {
      console.log("fonts Loaded");
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const colorScheme = useColorScheme();

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
      <Theme name="dark">
        <SystemProvider>
          <Slot />
        </SystemProvider>
      </Theme>
    </TamaguiProvider>
  );
}
