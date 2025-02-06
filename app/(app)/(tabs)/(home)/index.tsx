import { Button, YStack, XStack, H2, H4, ScrollView } from "tamagui";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { MySafeAreaView } from "@/components/MySafeAreaView";
import { MyStack } from "@/components/MyStack";
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { RoutineCard } from "@/components/RoutineCard";
import { AppAccordion } from "@/components/AppAccordion";
import { TrainingPlanCard } from "@/components/TrainningPlanCard";
import {
  useTrainningPlan,
  getAllTrainningPlans,
  useRoutinesFromPlan,
  useStandaloneRoutines,
} from "../../../../hooks/api/dataQueries";
import { NextRoutineCard } from "@/components/NextRoutineCard";

export default function Train() {
  const { user } = useAuth();

  const activePlanId = user?.active_plan_id || "";
  const { data: activeTrainingPlan } = useTrainningPlan(activePlanId);
  const { data: otherPlans } = getAllTrainningPlans(activePlanId);
  const { data: otherRoutines } = useRoutinesFromPlan(activePlanId);
  const { data: standaloneRoutines } = useStandaloneRoutines();

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
                  <NextRoutineCard routine={activeTrainingPlan.routines[0]} />
                )}
              </YStack>
              {/* Plan Progress */}
              {otherRoutines && (
                <AppAccordion
                  data={[
                    {
                      content: otherRoutines,
                      itemValue: "current-plan-routines",
                      title: "Current Plan Routines",
                      RenderComponent: ({ name, exercises, id }) => (
                        <RoutineCard
                          name={name || ""}
                          key={name}
                          exercises={exercises}
                          id={id}
                        />
                      ),
                    },
                    {
                      content: otherPlans,
                      itemValue: "other-plans",
                      title: "Other Training Plans",
                      RenderComponent: ({ name, uniqueRoutines, id }) => {
                        return (
                          <TrainingPlanCard
                            name={name!}
                            routines={uniqueRoutines?.toString() || "0"}
                            key={id}
                          />
                        );
                      },
                    },
                    {
                      content: standaloneRoutines,
                      itemValue: "standalone-routines",
                      title: "Other Routines",
                      RenderComponent: ({ name, exercises, id }) => (
                        <RoutineCard
                          name={name || ""}
                          key={name}
                          exercises={exercises}
                          id={id}
                        />
                      ),
                    },
                  ]}
                  type="single"
                  collapsible={true}
                />
              )}
            </>
          )}
          {/* Other Plans Section */}
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
