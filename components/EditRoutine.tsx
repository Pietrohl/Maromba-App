import React, { ReactElement, useState } from "react";
import {
  Database,
  Exercises,
  RoutineExercises,
  UserTrainingRoutines,
} from "@/utils/appSchema";
import {
  useWindowDimensions,
  Paragraph,
  YStack,
  H3,
  XStack,
  Separator,
  Input,
  Button,
} from "tamagui";
import { SectionList } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { SafeAreaModalView } from "./SafeAreaModalView";
import Ionicons from "@expo/vector-icons/Ionicons";

type EditRoutineProps = {
  routine: Partial<UserTrainingRoutines> & {
    exercises: Array<Partial<Exercises> & Partial<RoutineExercises>>;
  };
};

type FormData = {
  name: string;
  exercises: {
    id: string;
    name: string;
    load_type: string; // "intensity" or "target_weight"
    exercise_sets: {
      reps: number;
      weight_load: number;
    }[];
  }[];
};

// Predefined list of exercises (for demonstration purposes)
const predefinedExercises = [
  { id: "1", name: "Bench Press", load_type: "intensity" },
  { id: "2", name: "Squat", load_type: "intensity" },
  { id: "3", name: "Deadlift", load_type: "target_weight" },
];

const EditRoutine: React.FC<EditRoutineProps> = ({ routine: routineParam }) => {
  const { width } = useWindowDimensions();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<FormData>({
    defaultValues: {
      name: routineParam.name || "",
      exercises: routineParam.exercises.map((exercise) => ({
        id: exercise.id || "",
        name: exercise.name || "",
        load_type: exercise.load_type || "intensity", // Default to intensity
        exercise_sets: exercise.exercise_sets?.map((set, index) => ({
          reps: Number(set.reps),
          weight_load: Number(set.weight_load),
        })),
      })),
    },
  });

  const [showIntensity, setShowIntensity] = useState<boolean[]>(
    routineParam.exercises.map((exercise) => exercise.load_type === "intensity") // Default based on exercise load_type
  );

  const toggleLoadType = (index: number) => {
    setShowIntensity((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const onSubmit = (data: FormData) => {
    console.log("Form Data Submitted:", JSON.stringify(data));
    // Handle form submission (e.g., save to database)
  };

  const addExercise = () => {
    // Open a modal or list to select a predefined exercise
    // For simplicity, let's assume the user selects the first predefined exercise
    const selectedExercise = predefinedExercises[0]; // Replace with actual selection logic

    // Add the selected exercise to the form
    const currentExercises = getValues("exercises");
    setValue("exercises", [
      ...currentExercises,
      {
        id: selectedExercise.id,
        name: selectedExercise.name,
        load_type: selectedExercise.load_type,
        exercise_sets: [
          { reps: 0, weight_load: 0 }, // Default set
        ],
      },
    ]);

    // Update the showIntensity state for the new exercise
    setShowIntensity((prev) => [
      ...prev,
      selectedExercise.load_type === "intensity",
    ]);
  };

  return (
    <SafeAreaModalView>
      <YStack alignItems="center" gap="$2" padding="$2">
        <H3>Edit Routine</H3>

        <Controller
          name="name"
          control={control}
          rules={{ required: "Routine name is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Routine Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              width={width * 0.9}
            />
          )}
        />
        {errors.name && (
          <Paragraph color="red">{errors.name.message}</Paragraph>
        )}

        <SectionList
          sections={getValues("exercises").map((exercise, index) => ({
            data: exercise.exercise_sets,
            ...exercise,
            index,
          }))}
          keyExtractor={(_, index) => index.toString()}
          renderSectionHeader={({ section }) => (
            <YStack paddingTop="$6" gap="$2">
              <YStack flex={1}>
                <H3>{section.name}</H3>
              </YStack>
              <XStack
                backgroundColor="$backgroundStrong"
                width={width}
                justifyContent="space-between"
                alignItems="center"
              >
                <YStack flex={1} padding="$2" alignItems="center">
                  <Paragraph fontWeight="300" fontSize="$5">
                    Set
                  </Paragraph>
                </YStack>
                <YStack flex={1} padding="$2" alignItems="center">
                  <Paragraph fontWeight="300" fontSize="$5">
                    Reps
                  </Paragraph>
                </YStack>
                <YStack flex={3} padding="$2" alignItems="center">
                  <Button
                    fontWeight="300"
                    fontSize="$5"
                    alignSelf="center"
                    onPress={() => toggleLoadType(section.index)}
                    iconAfter={() => (
                      <Ionicons name="chevron-expand-sharp" size={16} />
                    )}
                  >
                    {showIntensity[section.index] ? "%RM" : "Kg"}
                  </Button>
                </YStack>
                <YStack flex={2} padding="$2" alignItems="center">
                  <Paragraph fontWeight="300" fontSize="$5"></Paragraph>
                </YStack>
              </XStack>
              <Separator />
            </YStack>
          )}
          renderItem={({ item, section, index }) => (
            <YStack>
              <XStack width={width} justifyContent="space-between">
                <YStack
                  flex={1}
                  padding="$2"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Paragraph>{Number(index + 1).toFixed()}</Paragraph>
                </YStack>
                <YStack flex={1} padding="$2" alignItems="center">
                  <Controller
                    name={`exercises.${section.index}.exercise_sets.${index}.reps`}
                    control={control}
                    rules={{ required: "Reps are required" }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        textAlign="center"
                        placeholder="Reps"
                        onBlur={onBlur}
                        onChangeText={(text) => onChange(Number(text))}
                        value={value?.toString()}
                        keyboardType="numeric"
                        width="100%"
                      />
                    )}
                  />
                </YStack>
                <YStack flex={3} padding="$2" alignItems="center">
                  {showIntensity[section.index] ? (
                    <Controller
                      name={`exercises.${section.index}.exercise_sets.${index}.weight_load`}
                      control={control}
                      rules={{ required: "Intensity is required" }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          textAlign="center"
                          placeholder="Intensity"
                          onBlur={onBlur}
                          onChangeText={(text) => onChange(Number(text))}
                          value={value?.toString()}
                          keyboardType="numeric"
                          width="60%"
                        />
                      )}
                    />
                  ) : (
                    <Controller
                      name={`exercises.${section.index}.exercise_sets.${index}.weight_load`}
                      control={control}
                      rules={{ required: "Target weight is required" }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          textAlign="center"
                          placeholder="Target Weight"
                          onBlur={onBlur}
                          onChangeText={(text) => onChange(Number(text))}
                          value={value?.toString()}
                          keyboardType="numeric"
                          width="60%"
                        />
                      )}
                    />
                  )}
                </YStack>
                <YStack flex={2} padding="$2" alignItems="center">
                  <Paragraph></Paragraph>
                </YStack>
              </XStack>
            </YStack>
          )}
        />

        <XStack gap="$2">
          <Button onPress={addExercise} marginTop="$4">
            Add Exercise
          </Button>

          <Button onPress={handleSubmit(onSubmit)} marginTop="$4">
            Save Routine
          </Button>
        </XStack>
      </YStack>
    </SafeAreaModalView>
  );
};

export default EditRoutine;
