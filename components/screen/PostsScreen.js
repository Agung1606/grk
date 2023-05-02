import { View, Text, Image, FlatList } from 'react-native'
import React, { useState, useMemo } from 'react'
import PostCard from '../widgets/PostCard';

import { useSelector } from 'react-redux';

// firebase
import { getPosts } from '../../api/firestore/post'

export default function PostsScreen() {
  const user = useSelector((state) => state.auth.user);

  const [dataPosts, setDataPosts] = useState([]);
  useMemo(() => {
    getPosts(setDataPosts)
  }, []);


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