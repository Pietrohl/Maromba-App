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
              {otherRoutines && (
                <AppAccordion
                  data={otherRoutines}
                  RenderComponent={({name, exercises}) => (
                    <RoutineCard
                      name={ name
                      }
                      key={name}
                      exercises={
                        exercises
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
            data={otherPlans}
            RenderComponent={({ name, routines }) => {
            
              return (
                <PlanFolder
                  name={name}
                  routines={routines?.toString() || "0"}
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
