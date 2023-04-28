import { View, Text, Button, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useState } from 'react'

// camera
import { Camera, CameraType } from 'expo-camera'

export default function PostPhoto() {
  const [type, setType] = useState(CameraType.back)
  const [permission, requestPermission] = Camera.useCameraPermissions()

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <Text className="font-semibold text-center">
          G297K memerlukan izin anda untuk menampilkan kamera
        </Text>
        <Pressable
          onPress={requestPermission}
          className="bg-[#4f86f7] active:bg-[#229dd6] mt-2 px-2 py-[10px] rounded-lg"
        >
          <Text className="text-center text-white font-semibold">
            Berikan izin
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Camera className="h-[50%]" type={type}>
          
      </Camera>
    </SafeAreaView>
  );
}