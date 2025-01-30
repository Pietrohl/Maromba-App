import { Button, Card, H3, Paragraph, XStack, YStack } from "tamagui";

type Routine = {
  name: string | null;
  exercises: {
    name: string | null;
    id: string | null;
    sets: string | number | bigint | null;
  }[];
};

export function NextRoutineCard({ routine }: { routine: Routine }) {
  return (
    <Card elevate mb="$3" height="500" size="$4">
      <Card.Header>
        <H3>{routine.name}</H3>
        <Paragraph>3 exercises • 15 sets - Est. 60 mins</Paragraph>
      </Card.Header>
      <YStack padding="$true" flexWrap="wrap" gap="$2">
        {routine.exercises.map((exercise) => (
          <Paragraph theme="alt2" key={exercise.id}>
            {exercise.name} {exercise.sets} 70kg
          </Paragraph>
        ))}
      </YStack>
      <Card.Footer padded>
        <XStack flex={1} />
        <Button theme="active" width={"100%"}>
          Start Routine
        </Button>
      </Card.Footer>
    </Card>
  );
}
