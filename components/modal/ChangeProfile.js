import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { styled } from 'nativewind'
const StyledPressable = styled(Pressable)
// icons
import { EvilIcons } from '@expo/vector-icons'
// environment variable
import { DEFAULT_AVATAR } from '@env';
// pick image
import * as ImagePicker from "expo-image-picker";

export default function ChangeProfile({ setSelectedImg, closeModal }) {

  // 
  const handleNewProfile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [2, 2],
        quality: 1,
    });
    
    if(result.canceled) {
      alert('You did not select any image.');
    } else {
      setSelectedImg(result.assets[0].uri);
    }
    closeModal();
  };

  const handleDeleteProfile = () => {
    setSelectedImg(DEFAULT_AVATAR);
    closeModal();
  };
  return (
    <View className="p-4 space-y-6">
      <StyledPressable
        onPress={handleNewProfile}
        className="flex-row items-center space-x-1 active:bg-gray-200 p-2 rounded-lg"
      >
        <EvilIcons name="image" size={35} />
        <Text className="text-lg">New profile picture</Text>
      </StyledPressable>
      <StyledPressable
        onPress={handleDeleteProfile}
        className="flex-row items-center space-x-1 active:bg-gray-200 p-2 rounded-lg"
      >
        <EvilIcons name="trash" size={35} color={"red"} />
        <Text className="text-lg text-red-500">Delete profile</Text>
      </StyledPressable>
    </View>
  );
}