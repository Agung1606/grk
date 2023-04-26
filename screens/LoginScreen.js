// react
import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from 'react'

// form
import { Formik } from 'formik';

export default function LoginScreen({ navigation }) {
  // route
  const goToSignUp = () => navigation.navigate('SignUp')

  // useState hooks
  const [hidePassword, setHidePassword] = useState(true)
  const [loading, setLoading] = useState(false)

  // useState hooks handle
  const handleHidePassword = () => setHidePassword(!hidePassword)

  // common style
  const inputStyle = "h-[50px] mb-2 bg-indigo-50 rounded-lg";
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="relative flex-1 flex-col justify-center items-center">
        <Text className="text-5xl font-itim text-deep-blue">G297K</Text>
        {/* form container */}
        <View className="w-[85%] h-auto mt-4">
          {/* form */}
          <Formik>
            {() => (
              <View>
                {/* username */}
                <TextInput
                  placeholder="Username"
                  className={inputStyle}
                  activeUnderlineColor="#3bace2"
                  underlineColor="transparent"
                />
                {/* password */}
                <TextInput
                  placeholder="Password"
                  className={inputStyle}
                  activeUnderlineColor="#3bace2"
                  underlineColor="transparent"
                  secureTextEntry={hidePassword}
                  right={
                    <TextInput.Icon
                      onPress={handleHidePassword}
                      icon={hidePassword ? "eye-off" : "eye"}
                    />
                  }
                />
                {/* button submit */}
                <Pressable className="bg-[#3bace2] active:bg-[#229dd6] mt-2 py-[10px] rounded-lg">
                  <Text className="text-center text-white font-semibold">
                    {loading ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      "Login"
                    )}
                  </Text>
                </Pressable>
              </View>
            )}
          </Formik>
        </View>
        {/* forgot password */}
        <Pressable onPress={() => alert("Forgot password")}>
          <Text className="mt-8 text-blue cursor-pointer">Lupa Password?</Text>
        </Pressable>
        {/* does not have an account yet? */}
        <View className="absolute bottom-8 flex-row space-x-1">
          <Text>Belum punya akun?</Text>
          <Pressable onPress={goToSignUp}>
            <Text className="text-blue">Daftar</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}