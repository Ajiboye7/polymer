import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "@/components/InputField";
import { icons } from "@/constants";
import Button from "@/components/Button";
import axios from "axios";
import { Link, useRouter } from "expo-router";
import Constants from "expo-constants";
import { ROUTES } from "@/constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { signUp, signIn } from "@/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/redux/store";

const SignIn = () => {

  const [form, setForm] = useState({
    email: "",
    password: "",
  });


  const dispatch = useDispatch<AppDispatch>()
 // const { user, status, error } = useSelector((state: RootState) => state.auth);
 const authState = useSelector((state: RootState) => state.auth);
 const userName = authState.user?.name;

  const Host = Constants.expoConfig?.extra?.host || "http://192.168.0.4:5000";

  const router = useRouter();

  const handleSignIn = () => {
    dispatch(signIn(form)).unwrap();
    Alert.alert("Success", `Welcome back ${userName}`)
    //console.log(user)
  }


  {/*const handleSignIn = async () => {
    try {
      const result = await dispatch(signIn(form)).unwrap(); 
  
      if (result && result.name) {
        Alert.alert("Success", `Welcome back ${result.name}`);
      } else {
        Alert.alert("Error", "User data is missing. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", error as string);
    }
  };*/}
  
  
  {/*const handleSignIn = async () => {
    try {
      const response = await axios.post(`${Host}/api/auth/sign-in`, form);
      const { name } = response.data.data;
      Alert.alert("Success", `Welcome back ${name}` || response?.data?.message);
      router.replace(ROUTES.HOME);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Sign-in error response:", error.response?.data?.message);

        const errorMessage =
          error.response?.data?.message ||
          "Failed SignIn account. Please try again.";
        Alert.alert("Error", errorMessage);
      } else if (error instanceof Error) {
        console.error("Sign-in error:", error.message);
        Alert.alert("Error", "An error occurred. Please try again.");
      } else {
        console.error("Sign-in error:", error);
        Alert.alert("Error", "An unexpected error occurred. Please try again.");
      }
    }
  };*/}

  return (
    <SafeAreaView className="mt-5">
      <View className="px-2">
        <StatusBar hidden />
        <View className="bg-gray-300 w-[29.77px] h-[29.77px] rounded-full">
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
            <Image source={icons.arrowLeft} />
          </TouchableOpacity>
        </View>
        <View>
          <Text className="text-[32px] text-primary-300 font-gilroyBold mt-5 mb-3 ">
            Let's get started
          </Text>
          <Text className="text-[14px] text-secondary-600 leading-[20px] w-[358px] ">
            Register now to start making international payments {"\n"}with ease,
            security and speed.
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
            title="Password"
            placeholder="Enter your 6-digit password"
            value={form.password}
            handleChangeText={(value) => setForm({ ...form, password: value })}
            secureTextEntry={true}
            keyboardType="default"
            textContentType="password"
            icon={icons.eye}
          />
        </View>

        <Button
          title="Sign in into your account"
          buttonStyle="w-[358px] h-[49.77px] mt-14"
          handleClick={handleSignIn}
        />

        <Text className=" text-[14px] text-center mt-6 text-secondary-400 ">
          Don't have an account?
          <Link
            href={ROUTES.SIGN_UP}
            className="text-primary-300 font-semibold"
          >
            Sign up
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
