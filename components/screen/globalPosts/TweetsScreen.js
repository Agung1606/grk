import { View, FlatList, Text, Pressable, RefreshControl } from "react-native";
import React, { useState, useMemo } from "react";
import { styled } from "nativewind";
const StyledView = styled(View)

// route
import { useNavigation } from "@react-navigation/native";
// firebase
import { getTweets } from "../../../api/firestore/tweet"

// tweet card
import TweetCard from "../../card/TweetCard";
// redux
import { useSelector } from "react-redux";
import { Avatar } from "react-native-paper";

export default function TweetsScreen() {
  // route
  const navigation = useNavigation();
  const goToProfileScreen = () => navigation.navigate("ProfileScreen")
  const goToPostTweetScreen = () => navigation.navigate("PostTweetScreen")
  // loggedin user data
  const loggedInUserProfile = useSelector((state) => state.auth.user.profileImg);
  // data tweets post
  const [dataTweets, setDataTweets] = useState([]);

  useMemo(() => {
    getTweets(setDataTweets);
  }, []);

  
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => alert('Refecth data!');

  if (dataTweets.length === 0) {
    return (
      <StyledView className="flex-1 bg-white dark:bg-black justify-center items-center">
        <Text className="text-xl font-itim">Tunggu bentar...</Text>
      </StyledView>
    );
  }

  return (
    <StyledView className="flex-1 bg-white dark:bg-black">
      {/* tweets */}
      <FlatList
        ListHeaderComponent={
          <>
            {/* card */}
            <View className="m-2 px-[6px] py-4 bg-[#f0f0f0] dark:bg-[#252425] rounded-lg shadow-md">
              {/* top */}
              <View className="flex-row items-center space-x-2">
                <Pressable onPress={goToProfileScreen}>
                  <Avatar.Image
                    source={{ uri: loggedInUserProfile }}
                    size={40}
                  />
                </Pressable>
                <Pressable
                  onPress={goToPostTweetScreen}
                  className="flex-1 bg-[#e0e0e0] dark:bg-[#333333] active:bg-gray-200 p-2 rounded-2xl"
                >
                  <Text className="text-[17px] text-[#b9b9b9] font-semibold">
                    Apa yang kamu pikirkan?
                  </Text>
                </Pressable>
              </View>
            </View>
          </>
        }
        data={dataTweets}
        renderItem={({ item }) => <TweetCard item={item} />}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </StyledView>
  );
}
