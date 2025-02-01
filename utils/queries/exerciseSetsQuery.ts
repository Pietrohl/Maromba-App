import { Expression } from "kysely";
import { db } from "../database";

export function exerciseSetsQuery(database: typeof db,
  exerciseId: Expression<number> | number
) {
  return (
    database.selectFrom('routine_exercise_sets')
      .select(['routine_exercise_sets.exercise_id', 'routine_exercise_sets.id', 'routine_exercise_sets.reps', 'routine_exercise_sets.set_number', 'routine_exercise_sets.weight_load'])
      .where('routine_exercise_sets.exercise_id', '==', exerciseId)
      .orderBy('routine_exercise_sets.set_number asc')
  );
}
