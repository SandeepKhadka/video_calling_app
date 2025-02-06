import { Slot } from 'expo-router';
import { SafeAreaView } from 'react-native';

import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <SafeAreaView>
      <Slot />
    </SafeAreaView>
  );
}
