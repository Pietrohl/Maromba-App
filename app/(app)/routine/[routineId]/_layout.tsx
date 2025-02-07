import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Stack, useRouter } from "expo-router";
import AppHeaderButtons from "@/components/AppHeaderButtons";
import { ROUTINE } from "@/constants/url";

export default function RoutineLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={({ route }) => ({
        title:
          (route.params &&
            "name" in route.params &&
            (route.params?.name as string)) ||
          "Routine",
        presentation: "modal",
        animation: "fade",
        headerShown: true,
        headerRight: () => (
          <AppHeaderButtons
            sharable
            relativeUrl={ROUTINE}
            handleEdit={() =>
              route.params &&
              "routineId" in route.params &&
              route.params.routineId &&
              router.push({
                pathname: ROUTINE,
                params: {
                  routineId: route.params.routineId as string,
                },
              })
            }
          />
        ),
      })}
    />
  );
}
