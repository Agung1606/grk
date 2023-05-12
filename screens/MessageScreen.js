import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { styled } from 'nativewind'
const StyledSafeAreaView = styled(SafeAreaView)

export default function MessageScreen() {
  return (
    <StyledSafeAreaView className="flex-1 bg-white dark:bg-black">
      <View className="flex-1 justify-center items-center">
        <Text>Message screen</Text>
        <Text>Masih dalam proses pengembangan</Text>
      </View>
    </StyledSafeAreaView>
  );
}