import { Expression } from "kysely";
import { db } from "../database";

export function exerciseSetsQuery(database: typeof db,
  exerciseId: Expression<string | null> | string
) {
  return (
    database.selectFrom('routine_exercise_sets')
      .select(['routine_exercise_sets.exercise_id', 'routine_exercise_sets.id', 'routine_exercise_sets.reps', 'routine_exercise_sets.set_number', 'routine_exercise_sets.weight_load', 'routine_exercise_sets.routine_id'])
      .where('routine_exercise_sets.exercise_id', '==', exerciseId)
      .orderBy('routine_exercise_sets.set_number asc')
  );
}
