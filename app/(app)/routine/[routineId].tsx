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
  const [edit, setEdit] = useState(true);

  const { data, isFetching, isLoading, refresh } = results;
  const routine = data[0];

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
