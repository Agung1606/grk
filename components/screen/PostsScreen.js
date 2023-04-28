import { View, Text, ScrollView } from 'react-native'
import { Avatar } from 'react-native-paper';
import React from 'react'

import { useSelector } from 'react-redux';

export default function PostsScreen() {
  const user = useSelector((state) => state.auth.user);
  return (
    <View className="flex-1 bg-white justify-center items-center">
      <Avatar.Image source={{ uri: user.profileImg }} size={100} />
    </View>
  );
}