import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useMemo, useState } from 'react'
import { FlatGrid } from 'react-native-super-grid';
// icons
import { MaterialCommunityIcons } from '@expo/vector-icons';
// firebase
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
    <View className="flex-1 bg-white">
      <FlatGrid
        itemDimension={95}
        spacing={2}
        data={dataPosts}
        renderItem={({ item }) => (
          <View className="h-[120px]">
            <TouchableOpacity onPress={() => alert(item.id)}>
              <Image
                source={{ uri: item.imgPost }}
                resizeMode="cover"
                className="w-full h-full"
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}