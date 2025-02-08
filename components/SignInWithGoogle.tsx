import React, { useCallback, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useSSO } from '@clerk/clerk-expo';
import { Alert } from 'react-native';
import StyledButton from './StyledButton';

export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function SignInWithGoogle() {
  useWarmUpBrowser();

  const { startSSOFlow } = useSSO();

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: 'oauth_google',
        });

      console.log('createdSessionId:', createdSessionId);
      console.log('signIn:', signIn);
      console.log('signUp:', signUp);

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // Handle missing requirements
        if (signIn) {
          switch (signIn.status) {
            case 'needs_identifier':
              Alert.alert(
                'Identifier Required',
                'Please provide your email address to proceed.'
              );
              // Redirect or prompt user to provide identifier
              break;
            case 'needs_second_factor':
              Alert.alert(
                'MFA Required',
                'Please complete the second factor authentication.'
              );
              // Redirect or prompt user for MFA
              break;
            case 'needs_new_password':
              Alert.alert(
                'New Password Required',
                'Please set a new password.'
              );
              // Redirect or prompt user to set a new password
              break;
            default:
              Alert.alert('Error', 'Sign-in requirements not met.');
              break;
          }
        } else if (signUp) {
          switch (signUp.status) {
            case 'missing_requirements':
              Alert.alert(
                'Missing Requirements',
                'Please provide your email address and password to complete the sign-up process.'
              );
              // Redirect or prompt user to complete sign-up
              break;
            default:
              Alert.alert('Error', 'Sign-up requirements not met.');
              break;
          }
        } else {
          Alert.alert(
            'Error',
            'Session not created and no sign-in/sign-up object returned.'
          );
        }
      }
    } catch (err: any) {
      console.error('Authentication error:', JSON.stringify(err, null, 2));
      Alert.alert('Error', err.message || 'Authentication failed.');
    }
  }, [startSSOFlow]);

  return (
    <StyledButton
      title="Sign in with Google"
      onPress={onPress}
      color="#5f5dec"
    />
  );
}
