import { EquipamentRow } from "@/components/EquipamentRow";
import { MySafeAreaView } from "@/components/MySafeAreaView";
import { MyStack } from "@/components/MyStack";
import { useAuth } from "@/hooks/useAuth";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FlatList } from "react-native";
import { Button, H3, Text, YStack } from "tamagui";
import { useCell, useSortedRowIds } from "tinybase/ui-react";

export default function Train() {
  const { signOut } = useAuth();

  return (
    <MySafeAreaView>
      <MyStack>
        <YStack gap="$4">
          <H3>Workout Routines</H3>
          <Button icon={<FontAwesome name="plus"></FontAwesome>}>
            Create new routine
          </Button>
          <Button
            icon={<FontAwesome name="plus"></FontAwesome>}
            onPress={signOut}
          >
            Sign Out
          </Button>
        </YStack>
      </MyStack>
      <YStack gap="$4">
        <FlatList
          data={useSortedRowIds("equipament")}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <EquipamentRow id={item} />}
        />
      </YStack>
    </MySafeAreaView>
  );
}
