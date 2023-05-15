import { View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useState } from 'react'
import { styled } from "nativewind";
const StyledSafeAreaView = styled(SafeAreaView);
// icon
import { AntDesign } from '@expo/vector-icons'
// image picker
import * as MediaLibrary from 'expo-media-library'

export default function ChoosePhoto({ navigation }) {
  // route
  const goToPrevScreen = () => navigation.goBack();

  const [status, requestPermission] = MediaLibrary.usePermissions();
  const [selectedImg, setSelectedImg] = useState(null); // this state will posted to firebase
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(50);

  if (status === null) requestPermission();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        await MediaLibrary.getAssetsAsync({ first: amount }).then((data) => {
          setAssets(data.assets);
        });
      } catch (error) {
        requestPermission();
      }
      setLoading(false);
    })();
  }, [amount]);

  // handle
  const loadMore = () => {
    return (
      <TouchableOpacity
        onPress={() => setAmount(amount + 100)}
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
  };

  const handlePost = () => {
    navigation.navigate("AddCaptionPhoto", {
      param: { selectedImg },
    });
  };

  const renderItem = ({ item }) => (
    <View className="mx-[5px]">
      <TouchableOpacity
        onPress={() => {
          setSelectedImg({ uri: item.uri, name: item.filename });
        }}
      >
        <Image
          source={{ uri: item.uri }}
          className="w-[110px] h-[110px]"
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <StyledSafeAreaView className="flex-1 bg-white dark:bg-black">
      <View className="mx-4 mt-4 flex-row justify-between items-center">
        <View className="flex-row items-center gap-x-[45px]">
          <TouchableOpacity onPress={goToPrevScreen}>
            <AntDesign name="close" size={30} />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">New post</Text>
        </View>
        <TouchableOpacity disabled={!selectedImg} onPress={handlePost}>
          <AntDesign name="arrowright" size={30} color={"#4169e1"} />
        </TouchableOpacity>
      </View>

      <View className="bg-gray-50 my-3">
        <View className="w-[100%] h-[400px] justify-center items-center">
          {selectedImg?.uri ? (
            <Image
              source={{ uri: selectedImg?.uri }}
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
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListFooterComponent={loadMore}
        />
      </View>
    </StyledSafeAreaView>
  );
}