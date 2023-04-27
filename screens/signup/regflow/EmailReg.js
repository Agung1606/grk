// react
import { View, Text, Pressable } from 'react-native'
import { TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'

// icon
import { AntDesign } from '@expo/vector-icons'

// form
import { Formik } from 'formik'
import * as yup from 'yup'

// form config validation
const emailValidate = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email address is required"),
});

export default function EmailReg({ navigation }) {
  // route
  const goToLogin = () => navigation.navigate('LoginScreen');
  
  // handle
  const handleEmailSubmit = (values) => {
    const newData = {
      email: values.email
    }
    navigation.navigate('NameReg', {
      param: newData
    });
  };
  
  return (
    <SafeAreaView className="relative flex-1 bg-white">
      <View className="mt-8 mx-3">
        <Pressable onPress={goToLogin}>
          <AntDesign name="arrowleft" size={30} color="#010026" />
        </Pressable>
      </View>
      <View className="mt-6 mx-3">
        <Text className="text-3xl font-semibold">What's your email?</Text>
        <Text className="tracking-wide mt-2 pr-8">
          Please enter your frequently used email, your email will be used if at
          any time you forget your password.
        </Text>
      </View>
      {/* form */}
      <View className="mt-8 mx-3">
        <Formik
          initialValues={{ email: "" }}
          validationSchema={emailValidate}
          onSubmit={handleEmailSubmit}
        >
          {({ handleChange, handleSubmit, values, errors, isValid }) => (
            <>
              {/* email */}
              <View>
                <TextInput
                  placeholder="Email"
                  className="h-[50px] mb-2 bg-indigo-50 rounded-lg"
                  activeUnderlineColor="#3bace2"
                  underlineColor="transparent"
                  value={values.email}
                  onChangeText={handleChange("email")}
                />
                {errors.email && (
                  <Text className="text-red-500 mb-1">{errors.email}</Text>
                )}
              </View>
              {/* button submit */}
              <Pressable
                className="bg-[#3bace2] active:bg-[#229dd6] py-[10px] rounded-lg"
                disabled={!isValid}
                onPress={handleSubmit}
              >
                <Text className="text-center text-white font-semibold">
                  Next
                </Text>
              </Pressable>
            </>
          )}
        </Formik>
      </View>
      {/* already have an account */}
      <View className="absolute bottom-8 w-full">
        <Pressable onPress={goToLogin}>
          <Text className="text-center font-bold text-blue">
            Sudah punya akun?
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}