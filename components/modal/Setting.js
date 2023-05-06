import { View, Text, Pressable } from "react-native";
import React from "react";
// nativewind
import { styled } from "nativewind";
const StyledPressable = styled(Pressable);
// icon
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
// redux
import { useDispatch } from "react-redux";
import { setLogout } from "../../state/authSlice";

export default function Setting() {
  const dispatch = useDispatch();
  const handleLogout = () => dispatch(setLogout());

  return (
    <View className="px-2">
      {/* activity */}
      <StyledPressable
        onPress={() => alert("Open activity screen")}
        className="my-1 active:bg-gray-600 rounded-lg"
      >
        <View className="flex-row items-center p-2 space-x-4">
          <MaterialCommunityIcons name="clock-time-five-outline" size={30} />
          <Text className="text-white text-[20px]">Your activity</Text>
        </View>
      </StyledPressable>
      {/* archive */}
      <StyledPressable
        onPress={() => alert("Open archive screen")}
        className="my-1 active:bg-gray-600 rounded-lg"
      >
        <View className="flex-row items-center p-2 space-x-4">
          <Entypo name="back-in-time" size={30} />
          <Text className="text-white text-[20px]">Archive</Text>
        </View>
      </StyledPressable>
      {/* logout */}
      <StyledPressable
        onPress={handleLogout}
        className="my-1 active:bg-gray-600 rounded-lg"
      >
        <View className="flex-row items-center p-2 space-x-4">
          <MaterialCommunityIcons name="logout" size={30} color={"red"} />
          <Text className="text-red-500 text-[20px]">Logout</Text>
        </View>
      </StyledPressable>
    </View>
  );
}
