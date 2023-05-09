import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
// icons
import { FontAwesome } from "@expo/vector-icons";
// component
import Search from "../components/common/Search";

export default function ExploreScreen() {
  const [openSearch, setOpenSearch] = useState(false);
  const open = () => setOpenSearch(true);
  const close = () => setOpenSearch(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* search bar */}
      {!openSearch && (
        <Pressable
          onPress={open}
          className="mx-2 mt-2 px-4 bg-gray-200 h-[40px] rounded-[8px] flex-row items-center space-x-2"
        >
          <FontAwesome name="search" size={18} color={"#b5b5b5"} />
          <Text className="text-[16px] text-[#b5b5b5]">Search name</Text>
        </Pressable>
      )}

      {openSearch ? (
        <Search close={close} />
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text>Global image</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
