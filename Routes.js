import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import LoginScreen from "./screens/LoginScreen";
import SignUpRoute from "./screens/signup/SignUpRoute";
import MainStack from './navigationBottom/MainStack';
import EditProfileScreen from "./screens/EditProfileScreen";
import PostScreen from "./components/screen/singlePost/PostScreen"
import TweetScreen from "./components/screen/singlePost/TweetScreen";

import { useSelector } from "react-redux";

export default function Routes() {
  const token = useSelector((state) => state.auth.token);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!token ? (
        <Stack.Group>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ presentation: "modal", animation: "none" }}
          />
          <Stack.Screen
            name="SignUpRoute"
            component={SignUpRoute}
            options={{ presentation: "modal", animation: "none" }}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen
            name="MainStack"
            component={MainStack}
            options={{ presentation: "modal", animation: "none" }}
          />
          <Stack.Screen
            name="EditProfileScreen"
            component={EditProfileScreen}
            options={{ presentation: "modal", animation: "none" }}
          />
          <Stack.Screen
            name="PostScreen"
            component={PostScreen}
            options={{ presentation: "modal", animation: "none" }}
          />
          <Stack.Screen
            name="TweetScreen"
            component={TweetScreen}
            options={{ presentation: "modal", animation: "none" }}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}
