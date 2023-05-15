import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useMemo, useState } from 'react'
// icons
import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
// component
import ProfilePostsScreen from '../components/screen/userPosts/ProfilePostsScreen';
import ProfileTweetsScreen from '../components/screen/userPosts/ProfileTweetsScreen';
// firebase
import { getUser } from "../api/firestore/user";
import {
  toggleFollow,
  getFollowByUserVisitedScreen,
} from "../api/firestore/user";
import { useSelector } from "react-redux";

const tabs = [
  {
    name: "posts",
    iconName: "dots-grid",
  },
  {
    name: "tweets",
    iconName: "bird",
  },
];

export default function VisitedProfileScreen({ route, navigation }) {
  const loggedInUserId = useSelector((state) => state.auth.user.id);
  // route
  const goBack = () => navigation.goBack();
  const { username, userId } = route?.params?.param;
  const [userData, setUserData] = useState({});

  // hooks
  const [followersCount, setFollowersCount] = useState(0);
  const [followingsCount, setFollowingsCount] = useState(0);
  const [isFollowers, setIsFollowers] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleToggleFollow = () => {
    toggleFollow({ userId: loggedInUserId, otherId: userId, isFollowers });
  };

  useMemo(() => {
    getUser({ username, setUserData });
    getFollowByUserVisitedScreen({
      loggedInUserId,
      visitedUserId: userId,
      setIsFollowers,
      setIsFollowing,
      setFollowersCount,
      setFollowingsCount,
    });
  }, [username]);

  const [activeTab, setActiveTab] = useState(tabs[0].name);
  const displayTabContent = () => {
    switch (activeTab) {
      case "posts":
        return <ProfilePostsScreen userId={userId} />;
      case "tweets":
        return <ProfileTweetsScreen userId={userId} />;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-between items-center mx-[14px] mt-[6px] mb-[18px]">
        <View className="flex-row items-center space-x-10">
          <TouchableOpacity
            onPress={goBack}
            className="active:bg-gray-200 rounded-full p-2"
          >
            <AntDesign name="arrowleft" size={30} />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">{userData.username}</Text>
        </View>
        <TouchableOpacity className="active:bg-gray-200 rounded-full p-2">
          <MaterialIcons name="more-vert" size={28} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {/* profile and info */}
        <View className="flex-row justify-between items-center mx-[14px] space-x-4">
          <Avatar.Image source={{ uri: userData.profileImg }} size={90} />
          <View className="flex-1 flex-row justify-center items-center space-x-4">
            {/* followers */}
            <View className="items-center">
              <Text className="text-xl font-bold">{followersCount}</Text>
              <Text>Followers</Text>
            </View>
            {/* following */}
            <View className="items-center">
              <Text className="text-xl font-bold">{followingsCount}</Text>
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
          <TouchableOpacity
            onPress={handleToggleFollow}
            className={`${
              isFollowers ? "bg-gray-300" : "bg-blue"
            } w-1/2 py-1 rounded-lg`}
          >
            <Text className="text-[17px] text-center font-semibold">
              {isFollowers
                ? "Following"
                : !isFollowers && isFollowing
                ? "Follow back"
                : "Follow"}
            </Text>
          </TouchableOpacity>
          {/* message */}
          <TouchableOpacity
            onPress={() => alert("Open message")}
            className="bg-gray-300 w-1/2 py-1 rounded-lg"
          >
            <Text className="text-[17px] text-center font-semibold">
              Message
            </Text>
          </TouchableOpacity>
        </View>
        {/* tabs */}
        <View className="my-2 mx-auto">
          <FlatList
            data={tabs}
            renderItem={({ item }) => (
              <TouchableOpacity
                className={`${
                  activeTab === item.name ? "bg-gray-600/50" : ""
                } p-[10px] rounded-full`}
                onPress={() => setActiveTab(item.name)}
              >
                <MaterialCommunityIcons
                  name={item.iconName}
                  size={35}
                  color={`${activeTab === item.name ? "#fff" : "#AAA9B8"}`}
                />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.name}
            horizontal
            contentContainerStyle={{
              width: "100%",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          />
        </View>
        {/* display tab content */}
        {displayTabContent()}
      </ScrollView>
    </SafeAreaView>
  );
}
