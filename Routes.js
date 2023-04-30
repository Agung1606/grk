import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import LoginScreen from "./screens/LoginScreen";
import SignUpRoute from "./screens/signup/SignUpRoute";
import MainStack from './navigationBottom/MainStack';
// import PostPhotoStack from "./screens/postPhoto/PostPhotoRoute";

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
          {/* <Stack.Screen
            name="PostPhotoStack"
            component={PostPhotoStack}
            options={{ presentation: "modal", animation: "none" }}
          /> */}
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}
