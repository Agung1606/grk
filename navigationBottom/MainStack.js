import React from "react";
import { useColorScheme } from "react-native";
// bottom navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

// icons
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import ExploreScreen from "../screens/ExploreScreen";
import MessageScreen from "../screens/MessageScreen";
import ProfileScreen from "../screens/ProfileScreen";
import VisitedProfileScreen from "../screens/VisitedProfileScreen";
import PostPhotoScreen from "../screens/posting/postPhoto/PostPhotoRoute";
import PostTweetScreen from "../screens/posting/PostTweetScreen";

export default function MainStack() {
  const {colorScheme} = useColorScheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "#808080",
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: colorScheme === "light" ? "#ffffff" : "#000000",
        },
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
      {/* message */}
      <Tab.Screen
        name="MessageScreen"
        component={MessageScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="wechat" size={25} color={color} />
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
      {/* other profile */}
      <Tab.Screen
        name="VisitedProfileScreen"
        component={VisitedProfileScreen}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
        }}
      />
      {/* post tweet screen */}
      <Tab.Screen 
        name="PostTweetScreen"
        component={PostTweetScreen}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
}
