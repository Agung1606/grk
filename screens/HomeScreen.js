import { View, Text, Button } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {setLogout} from '../state/authSlice'

export default function HomeScreen({ navigation }) {
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch();
  return (
    <View className="flex-1 bg-white justify-center items-center">
      <Text>{user?.firstName}</Text>
      <Text>{user?.email}</Text>
      <Button
        title="go to login"
        onPress={() => dispatch(setLogout())}
      />
    </View>
  );
}