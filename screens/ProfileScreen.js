import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useMemo, useRef, useState } from 'react'
import { Avatar } from 'react-native-paper';
import { styled, useColorScheme } from 'nativewind';
const StyledSafeAreaView = styled(SafeAreaView);
// modal bottom
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Setting from '../components/modal/Setting';
// firebase
import { getAmountOfFollowers } from '../api/firestore/user';
// icons
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
// redux
import { useSelector } from 'react-redux';
// navigation
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
// component
import ProfilePostsScreen from '../components/screen/ProfilePostsScreen';
import ProfileTweetsScreen from '../components/screen/ProfileTweetsScreen';

export default function ProfileScreen({ navigation }) {
  // route
  const goToPostPhoto = () => navigation.navigate("PostPhotoScreen");
  const goToEditProfile = () => navigation.navigate("EditProfileScreen");
  // username logged in
  const user = useSelector((state) => state.auth.user);
  // theme
  const { colorScheme } = useColorScheme();

  // modal config
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["27%"], []);
  const openModal = () => bottomSheetModalRef.current.present();

  // // hooks
  const [followersCount, setFollowersCount] = useState(0);
  const [followingsCount, setFollowingsCount] = useState(0);

  useMemo(() => {
    getAmountOfFollowers({ userId: user.id, setFollowersCount, setFollowingsCount})
  }, [])

  return (
    <StyledSafeAreaView className="flex-1 bg-white dark:bg-black">
      <View className="flex-row justify-between items-center mx-[20px] mt-[12px] mb-[25px]">
        <Text className="text-[22px] font-semibold">{user.username}</Text>
        <View className="flex-row items-center gap-x-[30px]">
          <TouchableOpacity onPress={goToPostPhoto}>
            <FontAwesome name="plus-square" size={25} />
          </TouchableOpacity>
          <TouchableOpacity onPress={openModal}>
            <FontAwesome name="bars" size={25} />
          </TouchableOpacity>
        </View>
      </View>
      {/* profile and info */}
      <View className="flex-row justify-between items-center mx-[20px] space-x-4">
        <Avatar.Image source={{ uri: user.profileImg }} size={90} />
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
        <Text className="font-semibold font-itim">{user.name}</Text>
        <Text>{user.bio}</Text>
      </View>
      {/* button */}
      <View className="flex-row justify-between items-center space-x-2 mx-[20px] my-2">
        <TouchableOpacity
          onPress={goToEditProfile}
          className="bg-gray-300 w-1/2 py-1 rounded-lg"
        >
          <Text className="text-[17px] text-center font-semibold">
            Edit profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => alert("Share profile")}
          className="bg-gray-300 w-1/2 py-1 rounded-lg"
        >
          <Text className="text-[17px] text-center font-semibold">
            Share profile
          </Text>
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
          tabBarStyle: {
            backgroundColor: colorScheme === "light" ? "#ffffff" : "#000000",
          },
        }}
      >
        <Tab.Screen
          name="posts"
          component={ProfilePostsScreen}
          initialParams={{ param: user.id }}
          options={{
            tabBarIcon: () => (
              <MaterialCommunityIcons name="dots-grid" size={25} />
            ),
          }}
        />
        <Tab.Screen
          name="tweets"
          component={ProfileTweetsScreen}
          initialParams={{ param: user.id }}
          options={{
            tabBarIcon: () => <MaterialCommunityIcons name="bird" size={25} />,
            lazy: true,
          }}
        />
      </Tab.Navigator>
      {/* setting modal */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
      >
        <Setting />
      </BottomSheetModal>
    </StyledSafeAreaView>
  );
}