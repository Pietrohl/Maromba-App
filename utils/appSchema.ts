import { column, Schema, Table } from "@powersync/react-native";
import { relations } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { DrizzleAppSchema } from "@powersync/drizzle-driver";

const exercise_types = new Table(
  {
    // id column (text) is automatically included
    name: column.text,
  },
  { indexes: {} }
);

const exercise_types_table = sqliteTable("exercise_types", {
  id: text("id"),
  name: text("name"),
});

const muscle_groups = new Table(
  {
    // id column (text) is automatically included
    name: column.text,
  },
  { indexes: {} }
);

const muscle_groups_table = sqliteTable("muscle_groups", {
  id: text("id"),
  name: text("name"),
});

const equipament = new Table(
  {
    // id column (text) is automatically included
    name: column.text,
  },
  { indexes: {} }
);

const equipament_table = sqliteTable("equipament", {
  id: text("id"),
  name: text("name"),
});

const exercises = new Table(
  {
    // id column (text) is automatically included
    user_id: column.text,
    name: column.text,
    type: column.integer,
    equipament: column.integer,
    primary_muscle_group: column.integer,
    other_muscles: column.text,
    instructions: column.text,
    instruction_url: column.text,
    created_at: column.text,
    updated_at: column.text,
    identifier: column.text,
  },
  { indexes: {} }
);

const exercises_table = sqliteTable("exercises", {
  id: text("id"),
  user_id: text("user_id"),
  name: text("name"),
  type: integer("type"),
  equipament: integer("equipament"),
  primary_muscle_group: integer("primary_muscle_group"),
  other_muscles: text("other_muscles"),
  instructions: text("instructions"),
  instruction_url: text("instruction_url"),
  created_at: text("created_at"),
  updated_at: text("updated_at"),
  identifier: text("identifier"),
});

const user_training_routines = new Table(
  {
    // id column (text) is automatically included
    user_id: column.text,
    name: column.text,
    created_at: column.text,
    updated_at: column.text,
  },
  { indexes: {} }
);

const user_training_routines_table = sqliteTable("user_training_routines", {
  id: text("id"),
  user_id: text("user_id"),
  name: text("name"),
  created_at: text("created_at"),
  updated_at: text("updated_at"),
});

const training_sessions = new Table(
  {
    // id column (text) is automatically included
    user_id: column.text,
    routine_id: column.text,
    elapsed_time: column.integer,
    created_at: column.text,
    updated_at: column.text,
  },
  { indexes: {} }
);

const training_sessions_table = sqliteTable("training_sessions", {
  id: text("id"),
  user_id: text("user_id"),
  routine_id: text("routine_id"),
  elapsed_time: integer("elapsed_time"),
  created_at: text("created_at"),
  updated_at: text("updated_at"),
});

const users = new Table(
  {
    // id column (text) is automatically included
    username: column.text,
    name: column.text,
    weight: column.text,
    unit_weight: column.text,
    unit_distance: column.text,
    theme: column.text,
    created_at: column.text,
    updated_at: column.text,
    active_plan_id: column.text,
  },
  { indexes: {} }
);

const users_table = sqliteTable("users", {
  id: text("id"),
  username: text("username"),
  name: text("name"),
  weight: text("weight"),
  unit_weight: text("unit_weight"),
  unit_distance: text("unit_distance"),
  theme: text("theme"),
  created_at: text("created_at"),
  updated_at: text("updated_at"),
  active_plan_id: text("active_plan_id"),
});

const training_plan = new Table(
  {
    // id column (text) is automatically included
    name: column.text,
    description: column.text,
    is_template: column.integer,
    creator_id: column.text,
    user_id: column.text,
    total_days: column.integer,
    is_flexible: column.integer,
    created_at: column.text,
    updated_at: column.text,
  },
  { indexes: {} }
);

const training_plan_table = sqliteTable("training_plan", {
  id: text("id"),
  name: text("name"),
  description: text("description"),
  is_template: integer("is_template"),
  creator_id: text("creator_id"),
  user_id: text("user_id"),
  total_days: integer("total_days"),
  is_flexible: integer("is_flexible"),
  created_at: text("created_at"),
  updated_at: text("updated_at"),
});

const routine_exercises = new Table(
  {
    // id column (text) is automatically included
    routine_id: column.text,
    exercise_id: column.text,
    load_type: column.text,
    exercise_order: column.integer,
    instruction_text: column.text,
    created_at: column.text,
    updated_at: column.text,
  },
  { indexes: {} }
);

const routine_exercises_table = sqliteTable("routine_exercises", {
  id: text("id"),
  routine_id: text("routine_id"),
  exercise_id: text("exercise_id"),
  load_type: text("load_type"),
  exercise_order: integer("exercise_order"),
  instruction_text: text("instruction_text"),
  created_at: text("created_at"),
  updated_at: text("updated_at"),
});

const routine_exercise_sets = new Table(
  {
    // id column (text) is automatically included
    exercise_id: column.integer,
    set_number: column.integer,
    weight_load: column.text,
    reps: column.text,
  },
  { indexes: {} }
);

const routine_exercise_sets_table = sqliteTable("routine_exercise_sets", {
  id: text("id"),
  exercise_id: integer("exercise_id"),
  set_number: integer("set_number"),
  weight_load: text("weight_load"),
  reps: text("reps"),
});

const performed_exercises = new Table(
  {
    // id column (text) is automatically included
    session_id: column.text,
    exercise_id: column.text,
    notes: column.text,
    rir_or_rpe: column.text,
    created_at: column.text,
    updated_at: column.text,
  },
  { indexes: {} }
);

const performed_exercises_table = sqliteTable("performed_exercises", {
  id: text("id"),
  session_id: text("session_id"),
  exercise_id: text("exercise_id"),
  notes: text("notes"),
  rir_or_rpe: text("rir_or_rpe"),
  created_at: text("created_at"),
  updated_at: text("updated_at"),
});

const performed_exercise_sets = new Table(
  {
    // id column (text) is automatically included
    exercise_id: column.text,
    set_number: column.integer,
    reps: column.text,
    weight: column.text,
    rir_or_rpe: column.text,
    created_at: column.text,
    updated_at: column.text,
    session_id: column.text,
  },
  { indexes: {} }
);

const performed_exercise_sets_table = sqliteTable("performed_exercise_sets", {
  id: text("id"),
  exercise_id: text("exercise_id"),
  set_number: integer("set_number"),
  reps: text("reps"),
  weight: text("weight"),
  rir_or_rpe: text("rir_or_rpe"),
  created_at: text("created_at"),
  updated_at: text("updated_at"),
  session_id: text("session_id"),
});

const training_plan_routines = new Table(
  {
    // id column (text) is automatically included
    training_plan_id: column.text,
    routine_id: column.text,
    day: column.integer,
    routine_order: column.integer,
  },
  { indexes: {} }
);

const training_plan_routines_table = sqliteTable("training_plan_routines", {
  id: text("id"),
  training_plan_id: text("training_plan_id"),
  routine_id: text("routine_id"),
  day: integer("day"),
  routine_order: integer("routine_order"),
});

export const AppSchema = new Schema({
  exercise_types,
  muscle_groups,
  equipament,
  exercises,
  user_training_routines,
  training_sessions,
  users,
  training_plan,
  routine_exercises,
  routine_exercise_sets,
  performed_exercises,
  performed_exercise_sets,
  training_plan_routines,
});

export type Database = (typeof AppSchema)["types"];

export const drizzleSchema = {
  exercise_types: exercise_types_table,
  muscle_groups: muscle_groups_table,
  equipament: equipament_table,
  exercises: exercises_table,
  user_training_routines: user_training_routines_table,
  training_sessions: training_sessions_table,
  users: users_table,
  training_plan: training_plan_table,
  routine_exercises: routine_exercises_table,
  routine_exercise_sets: routine_exercise_sets_table,
  performed_exercises: performed_exercises_table,
  performed_exercise_sets: performed_exercise_sets_table,
  training_plan_routines: training_plan_routines_table,
};

export const AppSchemaTest = new DrizzleAppSchema(drizzleSchema);

export type DatabaseTest = (typeof AppSchemaTest)["types"];
