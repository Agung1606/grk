import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useMemo, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar } from "react-native-paper";
import { styled } from "nativewind";
const StyledSafeAreaView = styled(SafeAreaView);
// icon
import { AntDesign, MaterialIcons, FontAwesome } from "@expo/vector-icons";
// bottom modal
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CommentsTweet from "../../modal/CommentsTweet";
// firebase
import {
  getSingleTweet,
  getLikesByUser,
  likeTweet,
  getComments,
} from "../../../api/firestore/tweet";
import { useSelector } from "react-redux";

export default function TweetScreen({ route, navigation }) {
  const tweetId = route?.params?.param;
  // loggedin user id
  const loggedInUserId = useSelector((state) => state.auth.user.id);
  // route
  const goToPrevScreen = () => navigation.goBack();
  // state
  const [dataTweet, setDataTweet] = useState({});

  // likes
  const [isLiked, setIsLiked] = useState(false);
  const handleLike = () => {
    likeTweet({
      userId: loggedInUserId,
      tweetId,
      isLiked,
      likesCount: dataTweet.likesCount,
    });
  };

  // comments
  const [ dataComments, setDataComments ] = useState([]);

  // modal comment config
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["95%"], []);
  const openModal = () => bottomSheetModalRef.current.present();
  const closeModal = () => bottomSheetModalRef.current.dismiss();

  useMemo(() => {
    getSingleTweet(setDataTweet, tweetId);
    getComments({ tweetId, setDataComments });
    getLikesByUser({ userId: loggedInUserId, tweetId, setIsLiked });
  }, [tweetId]);

  return (
    <StyledSafeAreaView className="flex-1 bg-white dark:bg-black">
      <View className="my-5 mx-3 flex-row items-center">
        <TouchableOpacity onPress={goToPrevScreen}>
          <AntDesign name="arrowleft" size={30} />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-[22px] font-bold">Tweet</Text>
      </View>
      {/* tweet post */}
      {dataTweet.id && (
        <FlatList
          // the tweet card
          ListHeaderComponent={() => (
            <>
              {/* wrapper */}
              <View className="px-2">
                {/* username and more vertical icon */}
                <View className="flex-row items-center gap-x-[16px] mb-2">
                  <TouchableOpacity>
                    <Avatar.Image
                      source={{ uri: dataTweet.userProfileImg }}
                      size={55}
                    />
                  </TouchableOpacity>
                  <View className="flex-1 flex-row justify-between items-center">
                    <View>
                      <Text className="text-lg font-bold">
                        {dataTweet.username}
                      </Text>
                      <Text className="text-[10px]">{dataTweet.date}</Text>
                    </View>
                    <TouchableOpacity>
                      <MaterialIcons name="more-vert" size={22} />
                    </TouchableOpacity>
                  </View>
                </View>
                {/* tweet */}
                <View>
                  <Text className="text-[16px] tracking-wider">
                    {dataTweet.tweet}
                  </Text>
                </View>
                {/* like, comment and share icon container*/}
                <View className="mt-2 px-6 py-4">
                  {/* wrapper */}
                  <View className="flex-row justify-between items-center">
                    {/* like */}
                    <View className="flex-row items-center gap-x-1">
                      <TouchableOpacity onPress={handleLike}>
                        {isLiked ? (
                          <FontAwesome color={"red"} name="heart" size={24} />
                        ) : (
                          <FontAwesome
                            color={"#7d7d7d"}
                            name="heart-o"
                            size={24}
                          />
                        )}
                      </TouchableOpacity>
                      <Text className="text-[#7d7d7d]">
                        {dataTweet.likesCount}
                      </Text>
                    </View>
                    {/* comment */}
                    <View className="flex-row items-center gap-x-1">
                      <TouchableOpacity onPress={openModal}>
                        <FontAwesome
                          color={"#7d7d7d"}
                          name="comment-o"
                          size={24}
                        />
                      </TouchableOpacity>
                      <Text className="text-[#7d7d7d]">
                        {dataTweet.commentsCount}
                      </Text>
                    </View>
                    {/* share */}
                    <TouchableOpacity>
                      <MaterialIcons
                        name="ios-share"
                        size={25}
                        color={"#7d7d7d"}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View className="h-[1px] bg-gray-600 mx-2 mb-4" />
            </>
          )}
          // list comment
          data={dataComments}
          renderItem={({ item }) => (
            <>
              <View className="m-2 flex-row items-center space-x-2">
                <TouchableOpacity onPress={() => alert("go to user'profile ")}>
                  <Avatar.Image
                    size={30}
                    source={{ uri: item.userProfileImg }}
                  />
                </TouchableOpacity>
                <View>
                  <Text className="text-[13px] text-gray-400">{item.username}</Text>
                  <Text>{item.comment}</Text>
                </View>
              </View>
              <View className="h-[1px] bg-gray-600 mx-2 mb-4" />
            </>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
      >
        <CommentsTweet
          closeModal={closeModal}
          replyingTo={dataTweet.username}
          tweetId={tweetId}
          commentsCount={dataTweet.commentsCount}
        />
      </BottomSheetModal>
    </StyledSafeAreaView>
  );
}
