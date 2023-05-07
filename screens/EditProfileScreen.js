import { View, Text, Pressable} from 'react-native'
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
import { useDispatch, useSelector } from 'react-redux'
// firebase
import { editProfile } from '../api/firestore/user'

export default function EditProfileScreen({ navigation }) {
  // redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const goBack = () => navigation.goBack();

  const handleEditSubmit = async (values) => {
    editProfile({ userId: user.id, payload: values, dispatch });
    goBack();
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
        <Formik
          initialValues={{
            name: user.name,
            username: user.username,
            bio: user.bio,
          }}
          onSubmit={handleEditSubmit}
        >
          {({ handleChange, handleSubmit, values }) => (
            <>
              {/* top */}
              <View className="mt-2 mx-4 flex-row justify-between items-center">
                <View className="flex-row items-center space-x-9">
                  <StyledPressable className="active:bg-gray-300 p-1 rounded-full">
                    <AntDesign name="close" size={35} />
                  </StyledPressable>
                  <Text className="text-[22px] font-semibold">
                    Edit profile
                  </Text>
                </View>
                <StyledPressable
                  onPress={handleSubmit}
                  className="active:opacity-50"
                >
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
                  value={values.name}
                  onChangeText={handleChange("name")}
                />
                {/* username */}
                <TextInput
                  label="Username"
                  className="bg-transparent"
                  underlineColor="#808080"
                  activeUnderlineColor="#406aff"
                  value={values.username}
                  onChangeText={handleChange("username")}
                />
                {/* bio */}
                <TextInput
                  label="Bio"
                  className="bg-transparent"
                  underlineColor="#808080"
                  activeUnderlineColor="#406aff"
                  multiline={true}
                  value={values.bio}
                  onChangeText={handleChange("bio")}
                  maxLength={150}
                />
              </View>
            </>
          )}
        </Formik>
    </SafeAreaView>
  );
}