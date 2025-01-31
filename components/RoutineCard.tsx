import { router } from "expo-router";
import React from "react";
import { Card, XStack, H4, Paragraph } from "tamagui";

export function RoutineCard({
  name,
  exercises,
  id,
}: {
  name: string;
  exercises: { name: string | null, id: string }[];
  id: string;
}) {
  return (
    <Card
      elevate
      onPress={() =>
        router.push({
          pathname: "/(app)/(tabs)/home/routine",
          params: {
            id,
          },
        })
      }
    >
      <Card.Header padded>
        <XStack jc="space-between" ai="center">
          <H4>{name}</H4>
          <Paragraph theme="alt2">{exercises.length} exercises</Paragraph>
        </XStack>
      </Card.Header>
      <Card.Footer padding="$true">
        <XStack flexWrap="wrap" gap="$2">
          {exercises.map((ex, i) => (
            <Paragraph key={ex.id} theme="alt2">
              {ex.name}
            </Paragraph>
          ))}
        </XStack>
      </Card.Footer>
    </Card>
  );
}
