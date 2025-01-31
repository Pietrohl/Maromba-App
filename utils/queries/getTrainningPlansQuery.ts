import { db } from "@/utils/database";

export const getTrainningPlans = (database: typeof db, exclude: string | string[]) => database
  .selectFrom("training_plan")
  .select(["training_plan.name", "training_plan.id"])
  .where("training_plan.id", "!=", exclude?.length > 0 ? exclude : "")
  .leftJoin(
    "training_plan_routines",
    "training_plan.id",
    "training_plan_routines.training_plan_id"
  )
  .select([
    (b) => b.fn.count("training_plan_routines.id").as("totalRoutines"),
    (b) => b.fn
      .count("training_plan_routines.routine_id")
      .distinct()
      .as("uniqueRoutines"),
  ])
  .groupBy("training_plan.id");
