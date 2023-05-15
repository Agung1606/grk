// react 
import { View, Text, Pressable, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { TextInput } from "react-native-paper"
import React, { useState } from 'react'
// styled
import { styled } from 'nativewind'
const StyledSafeAreaView = styled(SafeAreaView);

// secret
import { DEFAULT_AVATAR } from '@env'

// toast
import Toast from 'react-native-toast-message'

// firebase
import { RegisterAPI } from '../../../api/auth'
import { postUserData } from '../../../api/firestore/user'

// form
import { Formik } from "formik"
import * as yup from "yup"

// redux
import { useDispatch } from "react-redux"
import { setToken } from "../../../state/authSlice"

const usernameValidate = yup.object().shape({
  username: yup.string().required("Username is required and must be unique"),
});

export default function UsernameReg({ route }) {
    // dispatch redux
    const dispatch = useDispatch();

    // data from route
    const data = route?.params?.param

    // useState hooks
    const [loading, setLoading] = useState(false)

    // handle
    const handleRegister = async (values, onSubmitProps) => {
      try {
        setLoading(true);
        let res = await RegisterAPI(data.email, data.password);
        postUserData({
          dispatch,
          email: data.email,
          name: values.username,
          username: values.username,
          profileImg: DEFAULT_AVATAR,
          bio: '',
        });
        dispatch(setToken({ token: res.user.accessToken }));
        setLoading(false);
        onSubmitProps.resetForm()
      } catch (error) {
        Toast.show({
          type: "error",
          text1: error.message.replace("Firebase: Error", ""),
        });
        setLoading(false);
      }
    };
    return (
      <StyledSafeAreaView className="flex-1 bg-white dark:bg-black relative">
        <View className="mt-6 mx-3">
          <Text className="text-3xl font-semibold">What's your username?</Text>
          <Text className="tracking-wide mt-2 pr-8">
            Please make your username unique from people around the world.
          </Text>
        </View>
        {/* form */}
        <View className="mt-8 mx-3">
          <Formik
            initialValues={{ username: "" }}
            validationSchema={usernameValidate}
            onSubmit={handleRegister}
          >
            {({ handleChange, handleSubmit, values, errors, isValid }) => (
              <>
                {/* username */}
                <View>
                  <TextInput
                    placeholder="Username"
                    underlineColor="transparent"
                    activeUnderlineColor="#3bace2"
                    className="mb-2 bg-indigo-50 rounded-lg"
                    value={values.username}
                    onChangeText={handleChange("username")}
                  />
                  {errors.username && (
                    <Text className="text-red-500">{errors.username}</Text>
                  )}
                </View>

                {/* submit button */}
                <Pressable
                  className="bg-[#3bace2] active:bg-[#229dd6] mt-2 py-[10px] rounded-lg"
                  disabled={!isValid}
                  onPress={handleSubmit}
                >
                  <Text className="text-center text-white font-semibold">
                    {loading ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      "Create account"
                    )}
                  </Text>
                </Pressable>
              </>
            )}
          </Formik>
        </View>
      </StyledSafeAreaView>
    );
}