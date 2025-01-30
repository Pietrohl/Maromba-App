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
import { useAuth } from "@/hooks/useAuth";
import { RoutineCard } from "@/components/RoutineCard";
import { AppAccordion } from "@/components/AppAccordion";
import { TrainingPlanCard } from "@/components/TrainningPlanCard";
import {
  useTrainningPlan,
  getAllTrainningPlans,
  useRoutinesFromPlan,
} from "../../../hooks/dataQueries";
import { NextRoutineCard } from "@/components/NextRoutineCard";

export default function Train() {
  const { user } = useAuth();

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
                  <NextRoutineCard routine={activeTrainingPlan.routines[0]} />
                )}
              </YStack>
              {/* Plan Progress */}
              {otherRoutines && (
                <AppAccordion
                  data={[
                    {
                      content: otherRoutines,
                      itemValue: "current-plan",
                      title: "Current Plan Routines",
                      RenderComponent: ({ name, exercises }: any) => (
                        <RoutineCard
                          name={name || ""}
                          key={name}
                          exercises={exercises}
                        />
                      ),
                    },
                    {
                      content: otherPlans,
                      itemValue: "other-plans",
                      title: "Other Training Plans",
                      RenderComponent: ({ name, uniqueRoutines }: any) => {
                        return (
                          <TrainingPlanCard
                            name={name!}
                            routines={uniqueRoutines?.toString() || "0"}
                          />
                        );
                      },
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
