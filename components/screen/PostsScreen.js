import { View, FlatList, ActivityIndicator } from 'react-native'
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
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#4169e1" />
      </View>
    );
  }
  return (
    <View className="flex-1 bg-white">
      {/* posts */}
      <View className='mt-2'>
        {dataPosts && (
          <FlatList
            data={dataPosts}
            renderItem={({item}) => <PostCard item={item} />}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </View>
  );
}