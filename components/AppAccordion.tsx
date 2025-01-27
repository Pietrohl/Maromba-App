import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { Accordion, H4, Square, YStack, Text } from "tamagui";

export function AppAccordion<ComponentParams>({
  title,
  itemValue,
  data,
  RenderComponent,
  ...params
}: {
  title: string;
  itemValue: string | string[];
  data: Array<ComponentParams>;
  RenderComponent: React.ComponentType<ComponentParams>;
} & Parameters<typeof Accordion>[0]) {
  return (
    <Accordion {...params}>
      <Accordion.Item value={itemValue as string}>
        <Accordion.Trigger flexDirection="row" justifyContent="space-between">
          {({ open }: { open: boolean }) => (
            <>
              <H4>{title}</H4>
              <Square animation="quick" rotate={open ? "180deg" : "0deg"}>
                <FontAwesome name="chevron-down" />
              </Square>
            </>
          )}
        </Accordion.Trigger>
        <Accordion.Content>
          <YStack gap="$2">
            {data.map((params, index) => {
              return <RenderComponent key={index} {...params} />;
            })}
          </YStack>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}
