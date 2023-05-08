import { View, FlatList, Text } from 'react-native'
import React, { useState, useMemo } from 'react'

// post card
import PostCard from '../card/PostCard'
// firebase
import { getPosts } from '../../api/firestore/post'

export default function PostsScreen() {
  const [dataPosts, setDataPosts] = useState([]);

  useMemo(() => {
    getPosts(setDataPosts)
  }, []);

  if(dataPosts.length === 0) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <Text className="text-xl font-itim">Tunggu bentar...</Text>
      </View>
    );
  }
  return (
    <View className="flex-1 bg-white">
      {/* posts */}
      <View className='mt-2'>
        <FlatList
          data={dataPosts}
          renderItem={({item}) => <PostCard item={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}