import { View, Text } from 'react-native'
import React from 'react'

export default function PasswordReg({ navigation, route }) {
    const data = route?.params?.param;
    console.log("🚀 ~ file: PasswordReg.js:6 ~ PasswordReg ~ data:", data)
    
  return (
    <View>
      <Text>PasswordReg</Text>
    </View>
  )
}