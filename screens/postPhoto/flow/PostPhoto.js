import { View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useState } from 'react'

// icon
import { AntDesign } from '@expo/vector-icons'

// image picker
import * as MediaLibrary from 'expo-media-library'

export default function PostPhoto({ navigation }) {
  // route
  const goToPrevScreen = () => navigation.goBack();

  const [status, requestPermission] = MediaLibrary.usePermissions();
  const [selectedImage, setSelectedImage] = useState(null); // this state will posted to firebase
  const [tempImg, setTempImg] = useState(null);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false)
  const [amount, setAmount] = useState(5);
  
  if(status === null) requestPermission();
  
  useEffect(() => {
    (async() => {
      try {
        setLoading(true)
        await MediaLibrary.getAssetsAsync({ first: amount }).then((data) => {
          setAssets(data.assets);
        });
        setLoading(false)
      } catch (error) {
        requestPermission();
      }
    })();
  }, [amount]);
  
  const add = () => setAmount(amount + 10)
  const loadMore = () => {
    return (
      <TouchableOpacity
        onPress={add}
        className="w-[110px] h-[110px] justify-center items-center"
      >
        {loading ? (
          <ActivityIndicator size={"large"} color={"#4169e1"} />
        ) : (
          <>
            <AntDesign name="right" size={25} />
            <Text className="font-semibold">More</Text>
          </>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="mx-4 mt-4 flex-row justify-between items-center">
        <View className="flex-row items-center gap-x-[45px]">
          <TouchableOpacity onPress={goToPrevScreen}>
            <AntDesign name="close" size={30} />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">New post</Text>
        </View>
        <TouchableOpacity
          disabled={!tempImg}
          onPress={() => alert("go to add caption")}
        >
          <AntDesign name="arrowright" size={30} color={"#4169e1"} />
        </TouchableOpacity>
      </View>

      <View className="bg-gray-100 my-3">
        <View className="w-[100%] h-[400px] justify-center items-center">
          {tempImg ? (
            <Image
              source={{ uri: tempImg }}
              className="w-full h-full"
              resizeMode="contain"
            />
          ) : (
            <Text>No photos selected yet</Text>
          )}
        </View>
      </View>

      <View className="my-auto flex-row items-center gap-x-5">
        <FlatList
          data={assets}
          horizontal
          renderItem={({ item }) => (
            <View className="mx-[5px]">
              <TouchableOpacity
                onPress={() => {
                  setSelectedImage(item.filename);
                  setTempImg(item.uri);
                }}
              >
                <Image
                  source={{ uri: item.uri }}
                  className="w-[110px] h-[110px]"
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
          // onEndReached={loadMore}
          ListFooterComponent={loadMore}
        />
      </View>
    </SafeAreaView>
  );
}