import { View, Text } from 'react-native'
import React, { useMemo, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { getUserPosts } from '../../api/firestore/post';

export default function ProfilePostsScreen({ route }) {
  const userId = route?.params?.param

  // all post
  const [ dataPosts, setDataPosts ] = useState([]);

  useMemo(() => {
    getUserPosts(setDataPosts, userId)
  }, [])

  if(dataPosts.length === 0) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <MaterialCommunityIcons name="emoticon-sad-outline" size={30} />
        <Text className="text-xl font-bold">No Posts</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white justify-center items-center">
      <Text>Have {dataPosts.length} post(s)</Text>
    </View>
  );
}