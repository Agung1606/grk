import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'

export default function VisitedProfileScreen({ route }) {
  const userId = route?.params?.param;
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Text>hello agung semangat</Text>
      <Text>{userId}</Text>
    </SafeAreaView>
  );
}