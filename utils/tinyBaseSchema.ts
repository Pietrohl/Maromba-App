export const tinyBaseConfig = {
  mode: "tabular",
  tables: {
    load: {
      users: {
        tableId: "users",
        rowIdColumnName: "id",
      },
      equipament: {
        tableId: "equipament",
        rowIdColumnName: "id",
      },
      exercise_types: {
        tableId: "exercise_types",
        rowIdColumnName: "id",
      },
      muscle_groups: {
        tableId: "muscle_groups",
        rowIdColumnName: "id",
      },
      exercises: {
        tableId: "exercises",
        rowIdColumnName: "id",
      },
      user_training_routines: {
        tableId: "user_training_routines",
        rowIdColumnName: "id",
      },
      training_sessions: {
        tableId: "training_sessions",
        rowIdColumnName: "id",
      },
      training_plan: {
        tableId: "training_plan",
        rowIdColumnName: "id",
      },
      routine_exercises: {
        tableId: "routine_exercises",
        rowIdColumnName: "id",
      },
      routine_exercise_sets: {
        tableId: "routine_exercise_sets",
        rowIdColumnName: "id",
      },
      performed_exercises: {
        tableId: "performed_exercises",
        rowIdColumnName: "id",
      },
      performed_exercise_sets: {
        tableId: "performed_exercise_sets",
        rowIdColumnName: "id",
      },
      training_plan_routines: {
        tableId: "training_plan_routines",
        rowIdColumnName: "id",
      },
    },
    save: {
      users: {
        tableName: "users",
        rowIdColumnName: "id",
      },
      equipament: {
        tableName: "equipament",
        rowIdColumnName: "id",
      },
      exercise_types: {
        tableName: "exercise_types",
        rowIdColumnName: "id",
      },
      muscle_groups: {
        tableName: "muscle_groups",
        rowIdColumnName: "id",
      },
      exercises: {
        tableName: "exercises",
        rowIdColumnName: "id",
      },
      user_training_routines: {
        tableName: "user_training_routines",
        rowIdColumnName: "id",
      },
      training_sessions: {
        tableName: "training_sessions",
        rowIdColumnName: "id",
      },
      training_plan: {
        tableName: "training_plan",
        rowIdColumnName: "id",
      },
      routine_exercises: {
        tableName: "routine_exercises",
        rowIdColumnName: "id",
      },
      routine_exercise_sets: {
        tableName: "routine_exercise_sets",
        rowIdColumnName: "id",
      },
      performed_exercises: {
        tableName: "performed_exercises",
        rowIdColumnName: "id",
      },
      performed_exercise_sets: {
        tableName: "performed_exercise_sets",
        rowIdColumnName: "id",
      },
      training_plan_routines: {
        tableName: "training_plan_routines",
        rowIdColumnName: "id",
      },
    },
  },
} as const;

export const tablesSchema = {
  users: {
    username: { type: "string" },
    active_plan_id: { type: "string" },
    name: { type: "string" },
    weight: { type: "string" },
    unit_weight: { type: "string" },
    unit_distance: { type: "string" },
    theme: { type: "string" },
    created_at: { type: "string" },
    updated_at: { type: "string" },
  },
  equipament: {
    name: { type: "string" },
  },
  exercise_types: {
    name: { type: "string" },
  },
  muscle_groups: {
    name: { type: "string" },
  },
  exercises: {
    user_id: { type: "string" },
    name: { type: "string" },
    type: { type: "number" },
    equipament: { type: "number" },
    primary_muscle_group: { type: "number" },
    other_muscles: { type: "string" },
    instructions: { type: "string" },
    instruction_url: { type: "string" },
    created_at: { type: "string" },
    updated_at: { type: "string" },
    identifier: { type: "string" },
  },
  user_training_routines: {
    user_id: { type: "string" },
    name: { type: "string" },
    created_at: { type: "string" },
    updated_at: { type: "string" },
  },
  training_sessions: {
    user_id: { type: "string" },
    routine_id: { type: "string" },
    elapsed_time: { type: "number" },
    created_at: { type: "string" },
    updated_at: { type: "string" },
  },
  training_plan: {
    name: { type: "string" },
    description: { type: "string" },
    is_template: { type: "number" },
    creator_id: { type: "string" },
    user_id: { type: "string" },
    total_days: { type: "number" },
    is_flexible: { type: "number" },
    created_at: { type: "string" },
    updated_at: { type: "string" },
  },
  routine_exercises: {
    routine_id: { type: "string" },
    exercise_id: { type: "string" },
    load_type: { type: "string" },
    exercise_order: { type: "number" },
    instruction_text: { type: "string" },
    created_at: { type: "string" },
    updated_at: { type: "string" },
  },
  routine_exercise_sets: {
    exercise_id: { type: "number" },
    set_number: { type: "number" },
    weight_load: { type: "string" },
    reps: { type: "string" },
  },
  performed_exercises: {
    session_id: { type: "string" },
    exercise_id: { type: "string" },
    notes: { type: "string" },
    rir_or_rpe: { type: "string" },
    created_at: { type: "string" },
    updated_at: { type: "string" },
  },
  performed_exercise_sets: {
    exercise_id: { type: "string" },
    set_number: { type: "number" },
    reps: { type: "string" },
    weight: { type: "string" },
    rir_or_rpe: { type: "string" },
    created_at: { type: "string" },
    updated_at: { type: "string" },
    session_id: { type: "string" },
  },
  training_plan_routines: {
    training_plan_id: { type: "string" },
    routine_id: { type: "string" },
    day: { type: "number" },
    routine_order: { type: "number" },
  },
} as const;

export const valuesSchema = {} as const;
