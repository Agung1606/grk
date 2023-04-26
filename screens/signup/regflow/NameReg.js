// react
import { View, Text, Pressable } from "react-native";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

// icon
import { AntDesign } from "@expo/vector-icons";

// form
import { Formik } from "formik";
import * as yup from "yup";

// form validation config
const nameValidate = yup.object().shape({
  firstName: yup
    .string()
    .min(3, ({ min }) => `First name must be at least ${min} characters`)
    .required("first name is required"),
  lastName: yup.string(),
});

export default function NameReg({ navigation, route }) {
  // route
  const goToLogin = () => navigation.navigate("LoginScreen");
  const goToEmailReg = () => navigation.navigate("EmailReg");

  // data from route
  const email = route?.params?.param;

  // handle
  const handleNameSubmit = (values) => {
    const newData = {
      ...values,
      email
    };
    navigation.navigate('BirthdayReg', { param: newData });
  };

  // common style
  const styleInput = "mb-2 bg-indigo-50 rounded-lg";
 return (
   <SafeAreaView className="flex-1 bg-white relative">
     <View className="mt-8 mx-3">
       <Pressable onPress={goToEmailReg}>
         <AntDesign name="arrowleft" size={30} color="#010026" />
       </Pressable>
     </View>
     <View className="mt-6 mx-3">
       <Text className="text-3xl font-semibold">What's your name?</Text>
     </View>
     {/* form container */}
     <View className="mt-8 mx-3">
       {/* form */}
       <Formik
         initialValues={{ firstName: '', lastName: '' }}
         validationSchema={nameValidate}
         onSubmit={handleNameSubmit}
       >
         {({ handleChange, handleSubmit, values, errors }) => (
           <>
             {/* first name */}
             <View>
               <TextInput
                 placeholder="First Name"
                 underlineColor="transparent"
                 activeUnderlineColor="#3bace2"
                 className={styleInput}
                 value={values.firstName}
                 onChangeText={handleChange("firstName")}
               />
               {errors.firstName && (
                 <Text className="text-red-500 mb-1">{errors.firstName}</Text>
               )}
             </View>
             {/* last name */}
             <View>
               <TextInput
                 placeholder="Last Name"
                 underlineColor="transparent"
                 activeUnderlineColor="#3bace2"
                 className={styleInput}
                 value={values.lastName}
                 onChangeText={handleChange("lastName")}
               />
               {errors.lastName && (
                 <Text className="text-red-500 mb-1">{errors.lastName}</Text>
               )}
             </View>
             {/* submit button */}
             <Pressable
               className="bg-[#3bace2] active:bg-[#229dd6] py-[10px] rounded-lg"
               onPress={handleSubmit}
             >
               <Text className="text-center text-white font-semibold">
                 Next
               </Text>
             </Pressable>
           </>
         )}
       </Formik>
     </View>

     {/* already have an account */}
     <View className="absolute bottom-8 w-full">
       <Pressable onPress={goToLogin}>
         <Text className="text-center font-bold text-blue">
           Sudah punya akun?
         </Text>
       </Pressable>
     </View>
   </SafeAreaView>
 );
}
