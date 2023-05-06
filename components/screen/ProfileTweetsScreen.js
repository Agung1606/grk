import { View, Text, FlatList } from 'react-native'
import React, { useMemo, useState } from 'react'
// icon
import { MaterialCommunityIcons } from "@expo/vector-icons";
// firebase
import { getUserTweets } from '../../api/firestore/tweet';
// widget
import TweetCard from '../card/TweetCard';

export default function ProfileTweetsScreen({route}) {
  const userId = route?.params?.param;

  // all tweets
  const [ dataTweets, setDataTweets ] = useState([]);

  useMemo(() => {
    getUserTweets(setDataTweets, userId);
  }, [])

  if(dataTweets.length === 0) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <MaterialCommunityIcons name="emoticon-sad-outline" size={30} />
        <Text className="text-xl font-bold">No Tweets</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={dataTweets}
        renderItem={({ item }) => <TweetCard item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}