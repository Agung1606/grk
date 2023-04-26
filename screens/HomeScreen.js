import { View, Text, Button } from 'react-native'
import React from 'react'

export default function HomeScreen({ navigation }) {
  return (
    <View className="flex-1 bg-white justify-center items-center">
      <Text>HomeScreen</Text>
      <Button
        title="go to login"
        onPress={() => navigation.navigate("LoginScreen")}
      />
    </View>
  );
}