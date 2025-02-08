import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Redirect, Tabs } from 'expo-router';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
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
    </SafeAreaView>
  );
};

export default CallLayout;

const styles = StyleSheet.create({});
