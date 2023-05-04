import { View, Text, TouchableOpacity, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useMemo, useState } from 'react'
import { Avatar } from 'react-native-paper';

// icons
import { MaterialIcons } from '@expo/vector-icons';
// redux
import { setLogout } from '../state/authSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function ProfileScreen({ route, navigation }) {
  // logout
  const dispatch = useDispatch();
  const handleLogout = () => dispatch(setLogout());

  // username logged in
  const user = useSelector((state) => state.auth.user);


  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="mx-3 my-2 flex-row justify-between items-center">
          <TouchableOpacity>
            <MaterialIcons name="settings" size={30} />
          </TouchableOpacity>
        <Text className="text-[16px] font-semibold">
          {user.username}
        </Text>
      </View>
      {/* wrapper */}
      <View className="mx-3 mt-4 flex-row justify-between items-center">
        {/* picture and username */}
        <View className="space-y-[2px]">
          <Avatar.Image source={{ uri: user.profileImg}} size={80} />
          <Text className="font-semibold">{`${user.firstName} ${user.lastName}`}</Text>
        </View>
        {/* container info */}
        <View className="">
          <View className="flex-row items-center gap-x-[15px]">
            {/* posts */}
            <View className="items-center">
              <Text className="text-lg font-bold">0</Text>
              <Text>Posts</Text>
            </View>
            {/* followers */}
            <View className="items-center">
              <Text className="text-lg font-bold">0</Text>
              <Text>Followers</Text>
            </View>
            {/* following */}
            <View className="items-center">
              <Text className="text-lg font-bold">0</Text>
              <Text>Following</Text>
            </View>
          </View>
          {/*  */}
          <Button title='go to other profile' onPress={() => navigation.navigate('OtherProfileScreen')}/>
        </View>
      </View>
    </SafeAreaView>
  );
}