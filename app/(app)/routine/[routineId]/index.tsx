import { useRoutineDetails } from "@/hooks/api/dataQueries";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { Paragraph } from "tamagui";
import React from "react";
import ViewRoutine from "@/components/ViewRoutine";
import { SafeAreaModalView } from "@/components/SafeAreaModalView";

export default function Modal() {
  const { routineId } = useGlobalSearchParams();
  const results = useRoutineDetails(routineId?.toString());

  const { data, isFetching, isLoading, refresh } = results;
  const routine = data[0];

  return (
    <SafeAreaModalView>
      {isLoading || !routine ? (
        <Paragraph>Loading...</Paragraph>
      ) : (
        <ViewRoutine
          routine={routine}
          refresh={refresh}
          refreshing={isFetching}
        />
      )}
    </SafeAreaModalView>
  );
}
