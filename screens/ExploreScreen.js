import { View, Text, Pressable, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useMemo, useState } from "react";
import { FlatGrid } from "react-native-super-grid";
// icons
import { FontAwesome } from "@expo/vector-icons";
// component
import Search from "../components/common/Search";
// firebase
import { getExplorePost } from "../api/firestore/post";

export default function ExploreScreen() {
  const [openSearch, setOpenSearch] = useState(false);
  const open = () => setOpenSearch(true);
  const close = () => setOpenSearch(false);

  // state
  const [postsData, setPostsData] = useState([]);

  useMemo(() => {
    getExplorePost({  setPostsData });
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* search bar */}
      {!openSearch && (
        <Pressable
          onPress={open}
          className="mx-2 mt-2 px-4 bg-gray-200 h-[40px] rounded-[8px] flex-row items-center space-x-2"
        >
          <FontAwesome name="search" size={18} color={"#b5b5b5"} />
          <Text className="text-[16px] text-[#b5b5b5]">Search</Text>
        </Pressable>
      )}

      {openSearch ? (
        <Search close={close} />
      ) : (
        <View className="mt-5 mx-2">
          <FlatGrid
            itemDimension={95}
            spacing={2}
            data={postsData}
            renderItem={({ item }) => (
              <View className="h-[120px]">
                <TouchableOpacity onLongPress={() => alert('agung ganteng')}>
                  <Image
                    source={{ uri: item.imgPost }}
                    resizeMode="cover"
                    className="w-full h-full"
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
