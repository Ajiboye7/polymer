import { View, Text, Image, StatusBar, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "@/components/InputField";
import { icons } from "@/constants";
import Button from "@/components/Button";
import { useNavigation } from '@react-navigation/native';
import { router } from "expo-router";
import { RootStackParamList } from "@/types/types";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  //const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const handlePress = () => {
    router.replace("/(tabs)/home");
  };

  /*const goBack = () => {
    // Check if there is a screen to go back to
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      // If no screen to go back to, navigate to a default screen (e.g., Home or SignIn)
      navigation.navigate("home"); // Adjust "Home" to the screen you want
    }
  }*/



  return (
    <SafeAreaView className="mt-5">
    
        <View className="px-2">
          <StatusBar hidden />
          <View className="bg-gray-300 w-[29.77px] h-[29.77px] rounded-full">
            <TouchableOpacity>
            <Image source={icons.arrowLeft} />
            </TouchableOpacity>
           
          </View>
          <View>
            <Text className="text-[32px] text-primary-300 font-gilroyBold mt-5 mb-3 ">
              Let's get started
            </Text>
            <Text className="text-[14px] text-secondary-600 leading-[20px] w-[358px] ">
              Register now to start making international payments {"\n"}with
              ease, security and speed.
            </Text>
          </View>
          <View>
            <InputField
              title="Email Address"
              placeholder="name@example.com"
              value={form.email}
              handleChangeText={(value) => setForm({ ...form, email: value })}
              keyboardType="email-address"
              textContentType="emailAddress"
            />

            <InputField
              title=" Password"
              placeholder="Enter your 6-digit password"
              value={form.password}
              handleChangeText={(value) =>
                setForm({ ...form, password: value })
              }
              secureTextEntry={true}
              keyboardType="default"
              textContentType="password"
              icon={icons.eye}
            />
          </View>

          <Button
            title="Sign in into your account"
            buttonStyle="w-[358px] h-[49.77px] mt-14"
          />

          <Text className=" text-[14px] text-center mt-6 text-secondary-400 ">
            Don't have an account?{" "}
            <Text className="text-primary-300 font-semibold">Sign Up</Text>
          </Text>
        </View>
      
    </SafeAreaView>
  );
};

export default SignUp;
