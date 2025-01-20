import { Text } from "tamagui";
import { useCell } from "tinybase/ui-react";

export function EquipamentRow({ id }: { id: string }) {
  return <Text color={"black"}>{useCell("equipament", id, "name")}</Text>;
}
