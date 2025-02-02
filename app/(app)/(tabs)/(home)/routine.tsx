import { useRoutineDetails } from "@/hooks/dataQueries";
import { Redirect, useGlobalSearchParams, useNavigation } from "expo-router";
import {
  H4,
  Paragraph,
  useWindowDimensions,
  View,
  XStack,
  YStack,
} from "tamagui";
import { SectionList } from "react-native";
import { MySafeAreaView } from "@/components/MySafeAreaView";
import React from "react";

export default function Modal() {
  const { routineId: id } = useGlobalSearchParams();

  if (!id) return <Redirect href="/" />;
  const results = useRoutineDetails(id.toString());
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const { data, isFetching, isLoading } = results;
  console.log("REsults!!! ", JSON.stringify(results));

  const routine = data[0];
  if (routine) navigation.setOptions({ title: routine?.name || "" });

  return (
    <View>
      {isLoading || isFetching || !routine ? (
        <Paragraph>Loading...</Paragraph>
      ) : (
        <YStack alignItems="center" gap="$4">
          <H4>{routine.name}</H4>

          <SectionList
            sections={routine.exercises.map(
              ({ sets_details, ...exercises }) => ({
                data: sets_details,
                ...exercises,
              })
            )}
            keyExtractor={(item) => item.id}
            renderItem={({ item, section }) => (
              <XStack width={width} justifyContent="space-between">
                <YStack
                  flex={1}
                  padding="$2"
                  borderBottomWidth={1}
                  borderColor="$borderColor"
                >
                  <Paragraph>{Number(item.reps)}</Paragraph>
                </YStack>
                <YStack
                  flex={2}
                  padding="$2"
                  paddingEnd="$6"
                  borderBottomWidth={1}
                  borderColor="$borderColor"
                  alignItems="flex-end"
                >
                  <Paragraph>
                    {Number(item.weight_load).toFixed()}
                    {section.load_type === "rm_percent" ? "%RM" : "kg"}
                  </Paragraph>
                </YStack>
              </XStack>
            )}
            renderSectionHeader={({ section }) => (
              <XStack backgroundColor="$backgroundStrong" width={width}>
                <YStack flex={1} padding="$2">
                  <Paragraph fontWeight="bold" fontSize="$5">
                    {section.name}
                  </Paragraph>
                </YStack>
                <YStack
                  flex={2}
                  padding="$2"
                  paddingEnd="$6"
                  alignItems="flex-end"
                >
                  <Paragraph fontWeight="bold" fontSize="$5">
                    Weight
                  </Paragraph>
                </YStack>
              </XStack>
            )}
          />
        </YStack>
      )}
    </View>
  );
}
