// react
import { View, Text, Pressable, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";

// date picker
import DateTimePicker from "@react-native-community/datetimepicker";

// icons
import { AntDesign } from "@expo/vector-icons";

export default function BirthdayReg({ navigation, route }) {
  // route
  const goToLogin = () => navigation.navigate("LoginScreen");
  const goToNameReg = () => navigation.navigate("NameReg");

  // useState hooks
  const [date, setDate] = useState(new Date());
  const [isPickerShow, setIsPickerShow] = useState(false);

  // configuration date
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "Desember",
  ];
  const formatDate =
    date.getDate() + "-" + months[date.getMonth()] + "-" + date.getFullYear();

  // data from route
  const data = route?.params?.param;

  // handle
  const showPicker = () => setIsPickerShow(true);
  const onChange = (event, value) => {
    setDate(value);
    if (Platform.OS === "android") setIsPickerShow(false);
  };
  const handleDateSubmit = () => {
    const newData = {
        ...data,
        birthday: String(date),
    };
    navigation.navigate("PasswordReg", { param: newData });
  };
  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <View className="mt-8 mx-3">
        <Pressable onPress={goToNameReg}>
          <AntDesign name="arrowleft" size={30} color="#010026" />
        </Pressable>
      </View>
      <View className="mt-6 mx-3">
        <Text className="text-3xl font-semibold">What's your birthday?</Text>
        <Text className="tracking-wide mt-2 pr-8">
          Use your own birthday, even if this account is for a business, a pet
          or something else.
        </Text>
      </View>
      {/* form */}
      <View className="mt-8 mx-3">
        {!isPickerShow && (
          <Pressable
            onPress={showPicker}
            className="mb-2 bg-indigo-50 rounded-lg py-3 px-2"
          >
            <Text className="text-center tracking-wide text-xl font-itim">
              {formatDate}
            </Text>
          </Pressable>
        )}

        {/* date picker */}
        {isPickerShow && (
          <DateTimePicker
            value={date}
            mode={"date"}
            maximumDate={new Date()}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            is24Hour={true}
            onChange={onChange}
            className="flex-1 justify-center items-center"
          />
        )}

        {/* button submit */}
        <Pressable
          className="bg-[#3bace2] active:bg-[#229dd6] py-[10px] rounded-lg"
          onPress={handleDateSubmit}
        >
          <Text className="text-center text-white font-semibold">Next</Text>
        </Pressable>
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
