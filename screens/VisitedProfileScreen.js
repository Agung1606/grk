import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useMemo, useState } from 'react'
// icons
import { AntDesign, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';
// navigation
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
// component
import ProfilePostsScreen from '../components/screen/ProfilePostsScreen';
import ProfileTweetsScreen from '../components/screen/ProfileTweetsScreen';
// firebase
import { getUser } from '../api/firestore/user';
import { toggleFollow, getFollowByUser } from '../api/firestore/user';
import { useSelector } from 'react-redux';

export default function VisitedProfileScreen({ route, navigation }) {
  const loggedInUserId = useSelector((state) => state.auth.user.id);
  // route
  const goBack = () => navigation.goBack();
  const {username, userId} = route?.params?.param;
  const [userData, setUserData] = useState({});

  // hooks
  const [isFollowers, setIsFollowers] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  console.log(isFollowers)
  console.log(isFollowing)

  const handleToggleFollow = () => {
    toggleFollow({ userId: loggedInUserId, otherId: userId, isFollowing})
  };
  
  useMemo(() => {
    getUser({ username, setUserData});
    getFollowByUser({ loggedInUserId, visitedUserId: userId, setIsFollowers, setIsFollowing });
  }, [username]);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-between items-center mx-[14px] mt-[6px] mb-[18px]">
        <View className="flex-row items-center space-x-10">
          <TouchableOpacity onPress={goBack} className="active:bg-gray-200 rounded-full p-2">
            <AntDesign name="arrowleft" size={30} />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">{userData.username}</Text>
        </View>
        <TouchableOpacity className="active:bg-gray-200 rounded-full p-2">
          <MaterialIcons name="more-vert" size={28} />
        </TouchableOpacity>
      </View>
      {/* profile and info */}
      <View className="flex-row justify-between items-center mx-[14px] space-x-4">
        <Avatar.Image source={{ uri: userData.profileImg }} size={90} />
        <View className="flex-1 flex-row justify-center items-center space-x-4">
          {/* followers */}
          <View className="items-center">
            <Text className="text-xl font-bold">0</Text>
            <Text>Followers</Text>
          </View>
          {/* following */}
          <View className="items-center">
            <Text className="text-xl font-bold">0</Text>
            <Text>Following</Text>
          </View>
        </View>
      </View>
      {/* name and bio */}
      <View className="mx-[20px] my-[2px]">
        <Text className="font-semibold font-itim">{userData.name}</Text>
        <Text>{userData.bio}</Text>
      </View>
      {/* BUTTON */}
      <View className="mx-[14px] my-2 flex-row justify-between items-center space-x-2">
        {/* follow and unfollow */}
        <TouchableOpacity onPress={handleToggleFollow} className="bg-blue w-1/2 py-1 rounded-lg">
          <Text className="text-[17px] text-center font-semibold">Follow</Text>
        </TouchableOpacity>
        {/* message */}
        <TouchableOpacity
          onPress={() => alert("Open message")}
          className="bg-gray-300 w-1/2 py-1 rounded-lg"
        >
          <Text className="text-[17px] text-center font-semibold">Message</Text>
        </TouchableOpacity>
      </View>
      {/* postingan photo and tweets */}
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12 },
          tabBarShowLabel: false,
          tabBarIndicatorStyle: {
            backgroundColor: "#808080",
          },
        }}
      >
        <Tab.Screen
          name="posts"
          component={ProfilePostsScreen}
          initialParams={{ param: userId }}
          options={{
            tabBarIcon: () => (
              <MaterialCommunityIcons name="dots-grid" size={25} />
            ),
          }}
        />
        <Tab.Screen
          name="tweets"
          component={ProfileTweetsScreen}
          initialParams={{ param: userId }}
          options={{
            tabBarIcon: () => <MaterialCommunityIcons name="bird" size={25} />,
            lazy: true,
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}