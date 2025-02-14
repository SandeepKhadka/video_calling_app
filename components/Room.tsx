import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { CallContent } from '@stream-io/video-react-native-sdk';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const CallRoom = ({ slug }: { slug: string }) => {
  return (
    <GestureHandlerRootView>
      <CallContent />
    </GestureHandlerRootView>
  );
};

export default CallRoom;

const styles = StyleSheet.create({});
