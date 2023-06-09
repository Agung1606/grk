import React from "react";
// route
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import EmailReg from "./regflow/EmailReg";
import PasswordReg from "./regflow/PasswordReg";
import UsernameReg from "./regflow/UsernameReg";

export default function SignUp() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="EmailReg"
        component={EmailReg}
        options={{ presentation: "modal", animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="PasswordReg"
        component={PasswordReg}
        options={{ presentation: "modal", animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="UsernameReg"
        component={UsernameReg}
        options={{ presentation: "modal", animation: "slide_from_right" }}
      />
    </Stack.Navigator>
  );
}
