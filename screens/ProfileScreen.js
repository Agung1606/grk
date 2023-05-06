import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useMemo, useRef } from 'react'
import { Avatar } from 'react-native-paper';
// modal bottom
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Setting from '../components/modal/Setting';

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
  // username logged in
  const user = useSelector((state) => state.auth.user);

  // modal config
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["27%"], []);
  const openModal = () => bottomSheetModalRef.current.present();

  return (
    <SafeAreaView className="flex-1 bg-white">
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
        <View className="items-center">
          <Avatar.Image source={{ uri: user.profileImg }} size={90} />
          <Text className="font-semibold font-itim">{user.name}</Text>
        </View>
        <View className="flex-1 flex-row justify-center items-center space-x-4">
          {/* followers */}
          <View className="items-center">
            <Text className="text-xl font-bold">8.1JT</Text>
            <Text>Followers</Text>
          </View>
          {/* following */}
          <View className="items-center">
            <Text className="text-xl font-bold">1,032</Text>
            <Text>Following</Text>
          </View>
        </View>
      </View>
      {/* bio */}
      <View className="mx-[20px] my-[2px]">
        <Text>🇮🇩{"\n"}Secukupnya🌻</Text>
      </View>
      {/* button */}
      <View className="flex-row justify-between items-center space-x-2 mx-[20px] my-2">
        <TouchableOpacity className="bg-gray-300 w-1/2 py-1 rounded-lg">
          <Text className="text-[17px] text-center font-semibold">
            Edit profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-300 w-1/2 py-1 rounded-lg">
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
            lazy: true
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
    </SafeAreaView>
  );
}