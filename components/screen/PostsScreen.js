import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'

import { useSelector } from 'react-redux';

import * as ImagePicker from 'expo-image-picker'
import { uploadPostImg } from '../../api/storage';
import { postingPhoto } from '../../api/firestore/post';

export default function PostsScreen() {
  const user = useSelector((state) => state.auth.user);

  const [image, setImage] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.assets[0])

    if (!result.canceled) {
      uploadPostImg(result.assets[0].uri, setImgPost);
      // setImage(result.assets[0].uri);
    }

  };

  const [imgPost, setImgPost] = useState(null);
  const handleFirebase = async () => {
    let object = {
      imgPost,
      timeStamp: Date.now(),
      userId: user.id,
      username: user.username,
      userProfileImg: user.profileImg,
    };
    postingPhoto(object);

    // setImage(null)
    // setImgPost(null);
  };
  return (
    <View className="flex-1 bg-white justify-center items-center">
      <Button title='Choose photo' onPress={pickImage} />
      <Button title='Post to firebase' onPress={handleFirebase} />
    </View>
  );
}