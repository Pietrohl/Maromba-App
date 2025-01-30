import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { Accordion, H4, Square, YStack, Text } from "tamagui";

type ItemsData<ComponentParams> = {
  title: string;
  content: Array<ComponentParams>;
  itemValue: string | string[];
  RenderComponent: React.ComponentType<ComponentParams>;
};

type AppAccordionParams = {
  data: ItemsData<any>[];
} & Parameters<typeof Accordion>[0];

export function AppAccordion({ data, ...params }: AppAccordionParams) {
  return (
    <Accordion {...params}>
      {data.map((itemData) => (
        <Accordion.Item value={itemData.itemValue as string}>
          <Accordion.Trigger flexDirection="row" justifyContent="space-between">
            {({ open }: { open: boolean }) => (
              <>
                <H4>{itemData.title}</H4>
                <Square animation="quick" rotate={open ? "180deg" : "0deg"}>
                  <FontAwesome name="chevron-down" />
                </Square>
              </>
            )}
          </Accordion.Trigger>
          <Accordion.Content>
            <YStack gap="$2">
              {itemData.content.map((contentParams, index) => {
                return (
                  <itemData.RenderComponent key={index} {...contentParams} />
                );
              })}
            </YStack>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
