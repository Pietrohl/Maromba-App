import { useSystem } from '@/hooks/useSystem';
import { Text, View } from 'react-native';


export default function Profile() {
  const { signOut } = useSystem();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}>
        Sign Out
      </Text>
    </View>
  );
}