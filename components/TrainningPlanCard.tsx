import React from "react";
import { XStack, YStack, Paragraph } from "tamagui";

// Plan Folder Component
export function TrainingPlanCard({ name, routines }: { name: string; routines: string; }) {
  return (
    <XStack ai="center" gap="$3" p="$2" bg="$backgroundHover" borderRadius="$2">
      <YStack>
        <Paragraph fontWeight="500">{name}</Paragraph>
        <Paragraph theme="alt2">{routines} routines</Paragraph>
      </YStack>
    </XStack>
  );
}
