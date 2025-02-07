import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import {
  Text,
  TextInput,
  Button,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { useCallback, useState } from 'react';
import StyledButton from '@/components/StyledButton';
import { MaterialIcons } from '@expo/vector-icons';
import SignInWithGoogle from '@/components/SignInWithGoogle';

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  // Handle the submission of the sign-in form
  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/');
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        Alert.alert('Error', JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      Alert.alert('Error', err.errors[0].message);
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <MaterialIcons
        name="video-chat"
        size={160}
        color="white"
        style={{ alignSelf: 'center', paddingBottom: 20 }}
      />
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        style={[styles.input, {}]}
      />
      <TextInput
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
        style={styles.input}
      />
      <View
        style={{
          margin: 20,
          borderWidth: 0.5,
          borderColor: 'white',
          width: '100%',
        }}
      ></View>
      <StyledButton title="Sign in" color="#5f5dec" onPress={onSignInPress} />
      <Text style={{ color: 'white', marginBottom: 5 }}>
        Forgot your password?
      </Text>
      <Text style={{ color: 'white', marginBottom: 10 }}>OR</Text>
      <SignInWithGoogle />
      <View
        style={{
          margin: 20,
          borderWidth: 0.5,
          borderColor: 'white',
          width: '100%',
        }}
      ></View>
      <View>
        <Text style={{ color: 'white', marginBottom: 5 }}>
          Don't have an account?
        </Text>
        <Link href="/sign-up">
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              textDecorationLine: 'underline',
              fontWeight: 'bold',
            }}
          >
            Sign up
          </Text>
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5F5DEC',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: 'white',
    borderRadius: 10,
    color: 'black',
    padding: 10,
    width: '100%',
    height: 60,
    marginBottom: 10,
  },
});
