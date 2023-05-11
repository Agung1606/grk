import { View, FlatList, Text } from 'react-native'
import React, { useState, useMemo } from 'react'
import { styled } from 'nativewind'
const StyledView = styled(View);
// post card
import PostCard from '../card/PostCard'
// firebase
import { getPosts } from '../../api/firestore/post'

export default function PostsScreen() {
  const [dataPosts, setDataPosts] = useState([]);

  useMemo(() => {
    getPosts(setDataPosts);
  }, []);

  if (dataPosts.length === 0) {
    return (
      <StyledView className="flex-1 bg-white dark:bg-black justify-center items-center">
        <Text className="text-xl font-itim">Tunggu bentar...</Text>
      </StyledView>
    );
  }
  return (
    <StyledView className="flex-1 bg-white dark:bg-black">
      {/* posts */}
      <FlatList
        data={dataPosts}
        renderItem={({ item }) => <PostCard item={item} />}
        keyExtractor={(item) => item.id}
      />
    </StyledView>
  );
}