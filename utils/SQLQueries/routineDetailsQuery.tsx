import { db } from "@/utils/database";
import { routineExercisesWithSetsDetailsQuery } from "@/utils/SQLQueries/routineExercisesQuery";
import { Expression } from "kysely";
import { jsonArrayFrom } from "kysely/helpers/sqlite";

export const routineDetailsQuery = (
  database: typeof db,
  id: Expression<string | null> | string | string[]
) =>
  database
    .selectFrom("user_training_routines")
    .select([
      "user_training_routines.id",
      "user_training_routines.name",
    ])
    .where("user_training_routines.id", "==", id)
    .select(({ ref }) =>
      jsonArrayFrom(
        routineExercisesWithSetsDetailsQuery(
          database,
          ref("user_training_routines.id")
        )
      ).as("exercises")
    );
