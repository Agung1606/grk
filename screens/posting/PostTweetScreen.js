import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar } from 'react-native-paper'
import React, { useState} from 'react'

// global state
import { useSelector } from 'react-redux'

// icons
import { MaterialIcons } from '@expo/vector-icons'

// firebase
import { postingTweet } from '../../api/firestore/tweet'

export default function PostTweetScreen({ navigation }) {
    // route
    const goToPrevScreen = () => navigation.goBack();
    const goToTweetsScreen = () => navigation.navigate("tweets");
    // logged in user data
    const user = useSelector((state) => state.auth.user);
    // useState hooks
    const [height, setHeight] = useState(0) // for Text Input auto grow
    const [ tweet, setTweet ] = useState("") // tweet value that we will upload to firestore

    // fire
    const handleTweetToFirebase = () => {
      let object = {
        userId: user.id,
        username: user.username,
        date: new Date().toLocaleDateString(),
        userProfileImg: user.profileImg,
        tweet,
        likesCount: 0,
        commentsCount: 0,
      };
      postingTweet({object, setTweet});
      goToTweetsScreen();
    };
  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      {/* close and tweet button */}
      <View className="flex-row justify-between items-center mt-6">
        <TouchableOpacity onPress={goToPrevScreen}>
          <MaterialIcons name="close" size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#3399ff] px-[16px] py-[6px] rounded-full"
          onPress={handleTweetToFirebase}
          disabled={!tweet}
        >
          <Text className="font-semibold text-white text-[16px]">Tweet</Text>
        </TouchableOpacity>
      </View>
      {/* tweet */}
      <View className="mt-8 flex-row gap-x-4">
        <View className="items-center space-y-2">
          <Avatar.Image source={{ uri: user.profileImg }} size={55} />
          <Text className="text-gray-500 text-xs">{tweet.length}/2000</Text>
        </View>
        <View className="flex-1">
          <ScrollView className="mb-[85px]">
            <TextInput
              placeholder="What's happening?"
              className={`h-[${height}px] text-[16px]`}
              multiline={true}
              maxLength={2000}
              onContentSizeChange={(e) =>
                setHeight(e.nativeEvent.contentSize.height)
              }
              autoFocus={true}
              value={tweet}
              onChangeText={(tweet) => setTweet(tweet)}
            />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}