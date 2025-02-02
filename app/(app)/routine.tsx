import { useRoutineDetails } from "@/hooks/dataQueries";
import { Redirect, useGlobalSearchParams, useNavigation } from "expo-router";
import {
  H3,
  H4,
  Paragraph,
  Separator,
  useWindowDimensions,
  View,
  XStack,
  YStack,
} from "tamagui";
import { SectionList } from "react-native";
import { MySafeAreaView } from "@/components/MySafeAreaView";
import React, { useEffect } from "react";

export default function Modal() {
  const { routineId: id } = useGlobalSearchParams();
  const navigation = useNavigation();
  const results = useRoutineDetails(id?.toString());
  const { width } = useWindowDimensions();

  if (!id) return <Redirect href="/" />;

  const { data, isFetching, isLoading } = results;

  const routine = data[0];

  useEffect(() => {
    if (routine?.name) navigation.setOptions({ title: routine?.name });
  }, [routine?.name]);

  return (
    <MySafeAreaView>
      {isLoading || isFetching || !routine ? (
        <Paragraph>Loading...</Paragraph>
      ) : (
        <YStack alignItems="center" gap="$2" padding="$2">
          <H3>{routine.name}</H3>

          <SectionList
            sections={routine.exercises.map(
              ({ sets_details, ...exercises }) => ({
                data: sets_details,
                ...exercises,
              })
            )}
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
      )}
    </MySafeAreaView>
  );
}
