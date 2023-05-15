import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useMemo, useState } from 'react'
import { FlatGrid } from 'react-native-super-grid';
import { styled } from 'nativewind'
const StyledView = styled(View);
// icons
import { MaterialCommunityIcons } from '@expo/vector-icons';
// firebase
import { getUserPosts } from '../../api/firestore/post';

export default function ProfilePostsScreen({ userId }) {
  // all post
  const [ dataPosts, setDataPosts ] = useState([]);

  useMemo(() => {
    getUserPosts(setDataPosts, userId)
  }, [])

  return (
    <StyledView className="flex-1 bg-white dark:bg-black">
      {dataPosts.length === 0 ? (
        <View className="justify-center items-center">
          <MaterialCommunityIcons name="emoticon-sad-outline" size={30} />
          <Text className="text-xl font-bold">No Posts</Text>
        </View>
      ) : (
        <FlatGrid
          scrollEnabled={false}
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
      )}
    </StyledView>
  );
}