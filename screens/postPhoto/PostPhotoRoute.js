import React from "react";
// route
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator()

import PostPhoto from "./flow/PostPhoto";

export default function PostPhotoStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="PostPhoto"
        component={PostPhoto}
        options={{ presentation: "modal", animation: "slide_from_right" }}
      />
    </Stack.Navigator>
  );
}
