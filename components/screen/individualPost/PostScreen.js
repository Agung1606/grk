import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useMemo, useState } from 'react'
// styled
import { styled } from 'nativewind';
const StyledSafeAreaView = styled(SafeAreaView)
// icons
import { AntDesign } from '@expo/vector-icons';
// firebase
import { getSinglePost } from '../../../api/firestore/post';
// post card
import PostCard from "../../card/PostCard"

export default function PostScreen({ route, navigation }) {
    const postId = route?.params?.param;
    // route
    const goToPrevScreen = () => navigation.goBack();

    // state 
    const [dataPost, setDataPost] = useState({});

    useMemo(() => {
        getSinglePost(setDataPost, postId)
    }, [postId]);

  return (
    <StyledSafeAreaView className="flex-1 bg-white dark:bg-black">
      <View className="my-5 mx-3 flex-row items-center">
        <TouchableOpacity onPress={goToPrevScreen}>
          <AntDesign name="arrowleft" size={30} />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-[22px] font-bold">Post</Text>
      </View>
      <ScrollView>{dataPost.id && <PostCard item={dataPost} />}</ScrollView>
    </StyledSafeAreaView>
  );
}