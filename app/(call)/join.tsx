import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { inverseFormatSlug } from '@/lib/slugs';
import { useStreamVideoClient } from '@stream-io/video-react-native-sdk';
import { useRouter } from 'expo-router';
import Toast from 'react-native-root-toast';

export default function JoinPage() {
  const [roomId, setRoomId] = useState('');
  const client = useStreamVideoClient();
  const router = useRouter();

  const handleJoinRoom = async () => {
    if (!roomId) return;
    const slug = inverseFormatSlug(roomId);
    const call = client?.call('default', slug);
    call
      ?.get()
      .then((callResponse) => {
        console.log(callResponse);
        router.push(`/(call)/${slug}`);
      })
      .catch((reason) => {
        Toast.show(
          "Whoops!\nLooks like the room you're trying to join doesn't exist",
          {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
            shadow: true,
          }
        );
      });
  };
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ padding: 20, fontWeight: 'bold' }}>
        Enter the Room Name
      </Text>
      <TextInput
        placeholder="e.g. Black Purple Tiger"
        value={roomId}
        onChangeText={setRoomId}
        style={{
          padding: 20,
          width: '100%',
          backgroundColor: 'white',
        }}
      />
      <TouchableOpacity
        onPress={handleJoinRoom}
        style={{
          padding: 20,
          backgroundColor: '#5f5dec',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          Join Room
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
