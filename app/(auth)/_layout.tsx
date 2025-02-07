import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={'/(call)'} />;
  }

  return (
    <Stack
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <Stack.Screen
        name="sign-in"
        options={{
          title: 'Sign in to proceed',
          headerStyle: { backgroundColor: '#5F5DEC' },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          headerShown: true,
          title: 'Create a new account',
          headerBackTitle: 'Sign in',
          headerStyle: { backgroundColor: '#5F5DEC' },
          headerTintColor: '#fff',
        }}
      />
    </Stack>
  );
}
