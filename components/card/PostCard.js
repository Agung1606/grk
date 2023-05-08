import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import React, { useRef, useMemo, useState } from "react";
import { Avatar } from "react-native-paper";
// comment
import CommentsPost from "../modal/CommentsPost";
// likes
import { TapGestureHandler } from "react-native-gesture-handler";
// redux
import { useSelector } from "react-redux";
// firebase
import { likePost, getLikesByUser } from "../../api/firestore/post";
// icons
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
// bottom modal
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { useNavigation } from "@react-navigation/native";

export default function PostCard({ item }) {
  // route
  const navigation = useNavigation();

  // logged in user data
  const user = useSelector((state) => state.auth.user);

  // ==== useState hooks, user interaction config ====
  // likes
  const [isLiked, setIsLiked] = useState(false);
  const handleLike = () => {
    likePost({ userId: user.id, postId: item.id, isLiked, likesCount: item.likesCount });
  };

  // caption
  const [moreCaption, setMoreCaption] = useState(false);
  const handleMoreCaption = () => setMoreCaption(!moreCaption); // toggle
  const longCaption =
    item.caption.length > 80 && !moreCaption ? item.caption.slice(0, 80) : item.caption;

  // modal comment config
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["65%", "90%"], []);
  const openModal = () => {
    bottomSheetModalRef.current.present();
  };
  const closeModal = () => bottomSheetModalRef.current.dismiss();

   useMemo(() => {
    getLikesByUser({ userId: user.id, postId: item.id, setIsLiked });
   }, []);

  return (
    <View className="mb-7 p-2">
      {/* user's photo and username */}
      <View className="flex-row justify-between items-center mb-2">
        <Pressable>
          <View className="flex-row items-center gap-x-3 px-2">
            <Avatar.Image size={30} source={{ uri: item.userProfileImg }} />
            <Text className="font-bold">{item.username}</Text>
          </View>
        </Pressable>
        <Pressable>
          <MaterialIcons name="more-vert" size={25} />
        </Pressable>
      </View>
      {/* user's post photo */}
      <View className="relative mx-auto mb-2">
        <TapGestureHandler numberOfTaps={2} onActivated={handleLike}>
          <View className="bg-black/20">
            <Image
              source={{ uri: item.imgPost }}
              style={{ width: 340, height: 340 }}
              resizeMode="contain"
            />
          </View>
        </TapGestureHandler>
        {/* love animation when user click like button */}
      </View>
      {/* like, comment, share icon */}
      <View className="flex-row justify-between items-center px-2 mb-2">
        <View className="flex-row gap-x-4">
          <TouchableOpacity onPress={handleLike}>
            {isLiked ? (
              <FontAwesome name="heart" size={25} color={"red"} />
            ) : (
              <FontAwesome name="heart-o" size={25} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={openModal}>
            <FontAwesome name="comment-o" size={25} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <MaterialIcons name="ios-share" size={25} />
        </TouchableOpacity>
      </View>
      {/* container */}
      <View className="px-2 space-y-1">
        {/* like count */}
        {item.likesCount > 0 && (
          <Text className="font-bold">{`${item.likesCount} ${
            item.likesCount > 1 ? "likes" : "like"
          }`}</Text>
        )}
        {/* username and caption */}
        {item.caption && (
          <Text>
            <Text className="font-extrabold">{item.username}</Text>{" "}
            <Text>
              {longCaption}{" "}
              {item.caption.length > 40 && !moreCaption && (
                <Text
                  onPress={handleMoreCaption}
                  className="text-[16px] text-gray-400"
                >
                  ...more
                </Text>
              )}
            </Text>
          </Text>
        )}
        {/* comment info */}
        {item.commentsCount > 0 && (
          <TouchableOpacity onPress={openModal}>
            <Text className="text-[16px] text-gray-400">
              {`View all ${item.commentsCount} ${
                item.commentsCount > 1 ? "comments" : "comment"
              }`}
            </Text>
          </TouchableOpacity>
        )}
        {/* post date */}
        <Text className="text-[11px] text-gray-400">{item.date}</Text>
      </View>
      {/* comment bottom modal */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
      >
        <CommentsPost
          onPress={closeModal}
          postId={item.id}
          commentsCount={item.commentsCount}
        />
      </BottomSheetModal>
    </View>
  );
}
