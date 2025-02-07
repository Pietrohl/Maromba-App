import { useRoutineDetails } from "@/hooks/api/dataQueries";
import { useGlobalSearchParams } from "expo-router";
import { Paragraph } from "tamagui";
import React from "react";
import EditRoutine from "@/components/EditRoutine";
import { SafeAreaModalView } from "@/components/SafeAreaModalView";

export default function Modal() {
  const { routineId } = useGlobalSearchParams();
  const results = useRoutineDetails(routineId?.toString());

  const { data, isLoading } = results;
  const routine = data[0];

  return (
    <SafeAreaModalView>
      {isLoading || !routine ? (
        <Paragraph>Loading...</Paragraph>
      ) : (
        <EditRoutine routine={routine} />
      )}
    </SafeAreaModalView>
  );
}
