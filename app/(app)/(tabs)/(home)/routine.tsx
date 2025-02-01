import { StyleSheet, Text, View } from 'react-native';

export default function Modal() {
  const { routineId: id } =
  useGlobalSearchParams();

  const data = useRoutineDetails(id);

  console.log("Routine Details: ", JSON.stringify(data, null, 2));
 
  return (
    <View style={styles.container}>
      <Text>Modal screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});