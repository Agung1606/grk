import { View, Text, Button } from 'react-native'
import React from 'react'

import { experiment } from '../api/firestore/user'

export default function Experiment() {

    const handle = () => {
        experiment();
    }
  return (
    <View className="flex-1 justify-center items-center">
      <Text>Experiment</Text>
      <Button onPress={handle} title="call it" />
    </View>
  )
}