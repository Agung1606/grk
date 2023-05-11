import { View, Text } from 'react-native'
import React from 'react'
import { styled } from 'nativewind'
const StyledView = styled(View)

export default function MessageScreen() {
  return (
    <StyledView className="flex-1 bg-white dark:bg-black justify-center items-center">
      <Text>MessageScreen</Text>
      <Text>This feature is still development</Text>
    </StyledView>
  );
}