import { View, FlatList, ActivityIndicator, Text } from "react-native";
import React, { useState, useMemo } from "react";

// firebase
import { getTweets } from "../../api/firestore/tweet"

// tweet card
import TweetCard from "../card/TweetCard";

export default function TweetsScreen() {
  const [dataTweets, setDataTweets] = useState([]);

  useMemo(() => {
    getTweets(setDataTweets);
  }, []);

  return (
    <View className="flex-1 bg-white">
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
    </View>
  );
}
