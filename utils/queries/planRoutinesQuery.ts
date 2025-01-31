import { db } from "@/utils/database";
import { Expression } from "kysely";
import { routineExercisesQuery } from "@/utils/queries/routineExercisesQuery";
import { jsonArrayFrom } from "kysely/helpers/sqlite";

export const planRoutinesQuery = (
  database: typeof db,
  planId: Expression<string | null> | string | string[] = ""
) => database
  .selectFrom("training_plan_routines")
  .where("training_plan_id", "=", planId)
  .select([
    "training_plan_routines.id",
    "training_plan_id",
    "routine_id",
    "day",
    "routine_order",
  ])
  // .selectAll()
  .leftJoin(
    "user_training_routines",
    "training_plan_routines.routine_id",
    "user_training_routines.id"
  )
  .select("user_training_routines.name")
  .select("user_training_routines.id")
  .select(({ ref }) => jsonArrayFrom(routineExercisesQuery(database, ref("user_training_routines.id"))).as(
    "exercises"
  )
  )
  .orderBy("training_plan_routines.day asc")
  .groupBy("training_plan_routines.routine_id");
