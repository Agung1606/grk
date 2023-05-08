// react
import { View, Text, Pressable, ActivityIndicator, Image } from 'react-native'
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from 'react'
// toast
import Toast from 'react-native-toast-message'
// form
import { Formik } from 'formik';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../state/authSlice';
// firebase
import { LoginAPI } from '../api/auth';

export default function LoginScreen({ navigation }) {
  // redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // route
  const goToSignUp = () => navigation.navigate("SignUpRoute");

  // useState hooks
  const [hidePassword, setHidePassword] = useState(true)
  const [loading, setLoading] = useState(false)

  // handle
  const handleHidePassword = () => setHidePassword(!hidePassword)
  const handleLogin = async (values, onSubmitProps) => {
    try {
      setLoading(true);
      let res = await LoginAPI(dispatch, values.email, values.password);
      dispatch(setToken({ token: res?.user.accessToken }));
      setLoading(false);
      onSubmitProps.resetForm();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error.message.replace("Firebase: Error", ""),
      });
      setLoading(false);
    }
  };

  // common style
  const inputStyle = "h-[50px] mb-2 bg-indigo-50 rounded-lg";
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="relative flex-1 flex-col justify-center items-center">
        <Text className="text-5xl font-itim text-deep-blue">G297K</Text>
        {/* form container */}
        <View className="w-[85%] h-auto mt-4">
          {/* form */}
          <Formik
            initialValues={{
              email: user?.email,
              password: "",
            }}
            onSubmit={handleLogin}
          >
            {({ handleChange, handleSubmit, values }) => (
              <View>
                {/* username */}
                <TextInput
                  placeholder="Email"
                  className={inputStyle}
                  activeUnderlineColor="#3bace2"
                  underlineColor="transparent"
                  value={values.email}
                  onChangeText={handleChange("email")}
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
                  value={values.password}
                  onChangeText={handleChange("password")}
                />
                {/* button submit */}
                <Pressable
                  onPress={handleSubmit}
                  className="bg-[#3bace2] active:bg-[#229dd6] mt-2 py-[10px] rounded-lg"
                >
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
        <View className="absolute bottom-4 items-center">
          <View className="flex-row space-x-1">
            <Text>Belum punya akun?</Text>
            <Pressable onPress={goToSignUp}>
              <Text className="text-blue">Daftar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}