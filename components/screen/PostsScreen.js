import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'

import { useSelector } from 'react-redux';

export default function PostsScreen() {
  const user = useSelector((state) => state.auth.user);
  return (
    <View className="flex-1 bg-white justify-center items-center">
      <Text>Posts Screen</Text>
    </View>
  );
}