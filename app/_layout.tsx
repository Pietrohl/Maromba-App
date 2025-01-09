import "@azure/core-asynciterator-polyfill";
import { Suspense, useEffect } from "react";
import { Platform, useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { TamaguiProvider, Theme, Text } from "tamagui";
import "react-native-reanimated";
import tamaguiConfig from "@/tamagui.config";
import { Provider } from "tinybase/ui-react";
import { store, relationships } from "@/utils/persistStore";

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
      <Provider store={store} relationships={relationships}>
        <Suspense fallback={<Text>Loading...</Text>}>
          <Theme name={colorScheme}>
            <ThemeProvider
              value={colorScheme === "light" ? DefaultTheme : DarkTheme}
            >
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
            </ThemeProvider>
          </Theme>
        </Suspense>
      </Provider>
    </TamaguiProvider>
  );
}
