import {
  View,
  Card,
  Text,
  Button,
  H3,
  YStack,
  XStack,
  H2,
  H4,
  Paragraph,
  Separator,
  Accordion,
  Square,
  ScrollView,
} from "tamagui";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { MySafeAreaView } from "@/components/MySafeAreaView";
import { MyStack } from "@/components/MyStack";
import { useAuth } from "@/hooks/useAuth";
import React from "react";

export default function Train() {
  const { signOut } = useAuth();

  return (
    <MySafeAreaView>
      <ScrollView>
        <MyStack flex={1}>
          <XStack jc="space-between" ai="center" mb="$4">
            <H2>Current Plan</H2>
            <Button icon={<FontAwesome name="plus" />} circular />
          </XStack>
          {/* Current Plan Section */}
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
          <Accordion type="multiple">
            <Accordion.Item value="current-plan">
              <Accordion.Trigger
                flexDirection="row"
                justifyContent="space-between"
              >
                {({ open }: { open: boolean }) => (
                  <>
                    <H4>Current Plan Routines</H4>
                    <Square animation="quick" rotate={open ? "180deg" : "0deg"}>
                      <FontAwesome name="chevron-down" />
                    </Square>
                  </>
                )}
              </Accordion.Trigger>
              <Accordion.Content>
                <YStack gap="$2">
                  <RoutineCard
                    name="Workout A"
                    exercises={["Squat", "Bench", "Row"]}
                  />
                  <RoutineCard
                    name="Workout B"
                    exercises={["Squat", "OHP", "Deadlift"]}
                  />
                </YStack>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>

          {/* Other Plans Section */}
          <Accordion type="multiple">
            <Accordion.Item value="other-plans">
              <Accordion.Trigger
                flexDirection="row"
                justifyContent="space-between"
              >
                {({ open }: { open: boolean }) => (
                  <>
                    <H4>Other Training Plans</H4>
                    <Square animation="quick" rotate={open ? "180deg" : "0deg"}>
                      <FontAwesome name="chevron-down" />
                    </Square>
                  </>
                )}
              </Accordion.Trigger>
              <Accordion.Content>
                <YStack gap="$3">
                  <PlanFolder name="Push/Pull/Legs" routines={6} />
                  <PlanFolder name="nSuns 5/3/1" routines={4} />
                  <PlanFolder name="30 Day Muscle" routines={7} />
                </YStack>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>
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

function RoutineCard({
  name,
  exercises,
}: {
  name: string;
  exercises: string[];
}) {
  return (
    <Card elevate>
      <Card.Header>
        <XStack jc="space-between" ai="center">
          <H4>{name}</H4>
          <Paragraph theme="alt2">{exercises.length} exercises</Paragraph>
        </XStack>
      </Card.Header>
      <Card.Footer>
        <XStack flexWrap="wrap" gap="$2">
          {exercises.map((ex, i) => (
            <Paragraph key={i} theme="alt2">
              {ex}
            </Paragraph>
          ))}
        </XStack>
      </Card.Footer>
    </Card>
  );
}

// Plan Folder Component
function PlanFolder({ name, routines }: { name: string; routines: number }) {
  return (
    <XStack ai="center" gap="$3" p="$2" bg="$backgroundHover" borderRadius="$2">
      <Paragraph>📁</Paragraph>
      <YStack>
        <Paragraph fontWeight="500">{name}</Paragraph>
        <Paragraph theme="alt2">{routines} routines</Paragraph>
      </YStack>
    </XStack>
  );
}
