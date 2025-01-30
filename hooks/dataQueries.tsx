import { useQuery } from "@/hooks/useQuery";
import { useSystem } from "@/hooks/useSystem";
import { detailedTrainingPlansQuery } from "@/utils/queries/detailedTrainingPlansQuery";
import { getTrainningPlans } from "@/utils/queries/getTrainningPlansQuery";
import { routinesQuery } from "@/utils/queries/routinesQuery";
import { useMemo } from "react";

export const useTrainningPlan = (id: string | string[]) => {
  const { database } = useSystem();

  const activeTrainingPlanQuery = useMemo(
    () => detailedTrainingPlansQuery(database, id),
    [id]
  );

  const { data } = useQuery(activeTrainingPlanQuery);
  return data[0];
};
export const getAllTrainningPlans = (exclude: string[] | string = "") => {
  const { database } = useSystem();

  const plansQuery = useMemo(
    () => getTrainningPlans(database, exclude),
    [exclude]
  );

  const { data: plans } = useQuery(plansQuery);

  return plans;
};
export const useRoutinesFromPlan = (planId: string | string[]) => {
  const { database } = useSystem();

  const query = useMemo(() => {
    return routinesQuery(database, planId);
  }, [planId]);

  return useQuery(query).data;
};
