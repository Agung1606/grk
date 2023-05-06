import React from "react";
// route
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator()

import ChoosePhoto from "./flow/ChoosePhoto";
import AddCaptionPhoto from "./flow/AddCaptionPhoto";

export default function PostPhotoStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="ChoosePhoto">
      <Stack.Screen
        name="ChoosePhoto"
        component={ChoosePhoto}
        options={{ presentation: "modal", animation: "slide_from_right", freezeOnBlur: true }}
      />
      <Stack.Screen
        name="AddCaptionPhoto"
        component={AddCaptionPhoto}
        options={{ presentation: "modal", animation: "slide_from_right" }}
      />
    </Stack.Navigator>
  );
}
