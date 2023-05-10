import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
// screen
import PostsScreen from "../components/screen/PostsScreen";
import TweetsScreen from "../components/screen/TweetsScreen";
// nav
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();
// animated
// import Animated, {
//   useSharedValue,
//   useAnimatedScrollHandler,
//   useAnimatedStyle,
//   withTiming,
//   Easing,
// } from "react-native-reanimated";

// image picker
import * as MediaLibrary from 'expo-media-library'

export default function HomeScreen() {
  const [status, requestPermission] = MediaLibrary.usePermissions();
  if (status === null) requestPermission();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-2 py-[4px] border-b border-gray-600 justify-center items-center">
        <Text className="text-xl font-itim text-deep-blue">G297K</Text>
      </View>
      {/* navigation */}
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIndicatorStyle: {
            backgroundColor: "#808080",
          },
        }}
      >
        <Tab.Screen name="posts" component={PostsScreen} />
        <Tab.Screen
          name="tweets"
          component={TweetsScreen}
          options={{ lazy: true }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

{
  /* <Animated.ScrollView onScroll={scrollHandler}>
  <Text className="text-[30px]">
  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas
  dolor officiis, odit obcaecati dolorem autem, perspiciatis corrupti,
  impedit veritatis quod harum error similique. Nesciunt vel molestiae
  natus corrupti unde dolores. Enim officia nihil pariatur molestiae
  ipsum tenetur soluta facere sequi optio praesentium. Et minima
  cupiditate porro corrupti perferendis laborum deleniti autem
    laboriosam eligendi impedit accusantium voluptas, perspiciatis, atque
    sapiente. Fugit, delectus molestiae laborum minus eum amet nesciunt
    autem, vitae excepturi blanditiis sunt deleniti. Fugiat beatae laborum
    provident consectetur quod nobis officia deleniti amet omnis ullam
    nisi commodi eius, cumque laboriosam corrupti impedit et perspiciatis
    sequi quo itaque animi! Nesciunt, quo!
  </Text>
</Animated.ScrollView> */
}

// const translateY = useSharedValue(0);
// const lastContentOffset = useSharedValue(0);
// const isScrolling = useSharedValue(false);

// const scrollHandler = useAnimatedScrollHandler({
//   onScroll: (event) => {
//     if (
//       lastContentOffset.value > event.contentOffset.y &&
//       isScrolling.value
//     ) {
//       translateY.value = 0;
//       console.log("scrolling up");
//     } else if (
//       lastContentOffset.value < event.contentOffset.y &&
//       isScrolling.value
//     ) {
//       translateY.value = 100;
//       console.log("scrolling down");
//     }
//     lastContentOffset.value = event.contentOffset.y;
//   },
//   onBeginDrag: (e) => {
//     isScrolling.value = true;
//   },
//   onEndDrag: (e) => {
//     isScrolling.value = false;
//   },
// });

// const actionStyle = useAnimatedStyle(() => {
//   return {
//     transform: [
//       {
//         translateY: withTiming(translateY.value, {
//           duration: 750,
//           easing: Easing.inOut(Easing.ease)
//         }),
//       }
//     ],
//   }
// })
