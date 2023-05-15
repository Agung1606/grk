import { View, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useRef, useMemo, useState } from 'react'
import { Avatar, TextInput } from 'react-native-paper'
import ChangeProfile from '../components/modal/ChangeProfile'
// icons
import { AntDesign } from '@expo/vector-icons'
// form
import { Formik } from 'formik'
// redux
import { useDispatch, useSelector } from 'react-redux'
// firebase
import { editProfileData, editProfileImg } from '../api/firestore/user'
// modal
import { BottomSheetModal } from '@gorhom/bottom-sheet'
// tailwind
import { styled } from "nativewind"
const StyledPressable = styled(Pressable)
// pickImage
import * as MediaLibrary from 'expo-media-library'
// toast
import Toast from "react-native-toast-message";

export default function EditProfileScreen({ navigation }) {
  // redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const goBack = () => navigation.goBack();

  // ====== seleceted Image =====
  const [status, requestPermission] = MediaLibrary.usePermissions(); // get permission
  if(status === null) requestPermission();
  const [selectedImg, setSelectedImg] = useState(null); // to put the image
  // conditional if user selected img or remove image
  const profileImg = selectedImg ? selectedImg : user.profileImg;

  // handle
  const handleEditProfileData = async (values) => {
    editProfileData({ userId: user.id, payload: values, dispatch });
    if(selectedImg !== null) {
      await editProfileImg({
        userId: user.id,
        profileImg: selectedImg,
        dispatch
      });
      Toast.show({
        type: "success",
        text1: "Berhasil ganti profile",
      });
    }
    goBack();
  };

  // change profile modal config
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["25%"], []);
  const openModal = () => bottomSheetModalRef.current.present();
  const closeModal = () => bottomSheetModalRef.current.dismiss();
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Formik
        initialValues={{
          name: user.name,
          username: user.username,
          bio: user.bio,
        }}
        onSubmit={handleEditProfileData}
      >
        {({ handleChange, handleSubmit, values }) => (
          <>
            {/* top */}
            <View className="mt-2 mx-4 flex-row justify-between items-center">
              <View className="flex-row items-center space-x-9">
                <StyledPressable
                  onPress={goBack}
                  className="active:bg-gray-300 p-1 rounded-full"
                >
                  <AntDesign name="close" size={35} />
                </StyledPressable>
                <Text className="text-[22px] font-semibold">Edit profile</Text>
              </View>
              <StyledPressable
                onPress={handleSubmit}
                className="active:opacity-50"
              >
                {/* {startUpload ? (
                  <Progress.Pie progress={progress} size={30} />
                ) : ( */}
                  <AntDesign name="check" size={33} color="#406aff" />
                {/* )} */}
              </StyledPressable>
            </View>
            {/* change profile */}
            <View className="py-10">
              <Pressable
                onPress={openModal}
                className="mx-auto items-center space-y-3"
              >
                <Avatar.Image source={{ uri: profileImg }} size={100} />
                <Text className="text-blue text-[16px]">
                  Change profile photo
                </Text>
              </Pressable>
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
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
      >
        <ChangeProfile
          setSelectedImg={setSelectedImg}
          closeModal={closeModal}
        />
      </BottomSheetModal>
    </SafeAreaView>
  );
}