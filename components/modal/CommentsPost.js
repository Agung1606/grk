import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import React, { useMemo, useState } from 'react'
import { TextInput, Avatar } from 'react-native-paper';
// icons
import { MaterialIcons } from '@expo/vector-icons';
// firebase
import { commentPost, getComments } from '../../api/firestore/post'
import { useSelector } from 'react-redux';

export default function CommentsPost({ onPress, postId, commentsCount }) {
  // loggedin user's data
  const user = useSelector((state) => state.auth.user);

  const [height, setHeight] = useState(0); // for TextInput auto grow
  const [comment, setComment] = useState(""); // for comment value

  // data
  const [dataComments, setDataComments] = useState([]);

  useMemo(() => {
    getComments({ postId, setDataComments })
  }, []);

  // handle
  const handleCommentPost = () => {
    commentPost({
      userId: user.id,
      postId,
      username: user.username,
      userProfileImg: user.profileImg,
      comment,
      date: new Date().toLocaleDateString(),
      commentsCount,
      setComment,
    });
  };
  return (
    <View className="px-2">
      <View className="flex-row justify-between items-center px-3 pb-2 border-b border-gray-600">
        <Text className="text-xl font-bold">Comments</Text>
        <MaterialIcons name="close" size={24} onPress={onPress} />
      </View>
      <View className="pr-2 my-2 flex-row items-center gap-x-[14px]">
        <TextInput
          placeholder="Add a comment..."
          underlineColor="transparent"
          activeUnderlineColor="#3bace2"
          className={`flex-1 h-[${height}px] bg-gray-300`}
          multiline
          onContentSizeChange={(e) =>
            setHeight(e.nativeEvent.contentSize.height)
          }
          value={comment}
          onChangeText={(comment) => setComment(comment)}
        />
        <TouchableOpacity disabled={!comment} onPress={handleCommentPost}>
          <MaterialIcons name="send" size={26} />
        </TouchableOpacity>
      </View>
      {/* user comment */}
      {dataComments && (
        <FlatList 
          data={dataComments}
          renderItem={({ item }) => (
            <Text>{item.comment}</Text>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}