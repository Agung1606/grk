import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react'

import { useSelector } from 'react-redux';

// firebase
import { postingPhoto } from '../../../api/firestore/post'
import { uploadPostImg } from '../../../api/storage'

// icon
import { AntDesign } from '@expo/vector-icons'

export default function AddCaptionPhoto({ navigation, route }) {
    // global state
    const user = useSelector((state) => state.auth.user);

    // data from route
    const data = route?.params?.param;
    const goToPrevScreen = () => navigation.navigate("ChoosePhoto"); // route

    // useState hook
    const [imgPost, setImgPost] = useState('')
    const [caption, setCaption] = useState('');

    const [progress, setProgress] = useState(0); // loading post photo


    const handlePostToFirebase = async () => {
      uploadPostImg({file: data.selectedImg.uri, name: data.selectedImg.name, setImgPost, setProgress})
    //   // await postingPhoto(object);
    };
      
      return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="mx-4 mt-4 flex-row justify-between items-center">
        <View className="flex-row items-center gap-x-[45px]">
          <TouchableOpacity onPress={goToPrevScreen}>
            <AntDesign name="arrowleft" size={30} />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">New post</Text>
        </View>
        <TouchableOpacity onPress={handlePostToFirebase}>
          <AntDesign name="check" size={30} color={"#4169e1"} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
    //   let object = {
    //     imgPost,
    //     caption,
    //     timeStamp: Date.now(),
    //     userId: user.id,
    //     username: user.username,
    //     userProfileImg: user.profileImg,
    //   };