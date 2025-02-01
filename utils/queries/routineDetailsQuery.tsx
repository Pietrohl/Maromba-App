import { db } from "@/utils/database";
import { routineExercisesQuery } from "@/utils/queries/routineExercisesQuery";
import { Expression } from "kysely";
import { jsonArrayFrom } from "kysely/helpers/sqlite";

export const routineDetailsQuery = (
  database: typeof db,
  id: Expression<string | null> | string | string[]
) => database
  .selectFrom("user_training_routines")
  .select([
    "user_training_routines.id",
    "user_training_routines.name",
    "user_training_routines.user_id",
  ])
  .where("user_training_routines.id", "=", id)
  .select(({ ref }) => jsonArrayFrom(
    routineExercisesQuery(database, ref("user_training_routines.id"), true)
  ).as("exercises")
  );
