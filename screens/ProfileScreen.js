import { View, Text, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useMemo, useState } from 'react'

import { setLogout } from '../state/authSlice';
import { useDispatch, useSelector } from 'react-redux';

// firebase
import { getUser } from '../api/firestore/user';
import { Avatar } from 'react-native-paper';

export default function ProfileScreen({ route }) {
  // firebase
  const usernameParam = route?.params?.param;
  const [userData, setUserData] = useState({});
  useMemo(() => {
    getUser({ username: usernameParam, setUserData });
  }, [usernameParam]);

  // logged in username
  const loggedInUser = useSelector((state) => state.auth.user.username);
  // 
  const dispatch = useDispatch();
  const handleLogout = () => dispatch(setLogout());

  // configuration
  const isMyProfile = loggedInUser === usernameParam;

  if(!userData) {
    return <View className="flex-1 justify-center items-center">
      <Text>Loading...</Text>
    </View>
  }
  return (
    <SafeAreaView className="flex-1 bg-white justify-center items-center">
      {isMyProfile ? (
        <View>
          <Text>MyProfile</Text>
        </View>
      ) : (
        <View>
          <Text>Other profile</Text>
        </View>
      )}
    </SafeAreaView>
  );
}