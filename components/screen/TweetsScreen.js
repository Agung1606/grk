import { View, FlatList, Text } from "react-native";
import React, { useState, useMemo } from "react";
import { styled } from "nativewind";
const StyledView = styled(View)

// firebase
import { getTweets } from "../../api/firestore/tweet"

// tweet card
import TweetCard from "../card/TweetCard";

export default function TweetsScreen() {
  const [dataTweets, setDataTweets] = useState([]);

  useMemo(() => {
    getTweets(setDataTweets);
  }, []);

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
      <View className="mt-2">
        {dataTweets && (
          <FlatList 
            data={dataTweets}
            renderItem={({ item }) => <TweetCard item={item}/>}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </StyledView>
  );
}
