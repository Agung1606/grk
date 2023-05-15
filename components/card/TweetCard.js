import { View, Text, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import React, { useMemo, useState } from "react";
// styled
import { styled } from "nativewind";
const StyledView = styled(View)
// redux
import { useSelector } from "react-redux";
// icons
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
// firebase
import { getLikesByUser, likeTweet } from "../../api/firestore/tweet";
import { useNavigation } from "@react-navigation/native";

export default function TweetCard({ item }) {
  // loggedin user data
  const loggedInUserId = useSelector((state) => state.auth.user.id);
  // ==== useState hooks, user interaction config ====
  // tweet
  const [moreTweet, setMoreTweet] = useState(false);
  const handleMoreTweet = () => setMoreTweet(true);
  const longTweet =
    item.tweet.length > 550 && !moreTweet
      ? item.tweet.slice(0, 550)
      : item.tweet;

  // likes
  const [isLiked, setIsLiked] = useState(false);
  const handleLike = () => {
    likeTweet({
      userId: loggedInUserId,
      tweetId: item.id,
      isLiked,
      likesCount: item.likesCount,
    });
  };
  
  // route
  const navigation = useNavigation();
  const goToProfile = () => {
    if(item.userId === loggedInUserId) navigation.navigate("ProfileScreen");
    else navigation.navigate("VisitedProfileScreen", { param: { username: item.username, userId: item.userId } })
  };

  useMemo(() => {
    getLikesByUser({ userId: loggedInUserId, tweetId: item.id, setIsLiked });
  }, []);
  return (
    <StyledView className="p-2">
      <View className="flex-row gap-x-4">
        {/* profile */}
        <TouchableOpacity onPress={goToProfile}>
          <Avatar.Image source={{ uri: item.userProfileImg }} size={55} />
        </TouchableOpacity>
        {/* container */}
        <View className="flex-1">
          {/* username and date post */}
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center gap-x-2">
              <Text className="font-bold text-[15px]">{item.username}</Text>
              <Text className="text-[10px]">{item.date}</Text>
            </View>
            <TouchableOpacity>
              <MaterialIcons name="more-vert" size={22} />
            </TouchableOpacity>
          </View>
          {/* tweets */}
          <Text className="text-[14px]">
            {longTweet} {""}
            {item?.tweet?.length > 550 && !moreTweet && (
              <Text
                className="text-[16px] text-[#007fff] font-semibold"
                onPress={handleMoreTweet}
              >
                ...more
              </Text>
            )}
          </Text>
          {/* like, comment, and share */}
          <View className="mt-[10px] flex-row justify-between items-center">
            {/* like */}
            <View className="flex-row items-center gap-x-1">
              <TouchableOpacity onPress={handleLike}>
                {isLiked ? (
                  <FontAwesome name="heart" size={18} color={"red"} />
                ) : (
                  <FontAwesome name="heart-o" size={18} color="#7d7d7d" />
                )}
              </TouchableOpacity>
              <Text className="text-[#7d7d7d]">{item.likesCount}</Text>
            </View>
            {/* comment */}
            <View className="flex-row items-center gap-x-1">
              <TouchableOpacity>
                <FontAwesome name="comment-o" size={18} color="#7d7d7d" />
              </TouchableOpacity>
              <Text className="text-[#7d7d7d]">{item.commentsCount}</Text>
            </View>
            {/* share */}
            <TouchableOpacity>
              <MaterialIcons name="ios-share" size={20} color="#7d7d7d" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="h-[1px] bg-gray-600 mt-2" />
      {/* modal comment */}
    </StyledView>
  );
}
