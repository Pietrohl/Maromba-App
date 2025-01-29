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
} from "tamagui";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { MySafeAreaView } from "@/components/MySafeAreaView";
import { MyStack } from "@/components/MyStack";
import React, { useMemo } from "react";
import { useUser } from "@/hooks/useUser";
import { RoutineCard } from "../../../components/RoutineCard";
import { AppAccordion } from "@/components/AppAccordion";
import { useSystem } from "@/hooks/useSystem";
import { useQuery } from "../../../hooks/useQuery";
import { routinesQuery } from "../../../utils/queries/routinesQuery";
import { detailedTrainingPlansQuery } from "../../../utils/queries/detailedTrainingPlansQuery";
import { getTrainningPlans } from "../../../utils/queries/getTrainningPlansQuery";

const useTrainningPlan = (id: string | string[]) => {
  const { database } = useSystem();

  const activeTrainingPlanQuery = useMemo(
    () => detailedTrainingPlansQuery(database, id),
    [id]
  );

  const { data } = useQuery(activeTrainingPlanQuery);
  return data[0];
};

const getAllTrainningPlans = (exclude: string[] | string = "") => {
  const { database } = useSystem();
  const activePlanId = useUser()?.active_plan_id;

  const plansQuery = useMemo(
    () => getTrainningPlans(database, exclude),
    [activePlanId]
  );

  const { data: plans } = useQuery(plansQuery);

  return plans;
};

const useRoutinesFromPlan = (planId: string | string[]) => {
  const { database } = useSystem();

  const query = useMemo(() => {
    return routinesQuery(database, planId);
  }, [planId]);

  return useQuery(query).data;
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
                          <Paragraph theme="alt2" key={exercise.id}>
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
