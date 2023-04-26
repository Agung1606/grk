import React from 'react'
// route
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator()

import EmailReg from './regflow/EmailReg'
import NameReg from './regflow/NameReg'
import BirthdayReg from './regflow/BirthdayReg'
import PasswordReg from './regflow/PasswordReg'

export default function SignUp() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="EmailReg"
        component={EmailReg}
        options={{ presentation: "modal", animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="NameReg"
        component={NameReg}
        options={{ presentation: "modal", animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="BirthdayReg"
        component={BirthdayReg}
        options={{ presentation: "modal", animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="PasswordReg"
        component={PasswordReg}
        options={{ presentation: "modal", animation: "slide_from_right" }}
      />
    </Stack.Navigator>
  );
}