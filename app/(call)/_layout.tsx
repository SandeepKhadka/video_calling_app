import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Redirect, Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@clerk/clerk-expo';

const CallLayout = () => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href={'/(auth)/sing-in'} />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          name="join"
          options={{
            title: 'Join',
            tabBarIcon: ({ color }) => (
              <Ionicons size={28} name="enter-outline" color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default CallLayout;

const styles = StyleSheet.create({});
