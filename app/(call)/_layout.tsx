import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Redirect, Tabs } from 'expo-router';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth, useUser } from '@clerk/clerk-expo';
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  User,
  LogLevel,
} from '@stream-io/video-react-native-sdk';

const apiKey = process.env.EXPO_PUBLIC_GET_STREAM_API_KEY;

if (!apiKey) {
  throw new Error('No GetStream API key provided');
}

const CallLayout = () => {
  const { isSignedIn } = useAuth();
  const { user: clerkUser } = useUser();

  if (!isSignedIn || !clerkUser || !apiKey) {
    return <Redirect href={'/(auth)/sing-in'} />;
  }

  const user: User = {
    id: clerkUser.id,
    name: clerkUser.fullName!,
    image: clerkUser.imageUrl!,
  };

  const tokenProvider = async () => {
    try {
      const url = `${process.env.EXPO_PUBLIC_API_URL}/generateUserToken`;
      console.log('Fetching from:', url);

      const bodyData = {
        userId: clerkUser.id,
        name: clerkUser.fullName || 'Unknown',
        image: clerkUser.imageUrl || '',
        email: clerkUser.primaryEmailAddress?.toString() || '',
      };

      console.log('Request Body:', bodyData);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });

      console.log('Response status:', response);

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const { token } = await response.json();
      console.log('Token:', token);

      return token;
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const client = StreamVideoClient.getOrCreateInstance({
    apiKey,
    tokenProvider,
    user,
    options: {
      logger: (logLevel: LogLevel, message: string, ...args: unknown[]) => {},
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StreamVideo client={client}>
        <Tabs
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: '#5F5DEC',
            headerShown: false,
            tabBarStyle: {
              padding: 20,
              display: route.name === '[id]' ? 'none' : 'flex', //we don't want to show the header when we are in the call screen
            },
            tabBarLabelStyle: { zIndex: 100, paddingBottom: 10 },
          })}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'All Calls',
              tabBarIcon: ({ color }) => (
                <Ionicons size={28} name="call-outline" color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="[id]"
            options={{
              title: 'Start a new call',
              unmountOnBlur: true,
              headerShown: false,
              tabBarIcon: ({ color }) => {
                return (
                  <View
                    style={{
                      position: 'absolute',
                      justifyContent: 'center',
                      alignItems: 'center',
                      top: -12,
                      // left: 20,
                      // right: 20,
                      bottom: 0,
                      margin: 'auto',
                      borderRadius: 50,
                      zIndex: 100,
                      backgroundColor: 'white',
                      borderColor: 'lightgray',
                      borderWidth: 0.2,
                      borderTopWidth: 1,
                      borderBottomWidth: 0,
                      width: 100,
                    }}
                  >
                    <FontAwesome
                      size={30}
                      name="plus-circle"
                      color="black"
                      style={{ zIndex: 200 }}
                    />
                  </View>
                );
              },
            }}
          />
          <Tabs.Screen
            name="join"
            options={{
              title: 'Join',
              tabBarIcon: ({ color }) => (
                <Ionicons size={28} name="enter-outline" color={color} />
              ),
            }}
          />
        </Tabs>
      </StreamVideo>
    </SafeAreaView>
  );
};

export default CallLayout;

const styles = StyleSheet.create({});
