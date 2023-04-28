import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const Tab = createBottomTabNavigator()

// icons
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'

import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import PostPhoto from '../screens/PostPhoto'

export default function MainStack() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#4f86f7",
        tabBarInactiveTintColor: "black",
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
      {/* post photo */}
      <Tab.Screen
        name="PostPhoto"
        component={PostPhoto}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="plus-square" size={25} color={color} />
          ),
        }}
      />
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
    </Tab.Navigator>
  );
}