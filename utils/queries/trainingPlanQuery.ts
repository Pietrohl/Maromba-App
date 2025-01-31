import { db } from "@/utils/database";
import { routineExercisesQuery } from "@/utils/queries/routineExercisesQuery";
import { jsonArrayFrom } from "kysely/helpers/sqlite";



export const standaloneRoutineQuery = (
    database: typeof db,
) => database
    .selectFrom('user_training_routines')
    .select(['user_training_routines.id', "user_training_routines.name"])
    .leftJoin('training_plan_routines', 'user_training_routines.id', 'training_plan_routines.routine_id')
    // .select("training_plan_routines.id as training_plan_id")
    .where('training_plan_routines.id', 'is', null)
    .select(({ ref }) => jsonArrayFrom(routineExercisesQuery(database, ref("user_training_routines.id"))).as(
        "exercises"
    )
    )




