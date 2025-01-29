import {
  Card,
  Button,
  H3,
  YStack,
  XStack,
  H2,
  H4,
  Paragraph,
  ScrollView,
  Text,
} from "tamagui";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { MySafeAreaView } from "@/components/MySafeAreaView";
import { MyStack } from "@/components/MyStack";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { useUser } from "@/hooks/useUser";
import { RoutineCard } from "../../../components/RoutineCard";
import { AppAccordion } from "@/components/AppAccordion";
import { useSystem } from "@/hooks/useSystem";
import { Database } from "@/utils/appSchema";
import { jsonArrayFrom } from "kysely/helpers/sqlite";
import { db } from "@/utils/database";
import { Expression } from "kysely";

// const otherPlans = [
//   { name: "Push/Pull/Legs", routines: 6 },
//   { name: "nSuns 5/3/1", routines: 4 },
//   { name: "30 Day Muscle", routines: 7 },
//   { name: "Full Body", routines: 5 },
//   { name: "Upper/Lower", routines: 4 },
//   { name: "Bodyweight", routines: 3 },
// ];
// const otherRoutines = [
//   { name: "Workout A", exercises: ["Squat", "Bench", "Row"] },
//   { name: "Workout B", exercises: ["Squat", "OHP", "Deadlift"] },
// ];

const routinesQuery = (
  database: typeof db,
  planId: Expression<string | null> | string | string[] = ""
) =>
  database
    .selectFrom("training_plan_routines")
    .where("training_plan_id", "=", planId)
    .select([
      "training_plan_routines.id",
      "training_plan_id",
      "routine_id",
      "day",
      "routine_order",
    ])
    // .selectAll()
    .leftJoin(
      "user_training_routines",
      "training_plan_routines.routine_id",
      "user_training_routines.id"
    )
    .select("user_training_routines.name")
    .select("user_training_routines.id")
    .select(({ ref }) =>
      routineExercises(database, ref("user_training_routines.id")).as(
        "exercises"
      )
    )
    .orderBy("training_plan_routines.day asc")
    .groupBy("training_plan_routines.routine_id");

function PlanRoutines(
  database: typeof db,
  planId: Expression<string | null> | string
) {
  return jsonArrayFrom(routinesQuery(database, planId));
}

function routineExercises(
  database: typeof db,
  routineId: Expression<string | null> | string
) {
  database
    .selectFrom("routine_exercises")
    .selectAll()
    .execute()
    .then((exercises) => {
      console.log("Exercises", exercises);
    });

  return jsonArrayFrom(
    database
      .selectFrom("routine_exercises")
      .select([
        "routine_exercises.id",
        "routine_exercises.exercise_id",
        "routine_exercises.exercise_order",
        "routine_exercises.load_type",
        "routine_exercises.instruction_text",
        "routine_exercises.exercise_order",
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
}

const useTrainningPlan = (id: string | string[]) => {
  const { database } = useSystem();

  const [activeTrainingPlan, setActiveTrainingPlan] = useState<
    | (Database["training_plan"] & {
        routines: {
          routine_id: string | null;
          training_plan_id: string | null;
          day: number | null;
          routine_order: number | null;
          id: string;
          name: string | null;
          exercises: {
            id: string;
            load_type: string | null;
            exercise_order: number | null;
            instruction_text: string | null;
            name: string | null;
            identifier: string | null;
            sets: string | number | bigint;
          }[];
        }[];
      })
    | ""
    | null
  >();

  const activeTrainingPlanQuery = useMemo(() => {
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
      .select(({ ref }) =>
        PlanRoutines(database, ref("training_plan.id")).as("routines")
      );
  }, [id]);

  useLayoutEffect(() => {
    if (!id) return;

    activeTrainingPlanQuery.executeTakeFirst().then((result) => {
      console.log("User Trainning PLan", JSON.stringify(result));

      setActiveTrainingPlan(result);
    });

    database.watch(activeTrainingPlanQuery, {
      onResult(results) {
        setActiveTrainingPlan(results[0]);
      },
    });
  }, [id]);

  return activeTrainingPlan;
};

const getAllTrainningPlans = (exclude: string[] | string = "") => {
  const { database } = useSystem();
  const activePlanId = useUser()?.active_plan_id;

  const [plans, setPlans] = useState<
    | (Partial<Database["training_plan"]> & {
        totalRoutines?: string | number | BigInt;
        uniqueRoutines?: string | number | BigInt;
      })[]
    | null
  >(null);

  const plansQuery = useMemo(() => {
    return database
      .selectFrom("training_plan")
      .select(["training_plan.name", "training_plan.id"])
      .where("training_plan.id", "!=", exclude?.length > 0 ? exclude : "")
      .leftJoin(
        "training_plan_routines",
        "training_plan.id",
        "training_plan_routines.training_plan_id"
      )
      .select([
        (b) => b.fn.count("training_plan_routines.id").as("totalRoutines"),
        (b) =>
          b.fn
            .count("training_plan_routines.routine_id")
            .distinct()
            .as("uniqueRoutines"),
      ])
      .groupBy("training_plan.id");
  }, [activePlanId]);

  useLayoutEffect(() => {
    plansQuery
      .execute()
      .then((results) => {
        setPlans(results);
      })
      .catch((error) => {
        console.log(error);
      });

    database.watch(plansQuery, {
      onResult(results) {
        setPlans(results);
      },
      onError(error) {
        console.log(error);
      },
    });
  }, [plansQuery]);

  return plans;
};

const useRoutinesFromPlan = (planId: string | string[]) => {
  const { database } = useSystem();
  const [routines, setRoutines] = useState<
    | (Database["training_plan_routines"] & {
        name: string | null;
        exercises: {
          id: string;
          load_type: string | null;
          exercise_order: number | null;
          instruction_text: string | null;
          name: string | null;
          identifier: string | null;
        }[];
      })[]
    | null
  >(null);

  const query = useMemo(() => {
    return routinesQuery(database, planId);
  }, [planId]);

  useLayoutEffect(() => {
    if (!planId) return;

    query
      .execute()
      .then((results) => {
        console.log("RESULTS!!!", JSON.stringify(results));
        setRoutines(results);
      })
      .catch((error) => {
        console.log(error);
      });

    database.watch(query, {
      onResult(results) {
        setRoutines(results);
      },
      onError(error) {
        console.log(error);
      },
    });
  }, [query]);

  return routines;
};

export default function Train() {
  const user = useUser();

  const activePlanId = user?.active_plan_id || "";

  const activeTrainingPlan = useTrainningPlan(activePlanId);
  const otherPlans = getAllTrainningPlans(activePlanId);
  const otherRoutines = useRoutinesFromPlan(activePlanId);

  return (
    <MySafeAreaView>
      <ScrollView>
        <MyStack flex={1}>
          <XStack jc="space-between" ai="center" mb="$4">
            <H2>Current Plan</H2>
            {/* <Button icon={<FontAwesome name="plus" />} circular /> */}
          </XStack>
          {/* Current Plan Section */}
          {activeTrainingPlan && (
            <>
              <YStack mb="$4" flex={1}>
                <H4 color="$gray10" mb="$3">
                  {activeTrainingPlan.name}
                </H4>
                {/* Up Next Card */}
                {activeTrainingPlan.routines[0] && (
                  <Card elevate mb="$3" height="500" size="$4">
                    <Card.Header>
                      <H3>{activeTrainingPlan.routines[0].name}</H3>
                      <Paragraph>
                        3 exercises • 15 sets - Est. 60 mins
                      </Paragraph>
                    </Card.Header>
                    <YStack padding="$true" flexWrap="wrap" gap="$2">
                      {activeTrainingPlan.routines[0].exercises.map(
                        (exercise) => (
                          <Paragraph theme="alt2">
                            {exercise.name} {exercise.sets} 70kg
                          </Paragraph>
                        )
                      )}
                    </YStack>
                    <Card.Footer padded>
                      <XStack flex={1} />
                      <Button theme="active" width={"100%"}>
                        Start Routine
                      </Button>
                    </Card.Footer>
                  </Card>
                )}
              </YStack>
              {/* Plan Progress */}
              {otherRoutines && (
                <AppAccordion
                  data={otherRoutines}
                  RenderComponent={({ name, exercises }) => (
                    <RoutineCard
                      name={name || ""}
                      key={name}
                      exercises={exercises}
                    />
                  )}
                  itemValue="current-plan"
                  title="Current Plan Routines"
                  type="multiple"
                />
              )}
            </>
          )}
          {/* Other Plans Section */}
          {otherPlans && (
            <AppAccordion
              data={otherPlans}
              RenderComponent={({ name, uniqueRoutines }) => {
                return (
                  <PlanFolder
                    name={name!}
                    routines={uniqueRoutines?.toString() || "0"}
                  />
                );
              }}
              itemValue="other-plans"
              title="Other Training Plans"
              type="multiple"
            />
          )}
          <YStack gap="$4" flex={1}>
            <Button icon={<FontAwesome name="plus" />}>
              Create standalone routine
            </Button>
          </YStack>
        </MyStack>
      </ScrollView>
    </MySafeAreaView>
  );
}

// Plan Folder Component
function PlanFolder({ name, routines }: { name: string; routines: string }) {
  return (
    <XStack ai="center" gap="$3" p="$2" bg="$backgroundHover" borderRadius="$2">
      <YStack>
        <Paragraph fontWeight="500">{name}</Paragraph>
        <Paragraph theme="alt2">{routines} routines</Paragraph>
      </YStack>
    </XStack>
  );
}
