import { Database } from "@/utils/appSchema";

type EditType<T> = Omit<T, "created_at" | "updated_at">;

type Routine = EditType<Database["user_training_routines"]> & {
  exercises: Array<EditType<Database["routine_exercises"]>>;
};

const editRoutine = (routine: Routine) => {};
