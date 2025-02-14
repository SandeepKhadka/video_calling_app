import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  Call,
  CallingState,
  StreamCall,
  useStreamVideoClient,
} from '@stream-io/video-react-native-sdk';
import { useLocalSearchParams } from 'expo-router';
import Room from '@/components/Room';

const CallScreen = () => {
  const { id } = useLocalSearchParams();
  const [call, setCall] = useState<Call | null>(null);
  const client = useStreamVideoClient();
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    let slug: string;
    if (id !== '(call)' && id) {
      //joining existing call
      slug = id.toString();
      const _call = client?.call('default', slug);
      _call?.join({ create: false }).then(() => {
        setCall(_call);
      });
    } else {
      // creating a new call
      slug = 'demoroom';
      const _call = client?.call('default', slug);
      _call?.join({ create: true }).then(() => {
        setCall(_call);
      });
    }
    setSlug(slug);
  }, [id, client]);

  useEffect(() => {
    if (call?.state.callingState! == CallingState.LEFT) {
      call?.leave();
    }
  }, [call]);

  if (!call || !slug) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <StreamCall call={call}>
      <Room slug={slug} />
    </StreamCall>
  );
};

export default CallScreen;

const styles = StyleSheet.create({});
