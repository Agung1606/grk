import { View, Text, Pressable, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useMemo, useState } from "react";
import { FlatGrid } from "react-native-super-grid";
import { styled } from "nativewind";
const StyledSafeAreaView = styled(SafeAreaView);
// icons
import { FontAwesome } from "@expo/vector-icons";
// component
import Search from "../components/common/Search";
// firebase
import { getExplorePost } from "../api/firestore/post";

export default function ExploreScreen({ navigation }) {
  const [openSearch, setOpenSearch] = useState(false);
  const open = () => setOpenSearch(true);
  const close = () => setOpenSearch(false);

  // state
  const [postsData, setPostsData] = useState([]);
  const [limitNum, setLimit] = useState(50);
  const addedLimit = () => setLimit((prev) => prev + 80);

  useMemo(() => {
    getExplorePost({ setPostsData, limitNum });
  }, [limitNum]);


  return (
    <StyledSafeAreaView className="flex-1 bg-white dark:bg-black">
      {/* search bar */}
      {!openSearch && (
        <View>
          <Pressable
            onPress={open}
            className="mx-2 mt-2 px-4 bg-gray-200 h-[40px] rounded-[8px] flex-row items-center space-x-2"
          >
            <FontAwesome name="search" size={18} color={"#b5b5b5"} />
            <Text className="text-[16px] text-[#b5b5b5]">Search</Text>
          </Pressable>
        </View>
      )}

      {openSearch ? (
        <Search close={close} />
      ) : (
        <View className="mt-3">
          <FlatGrid
            itemDimension={95}
            spacing={2}
            data={postsData}
            renderItem={({ item }) => (
              <View className="h-[120px]">
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("PostScreen", { param: item.id })
                  }
                >
                  <Image
                    source={{ uri: item.imgPost }}
                    resizeMode="cover"
                    className="w-full h-full"
                  />
                </TouchableOpacity>
              </View>
            )}
            onEndReached={addedLimit}
          />
        </View>
      )}
    </StyledSafeAreaView>
  );
}
