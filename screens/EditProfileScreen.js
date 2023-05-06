import { View, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { Avatar, TextInput } from 'react-native-paper'

// tailwind
import { styled } from "nativewind"
const StyledPressable = styled(Pressable)

// icons
import { AntDesign } from '@expo/vector-icons'
// form
import { Formik } from 'formik'
// redux
import { useSelector } from 'react-redux'

export default function EditProfileScreen() {
    const user = useSelector((state) => state.auth.user);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Formik>
        {({}) => (
          <>
            {/* top */}
            <View className="mt-2 mx-4 flex-row justify-between items-center">
              <View className="flex-row items-center space-x-9">
                <StyledPressable className="active:bg-gray-300 p-1 rounded-full">
                  <AntDesign name="close" size={35} />
                </StyledPressable>
                <Text className="text-[22px] font-semibold">Edit profile</Text>
              </View>
              <StyledPressable className="active:opacity-50">
                <AntDesign name="check" size={33} color="#406aff" />
              </StyledPressable>
            </View>
            {/* change profile */}
            <View className="py-10">
              <StyledPressable className="mx-auto items-center space-y-3">
                <Avatar.Image source={{ uri: user.profileImg }} size={100} />
                <Text className="text-blue text-[16px]">
                  Change profile photo
                </Text>
              </StyledPressable>
            </View>
            {/* input */}
            <View className="mx-5">
              {/* name */}
              <TextInput
                label="Name"
                className="bg-transparent"
                underlineColor="#808080"
                activeUnderlineColor="#406aff"
                keyboardType='phone-pad'
              />
              {/* username */}
              <TextInput
                label="Username"
                className="bg-transparent"
                underlineColor="#808080"
                activeUnderlineColor="#406aff"
              />
            </View>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
}