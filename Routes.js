import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator();

import LoginScreen from './screens/LoginScreen';
import SignUp from './screens/signup/SignUp';
import HomeScreen from './screens/HomeScreen';

export default function Routes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ presentation: "modal", animation: "none" }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ presentation: "modal", animation: "none" }}
        />
      </Stack.Group>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ presentation: "modal", animation: "none" }}
      />
    </Stack.Navigator>
  );
}