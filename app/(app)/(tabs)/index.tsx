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
import React from "react";
import { useUser } from "@/hooks/useUser";
import { RoutineCard } from "../../../components/RoutineCard";
import { AppAccordion } from "@/components/AppAccordion";
import WithSchema from "@/utils/UiReactWithSchemas";

const otherPlans = [
  { name: "Push/Pull/Legs", routines: 6 },
  { name: "nSuns 5/3/1", routines: 4 },
  { name: "30 Day Muscle", routines: 7 },
  { name: "Full Body", routines: 5 },
  { name: "Upper/Lower", routines: 4 },
  { name: "Bodyweight", routines: 3 },
];
const otherRoutines = [
  { name: "Workout A", exercises: ["Squat", "Bench", "Row"] },
  { name: "Workout B", exercises: ["Squat", "OHP", "Deadlift"] },
];

export default function Train() {
  const user = useUser();

  const relentionship = WithSchema.useRelationships();
  const queries = WithSchema.useQueries();

  const queryPlanBasic = ({ select, join }) => {
    select((_, trainingPlanId) => trainingPlanId).as("training_plan_id");
    select("name");
  };

  queries?.setQueryDefinition(
    "query",
    "training_plan_routines",
    ({ select, join, group }) => {
      select("routine_id");
      select("training_plan_id");
      select("training_plan", "name");
      select("training_plan", "total_days");
      select("training_plan", "is_template");
      join('user_training_routines', 'routine_id');
      select('user_training_routines', 'name').as('routine_name');
      group("routine_id", "count").as('count');
      join("training_plan", "training_plan_id");
      group("training_plan", (id) => id[0]);
    }
  );

  console.log("Query", queries?.getResultRowCount("query") || "No Data");
  console.log("Query Table", queries?.getResultTable("query") || "No Data");
 
  const otherUserPlans = WithSchema.useRowIds("training_plan")
    .map((id) => id)
    .filter((id) => id !== user?.active_plan_id);
  const currentPlanRoutines = relentionship?.getLocalRowIds(
    "trainingPlanRoutines",
    user?.active_plan_id || ""
  );

  return (
    <MySafeAreaView>
      <ScrollView>
        <MyStack flex={1}>
          <XStack jc="space-between" ai="center" mb="$4">
            <H2>Current Plan</H2>
            <Button icon={<FontAwesome name="plus" />} circular />
          </XStack>

          {/* Current Plan Section */}
          {user?.active_plan_id && (
            <>
              <YStack mb="$4" flex={1}>
                <H4 color="$gray10" mb="$3">
                  Active: StrongLifts 5x5
                </H4>
                {/* Up Next Card */}
                <Card elevate mb="$3" height="500" size="$4">
                  <Card.Header>
                    <H3>Day 2: Upper</H3>
                    <Paragraph>3 exercises • 15 sets - Est. 60 mins</Paragraph>
                  </Card.Header>
                  <YStack padding="$true" flexWrap="wrap" gap="$2">
                    <Paragraph theme="alt2">Squat 5x5 70kg</Paragraph>
                    <Paragraph theme="alt2">Bench 5x5 52.5kg</Paragraph>
                    <Paragraph theme="alt2">Row 5x5 47.5kg</Paragraph>
                  </YStack>
                  <Card.Footer padded>
                    <XStack flex={1} />
                    <Button theme="active" width={"100%"}>
                      Start Routine
                    </Button>
                  </Card.Footer>
                </Card>
              </YStack>
              {/* Plan Progress */}
              {currentPlanRoutines && (
                <AppAccordion
                  data={currentPlanRoutines}
                  RenderComponent={(id) => (
                    <RoutineCard
                      name={
                        WithSchema.useCell(
                          "user_training_routines",
                          id,
                          "name"
                        ) || ""
                      }
                      key={id}
                      exercises={
                        relentionship?.getLocalRowIds(
                          "trainingPlanRoutinesDetails",
                          id
                        ) || []
                      }
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

          <AppAccordion
            data={otherUserPlans.map((id) => ({ id }))}
            RenderComponent={({ id }) => {
              const count = relentionship?.getLocalRowIds(
                "trainingPlanRoutines",
                id
              ).length;
              return (
                <PlanFolder
                  name={
                    (
                      <WithSchema.CellView
                        tableId="training_plan"
                        rowId={id}
                        cellId="name"
                      />
                    ) as unknown as string
                  }
                  routines={count?.toString() || "0"}
                />
              );
            }}
            itemValue="other-plans"
            title="Other Training Plans"
            type="multiple"
          />

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
