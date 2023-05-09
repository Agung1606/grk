import React from 'react'

// bottom navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const Tab = createBottomTabNavigator()

// icons
import { MaterialIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons'

import HomeScreen from '../screens/HomeScreen'
import ExploreScreen from '../screens/ExploreScreen'
import ProfileScreen from '../screens/ProfileScreen'
import VisitedProfileScreen from "../screens/VisitedProfileScreen";
import PostPhotoScreen from '../screens/posting/postPhoto/PostPhotoRoute'
import PostTweetScreen from '../screens/posting/PostTweetScreen'

export default function MainStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#4f86f7",
        tabBarInactiveTintColor: "black",
        tabBarHideOnKeyboard: true,
      }}
    >
      {/* home */}
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={30} color={color} />
          ),
        }}
      />
      {/* explore */}
      <Tab.Screen 
        name="ExploreScreen"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="search" size={30} color={color} />
          ),
        }}
      />
      {/* post photo */}
      <Tab.Screen
        name="PostPhotoScreen"
        component={PostPhotoScreen}
        options={{
          tabBarStyle: {
            display: "none",
          },
          tabBarIcon: ({ color }) => (
            <FontAwesome name="plus-square" size={25} color={color} />
          ),
        }}
      />
      {/* post tweet */}
      {/* <Tab.Screen
        name="PostTweetScreen"
        component={PostTweetScreen}
        options={{
          tabBarStyle: {
            display: "none",
          },
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="pencil-alt" size={23} color={color} />
          ),
          unmountOnBlur: true,
        }}
      /> */}
      {/* profile */}
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-circle" size={25} color={color} />
          ),
        }}
      />
      {/* other profile */}
      <Tab.Screen
        name="VisitedProfileScreen"
        component={VisitedProfileScreen}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
        }}
      />
    </Tab.Navigator>
  );
}