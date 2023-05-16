import { useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Avatar } from 'react-native-paper';
// icons
import { MaterialIcons } from '@expo/vector-icons'

export default function CommentsTweet({ closeModal, replyingTo, tweetId }) {
    const user = useSelector((state) => state.auth.user);
    const [height, setHeight] = useState(0); // for TextInput auto grow
    const [comment, setComment] = useState(''); // for comment value

    const handleComment = () => alert('Sending comment!')
  return (
    <View className="flex-1 px-4">
      {/* close and reply button */}
      <View className="flex-row justify-between items-center">
        <TouchableOpacity onPress={closeModal}>
          <MaterialIcons name="close" size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          className={`bg-[${
            !comment ? "#87CEFA" : "#3399FF"
          }] px-[16px] py-[6px] rounded-full`}
          disabled={!comment}
          onPress={handleComment}
        >
          <Text className="font-semibold text-white text-[16px]">Reply</Text>
        </TouchableOpacity>
      </View>
      {/* comment */}
      <View className="mt-8 flex-row gap-x-4">
        <View className="items-center space-y-4">
          <Avatar.Image source={{ uri: user.profileImg }} size={55} />
          <Text className="text-gray-500 text-xs">{comment.length}/500</Text>
        </View>
        <View className="flex-1 space-y-2">
          <Text>
            <Text className="text-gray-500">Replying to</Text>{" "}
            <Text className="text-[#3399FF]">{replyingTo}</Text>
          </Text>
          <ScrollView>
            <TextInput
              placeholder="Tweet your reply"
              className={`text-lg h-[${height}px]`}
              multiline
              maxLength={500}
              autoFocus={true}
              onContentSizeChange={(e) =>
                setHeight(e.nativeEvent.contentSize.height)
              }
              value={comment}
              onChangeText={(comment) => setComment(comment)}
            />
          </ScrollView>
        </View>
      </View>
    </View>
  );
}