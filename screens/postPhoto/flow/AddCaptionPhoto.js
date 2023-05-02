import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react'

import { useSelector } from 'react-redux';

// firebase
import { uploadPostImg } from '../../../api/storage'
// icon
import { AntDesign } from '@expo/vector-icons'
// progress
import * as Progress from 'react-native-progress'

export default function AddCaptionPhoto({ navigation, route }) {
    // global state
    const user = useSelector((state) => state.auth.user);

    // data from route
    const data = route?.params?.param;

    // route
    const goToPrevScreen = () => navigation.navigate("ChoosePhoto");
    const goToPostsScreen = () => {
      navigation.navigate("ChoosePhoto");
      navigation.navigate("posts");
    }

    // useState hook
    const [height, setHeight] = useState(0); // for textinput auto grow
    const [caption, setCaption] = useState(''); // for caption
    const [startUpload, setStartUpload] = useState(false); // for loading animation when loading to upload
    const [progress, setProgress] = useState(0); // loading post photo

    const handlePostToFirebase = async () => {
      let object = {
        caption,
        date: new Date().toLocaleDateString(),
        userId: user.id,
        username: user.username,
        userProfileImg: user.profileImg,
        likesCount: 0,
        commentsCount: 0
      };
      uploadPostImg({
        file: data.selectedImg.uri,
        name: data.selectedImg.name,
        setStartUpload,
        setProgress,
        setCaption,
        goToPostsScreen,
        object,
      });
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
            {startUpload ? (
              <Progress.Pie progress={progress} size={30} />
            ) : (
              <TouchableOpacity onPress={handlePostToFirebase}>
                <AntDesign name="check" size={30} color={"#4169e1"} />
              </TouchableOpacity>
            )}
          </View>
          <View className="flex-row items-center space-x-[15px] my-10 mx-4">
            <Image
              source={{ uri: data.selectedImg.uri }}
              className="w-[60px] h-[60px]"
              resizeMode="cover"
            />
            <TextInput
              placeholder="Write a caption..."
              className={`bg-inherit flex-1 h-[${height}px] text-[14px] mb-4`}
              multiline={true}
              onContentSizeChange={(e) =>
                setHeight(e.nativeEvent.contentSize.height)
              }
              value={caption}
              onChangeText={(caption) => setCaption(caption)}
            />
          </View>
        </SafeAreaView>
      );
}