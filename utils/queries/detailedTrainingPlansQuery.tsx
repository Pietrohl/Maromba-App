import { db } from "@/utils/database";
import { routinesQuery } from "@/utils/queries/routinesQuery";
import { Expression } from "kysely";
import { jsonArrayFrom } from "kysely/helpers/sqlite";


export function detailedTrainingPlansQuery(database: typeof db, id: Expression<string | null> | string | string[]) {
  return database
    .selectFrom("training_plan")
    .where("id", "=", id)
    .select([
      "id",
      "name",
      "description",
      "created_at",
      "updated_at",
      "is_template",
      "creator_id",
      "user_id",
      "total_days",
      "is_flexible",
    ])
    .select(({ ref }) => jsonArrayFrom(routinesQuery(database, ref("training_plan.id"))).as(
      "routines"
    )
    );
}
