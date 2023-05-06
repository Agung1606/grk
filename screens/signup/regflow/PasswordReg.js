// react
import { View, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-paper'
import React, { useState } from 'react'

// form
import { Formik } from 'formik'
import * as yup from 'yup'

// form validation config
const passwordValidate = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(6, ({ min }) => `Password must be at least ${min} chars`),
});

export default function PasswordReg({ navigation, route }) {
  // data from route
  const data = route?.params?.param

  // useState hooks
  const [hidePassword, setHidePassword] = useState(true)

  // handle
  const handleHidePassword = () => setHidePassword(!hidePassword);
  const handlePasswordSubmit = (values) => {
    const newData = {
      ...data,
      password: values.password
    }
    navigation.navigate('UsernameReg', { param: newData })
  };
    
  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <View className="mt-6 mx-3">
        <Text className="text-3xl font-semibold">Create a password</Text>
        <Text className="tracking-wide mt-2 pr-8">
          Create a password with at least 6 letters and numbers. It should be
          something others can't guess.
        </Text>
      </View>
      {/* form */}
      <View className="mt-8 mx-3">
        <Formik
          initialValues={{ password: '' }}
          validationSchema={passwordValidate}
          onSubmit={handlePasswordSubmit}
        >
          {({ handleChange, handleSubmit, values, errors, isValid }) => (
            <>
              {/* password */}
              <View>
                <TextInput
                  placeholder="Password"
                  underlineColor="transparent"
                  activeUnderlineColor="#3bace2"
                  secureTextEntry={hidePassword}
                  right={
                    <TextInput.Icon
                      onPress={handleHidePassword}
                      icon={hidePassword ? "eye-off" : "eye"}
                    />
                  }
                  className="mb-2 bg-indigo-50 rounded-lg"
                  value={values.password}
                  onChangeText={handleChange("password")}
                />
                {errors.password && (
                  <Text className="text-red-500">{errors.password}</Text>
                )}
              </View>

              {/* button submit */}
              <Pressable
                className="bg-[#3bace2] active:bg-[#229dd6] mt-2 py-[10px] rounded-lg"
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
    </SafeAreaView>
  );
}