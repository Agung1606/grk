import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import React, { useState, useMemo } from 'react'
import { TextInput, Avatar } from 'react-native-paper'
// nativewind
import { styled } from 'nativewind';
const StyledPressable = styled(Pressable);
// icon
import { MaterialIcons } from '@expo/vector-icons';
// firebase
import { searchUserFromFirestore } from '../../api/firestore/user';
// route
import { useNavigation } from '@react-navigation/native';

export default function Search({ close }) {
  // route
  const navigation = useNavigation();

  const [searchedUser, setSearchedUser] = useState([]);
  const [input, setInput] = useState("");

  useMemo(() => {
    if (input) searchUserFromFirestore({ input, setSearchedUser });
  }, [input]);

  return (
    <>
      {/* search bar */}
      <View className="mx-2 mt-2 flex-row items-center space-x-3">
        <TouchableOpacity onPress={close}>
          <MaterialIcons name="arrow-back" size={30} />
        </TouchableOpacity>
        <TextInput
          placeholder="Search name"
          className="flex-1 bg-gray-200 h-[40px] rounded-[8px]"
          activeUnderlineColor="#b5b5b5"
          underlineColor="transparent"
          autoFocus={true}
          value={input}
          onChangeText={(input) => setInput(input)}
        />
      </View>
      {/* searched user from db */}
      <View className="my-3">
        {searchedUser &&
          searchedUser?.map((data) => (
            <StyledPressable
            onPress={() => navigation.navigate('VisitedProfileScreen', { param: data.id})}
              key={data?.id}
              className="flex-row items-center space-x-2 py-[5px] active:bg-gray-200 rounded-lg"
            >
              <Avatar.Image source={{ uri: data.profileImg }} size={50} />
              <Text className="text-lg text-gray-600">{data.username}</Text>
            </StyledPressable>
          ))}
      </View>
    </>
  );
}