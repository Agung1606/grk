import { View, Text, FlatList } from "react-native";
import React, { useMemo, useState } from "react";
import { styled } from "nativewind";
const StyledView = styled(View);
// icon
import { MaterialCommunityIcons } from "@expo/vector-icons";
// firebase
import { getUserTweets } from "../../api/firestore/tweet";
// widget
import TweetCard from "../card/TweetCard";

export default function ProfileTweetsScreen({ userId }) {
  // all tweets
  const [dataTweets, setDataTweets] = useState([]);

  useMemo(() => {
    getUserTweets(setDataTweets, userId);
  }, []);

  return (
    <StyledView className="flex-1 bg-white dark:bg-black">
      {dataTweets.length === 0 ? (
        <View className="justify-center items-center">
          <MaterialCommunityIcons name="emoticon-sad-outline" size={30} />
          <Text className="text-xl font-bold">No Posts</Text>
        </View>
      ) : (
        <FlatList
          scrollEnabled={false}
          data={dataTweets}
          renderItem={({ item }) => <TweetCard item={item} />}
          keyExtractor={(item) => item.id}
        />
      )}
    </StyledView>
  );
}
