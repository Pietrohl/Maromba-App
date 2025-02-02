import { useQuery } from "@/hooks/useQuery";
import { useSystem } from "@/hooks/useSystem";
import { detailedTrainingPlansQuery } from "@/utils/queries/detailedTrainingPlansQuery";
import { getTrainningPlans } from "@/utils/queries/getTrainningPlansQuery";
import { planRoutinesQuery } from "@/utils/queries/planRoutinesQuery";
import { standaloneRoutineQuery } from "@/utils/queries/trainingPlanQuery";
import { useMemo } from "react";
import { routineDetailsQuery } from "../utils/queries/routineDetailsQuery";
import { routineExercisesWithSetsDetailsQuery } from "@/utils/queries/routineExercisesQuery";

export const useTrainningPlan = (id: string | string[]) => {
  const { database } = useSystem();

  const activeTrainingPlanQuery = useMemo(
    () => detailedTrainingPlansQuery(database, id),
    [id]
  );

  const { data, ...results } = useQuery(activeTrainingPlanQuery);
  return { data: data[0], ...results };
};
export const getAllTrainningPlans = (exclude: string[] | string = "") => {
  const { database } = useSystem();

  const plansQuery = useMemo(
    () => getTrainningPlans(database, exclude),
    [exclude]
  );

  return useQuery(plansQuery);
};
export const useRoutinesFromPlan = (planId: string | string[]) => {
  const { database } = useSystem();

  const query = useMemo(() => {
    return planRoutinesQuery(database, planId);
  }, [planId]);

  return useQuery(query);
};
export function useStandaloneRoutines() {
  const { database } = useSystem();

  const query = useMemo(() => {
    return standaloneRoutineQuery(database);
  }, []);

  return useQuery(query);
}

export function useRoutineExercisesWithSetDetails(routineId: string) {
  const { database } = useSystem();

  const query = useMemo(
    () => routineExercisesWithSetsDetailsQuery(database, routineId),
    [routineId]
  );

  return useQuery(query);
}

export function useRoutineDetails(routineId: string) {
  const { database } = useSystem();

  const query = useMemo(
    () => routineDetailsQuery(database, routineId),
    [routineId]
  );

  if (!routineId)
    return { data: [], isFetching: false, isLoading: false, refresh: () => {} };

  return useQuery(query);
}
