import { MySafeAreaView } from "@/components/MySafeAreaView";
import { useRoutineDetails } from "@/hooks/dataQueries";
import { Database } from "@/utils/appSchema";
import { useGlobalSearchParams, useNavigation, Redirect } from "expo-router";
import React, { useEffect, useState } from "react";
import { SectionList } from "react-native";
import {
  useWindowDimensions,
  Paragraph,
  YStack,
  H3,
  H4,
  XStack,
  Separator,
} from "tamagui";

export default function ViewRoutine({
  routine,
}: {
  routine: {
    name: string | null;
    exercises: Array<
      Partial<Database["exercises"]> &
        Partial<Database["routine_exercises"]> & {
          sets_details: Database["routine_exercise_sets"][];
        }
    >;
  };
}): JSX.Element {
  // const [routine] = useState(routineParam)
  const { width } = useWindowDimensions();

  return (
    <YStack alignItems="center" gap="$2" padding="$2">
      <H3>{routine.name}</H3>

      <SectionList
        sections={routine.exercises.map(({ sets_details, ...exercises }) => ({
          data: sets_details,
          ...exercises,
        }))}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section }) => (
          <YStack paddingTop="$6" gap="$2">
            <YStack flex={1}>
              <H4>{section.name}</H4>
            </YStack>
            <XStack
              backgroundColor="$backgroundStrong"
              width={width}
              justifyContent="space-between"
            >
              <YStack flex={1} padding="$2" alignItems="center">
                <Paragraph fontWeight="300" fontSize="$5">
                  Set
                </Paragraph>
              </YStack>
              <YStack flex={1} padding="$2" alignItems="center">
                <Paragraph fontWeight="300" fontSize="$5">
                  Reps
                </Paragraph>
              </YStack>
              <YStack flex={3} padding="$2" alignItems="center">
                <Paragraph fontWeight="300" fontSize="$5">
                  Intensity
                </Paragraph>
              </YStack>
              <YStack
                flex={3}
                padding="$2"
                paddingEnd="$6"
                alignItems="center"
                textWrap="stable"
              >
                <Paragraph fontWeight="300" fontSize="$5">
                  Target Weight
                </Paragraph>
              </YStack>
            </XStack>
            <Separator />
          </YStack>
        )}
        renderItem={({ item, section }) => (
          <YStack>
            <XStack width={width} justifyContent="space-between">
              <YStack flex={1} padding="$2" alignItems="center">
                <Paragraph>{Number(item.set_number).toFixed()} </Paragraph>
              </YStack>
              <YStack flex={1} padding="$2" alignItems="center">
                <Paragraph>{Number(item.reps)}</Paragraph>
              </YStack>
              <YStack flex={3} padding="$2" alignItems="center">
                <Paragraph>
                  {section.load_type === "rm_percent"
                    ? Number(item.weight_load).toFixed() + "% 1RM"
                    : "-"}
                </Paragraph>
              </YStack>
              <YStack
                flex={3}
                padding="$2"
                paddingEnd="$6"
                alignItems="center"
                textWrap="stable"
              >
                <Paragraph>
                  {Number(item.weight_load).toFixed()}
                  {section.load_type === "rm_percent" ? "%RM" : "kg"}
                </Paragraph>
              </YStack>
            </XStack>
          </YStack>
        )}
      />
    </YStack>
  );
}
