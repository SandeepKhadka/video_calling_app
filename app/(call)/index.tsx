import { SignedIn, SignedOut } from '@clerk/clerk-expo';
import { SafeAreaView, Text, View } from 'react-native';

export default function Index() {
  return (
    <View>
      <Text>Hello world</Text>
      <SignedIn>
        <Text>You are signed in</Text>
      </SignedIn>
      <SignedOut>
        <Text>You are signed out</Text>
      </SignedOut>
    </View>
  );
}
