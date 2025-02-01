import { db } from "@/utils/database";
import { Expression } from "kysely";
import { jsonArrayFrom } from "kysely/helpers/sqlite";

export function routineExercisesQuery(
  database: typeof db,
  routineId: Expression<string | null> | string
) {
  return (
    database
      .selectFrom("routine_exercises")
      .select([
        "routine_exercises.id",
        "routine_exercises.exercise_id",
        "routine_exercises.exercise_order",
        "routine_exercises.load_type",
        "routine_exercises.instruction_text",
        "routine_exercises.exercise_order",
        "routine_exercises.rest_interval"
      ])
      // .selectAll()
      .innerJoin("exercises", "routine_exercises.exercise_id", "exercises.id")
      .select(["exercises.name", "exercises.identifier"])
      .leftJoin(
        "routine_exercise_sets",
        "routine_exercises.id",
        "routine_exercise_sets.exercise_id"
      )
      .select((b) => b.fn.count("routine_exercise_sets.id").as("sets"))
      .where("routine_exercises.routine_id", "=", routineId)
      .groupBy([
        "routine_exercises.exercise_id",
        "exercise_order",
        "load_type",
        "instruction_text",
        "name",
        "identifier",
      ])
      .orderBy("routine_exercises.exercise_order")
  );
  // );
}
