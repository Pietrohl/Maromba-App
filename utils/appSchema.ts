// import { column, Schema, Table } from '@powersync/web';
import { Column, column, Schema, Table, ExtractColumnValueType, BaseColumnType } from '@powersync/react-native';

const exercise_types = new Table(
  {
    // id column (text) is automatically included
    name: column.text
  },
  { indexes: {} }
);

const muscle_groups = new Table(
  {
    // id column (text) is automatically included
    name: column.text
  },
  { indexes: {} }
);

const equipament = new Table(
  {
    // id column (text) is automatically included
    name: column.text
  },
  { indexes: {} }
);

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
    identifier: column.text
  },
  { indexes: {} }
);

const user_training_routines = new Table(
  {
    // id column (text) is automatically included
    user_id: column.text,
    name: column.text,
    created_at: column.text,
    updated_at: column.text
  },
  { indexes: {} }
);

const training_sessions = new Table(
  {
    // id column (text) is automatically included
    user_id: column.text,
    routine_id: column.text,
    elapsed_time: column.integer,
    created_at: column.text,
    updated_at: column.text
  },
  { indexes: {} }
);

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
    active_plan_id: column.text
  },
  { indexes: {} }
);

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

type ExerciseSets = {
  reps: number;
  weight_load: number
}
type ExerciseSetsColumn = ExerciseSets[] & string




const exercise_sets_column: BaseColumnType<ExerciseSetsColumn> = column.text

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
    rest_interval: column.integer,
    exercise_sets: exercise_sets_column,
    set_count: column.integer,
    top_set_weight: column.integer
  },
  { indexes: {} }
);

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
  performed_exercises,
  performed_exercise_sets,
  training_plan_routines,
});

export type Database = (typeof AppSchema)["types"];

export type ExerciseTypes = Database['exercise_types'];
export type MuscleGroups = Database['muscle_groups'];
export type Equipament = Database['equipament'];
export type UserTrainingRoutines = Database['user_training_routines'];
export type TrainingSessions = Database['training_sessions'];
export type Users = Database['users'];
export type TrainingPlan = Database['training_plan'];
export type Exercises = Database['exercises'];
export type PerformedExercises = Database['performed_exercises'];
export type PerformedExerciseSets = Database['performed_exercise_sets'];
export type TrainingPlanRoutines = Database['training_plan_routines'];
export type RoutineExercises = Omit<Database['routine_exercises'], 'exercise_sets'> & {
  exercise_sets: ExerciseSets[]
}
