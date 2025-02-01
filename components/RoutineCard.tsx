import { ROUTINE } from "@/constants/url";
import { router } from "expo-router";
import React from "react";
import { Card, XStack, H4, Paragraph, Text, YStack } from "tamagui";

export function RoutineCard({
  name,
  exercises,
  id,
}: {
  name: string;
  exercises: { name: string | null; id: string }[];
  id: string;
}) {
  const renderExercises = () => {
    const content = exercises
      .map(({ name }) => name || "")
      .reduce((previous, curr, indx) => {
        if (indx) previous = previous.concat(", ");
        return previous.concat(curr);
      }, "");

    return (
      <XStack gap="$2">
        {exercises.length > 0 && (
          <Paragraph numberOfLines={2} theme="alt2">
            <>
              {content}
            </>
          </Paragraph>
        )}
      </XStack>
    );
  };

  return (
    <Card
      elevate
      onPress={() =>
        router.push({
          pathname: ROUTINE,
          params: {
            id,
          },
        })
      }
    >
      <Card.Header padded>
        <YStack jc="space-between" ai="flex-start">
          <H4 textWrap="balance" wordWrap="break-word">
            {name}
          </H4>
          <Text theme="alt2">{exercises.length} exercises</Text>
        </YStack>
      </Card.Header>
      <Card.Footer padding="$true">{renderExercises()}</Card.Footer>
    </Card>
  );
}
