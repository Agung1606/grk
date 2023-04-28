import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
// screen
import PostsScreen from '../components/screen/PostsScreen';
import TweetsScreen from '../components/screen/TweetsScreen';
// nav
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator()

export default function HomeScreen() {

  return <SafeAreaView className="flex-1 bg-white">
    <View className='px-2 py-[4px] border-b border-gray-600 justify-center items-center'>
      <Text className='text-xl font-itim text-deep-blue'>G297K</Text>
    </View>
    {/* navigation */}
    <Tab.Navigator >
      <Tab.Screen name='post' component={PostsScreen} />
      <Tab.Screen name='tweet' component={TweetsScreen} />
    </Tab.Navigator>
  </SafeAreaView>;
}