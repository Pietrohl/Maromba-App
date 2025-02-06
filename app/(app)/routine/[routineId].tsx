import { useRoutineDetails } from "@/hooks/api/dataQueries";
import { useGlobalSearchParams, useNavigation } from "expo-router";
import { Paragraph } from "tamagui";
import React, { useEffect, useState } from "react";
import ViewRoutine from "@/components/ViewRoutine";
import EditRoutine from "@/components/EditRoutine";
import { SafeAreaModalView } from "@/components/SafeAreaModalView";

export default function Modal() {
  const { routineId: id } = useGlobalSearchParams();
  const navigation = useNavigation();
  const results = useRoutineDetails(id?.toString());
  console.log(JSON.stringify(results));
  const [edit, setEdit] = useState(false);

  const { data, isFetching, isLoading, refresh } = results;
  const routine = data[0];

  // const { exercises } = routine;

  // const { exercise_sets } = exercises[0];

  console.log("Routine: ", routine);

  // const { reps } = exercise_sets[0];

  useEffect(() => {
    if (routine?.name) navigation.setOptions({ title: routine?.name });
    refresh();
  }, [routine?.name]);

  return (
    <SafeAreaModalView>
      {isLoading || isFetching || !routine ? (
        <Paragraph>Loading...</Paragraph>
      ) : edit ? (
        <EditRoutine routine={routine} />
      ) : (
        <ViewRoutine routine={routine} />
      )}
    </SafeAreaModalView>
  );
}
