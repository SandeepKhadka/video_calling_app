import { SignedIn, SignedOut, useAuth } from '@clerk/clerk-expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Dialog from 'react-native-dialog';
import { useState } from 'react';

export default function Index() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { signOut } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={[styles.logout, { zIndex: 100 }]}
        onPress={() => setDialogOpen(true)}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons name="exit-run" size={24} color="#5f5dec" />
      </TouchableOpacity>
      <Dialog.Container visible={dialogOpen}>
        <Dialog.Title>Sign Out</Dialog.Title>
        <Dialog.Description>
          Are you sure you want to sign out?
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={() => setDialogOpen(false)} />
        <Dialog.Button
          label="Sign out"
          onPress={async () => {
            try {
              await signOut();
              setDialogOpen(false);
            } catch (error) {
              console.error('Error signing out: ', error);
            }
          }}
        />
      </Dialog.Container>
      <Text>Hello world</Text>
      <SignedIn>
        <Text>You are signed in</Text>
      </SignedIn>
      <SignedOut>
        <Text>You are signed out</Text>
      </SignedOut>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logout: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
  },
});
