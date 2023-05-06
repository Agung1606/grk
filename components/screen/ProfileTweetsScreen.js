import { View, Text } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ProfileTweetsScreen() {
  return (
    <View className="flex-1 bg-white justify-center items-center">
      <MaterialCommunityIcons name="emoticon-sad-outline" size={30} />
      <Text className="text-xl font-bold">No Tweets</Text>
    </View>
  );
}