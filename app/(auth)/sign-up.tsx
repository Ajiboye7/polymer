import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "@/components/InputField";
import { icons } from "@/constants";
import Button from "@/components/Button";
import axios from "axios";
import Constants from "expo-constants";
import { Link, useRouter } from "expo-router";
import { ROUTES } from "@/constants/routes";

const SignUp = () => {
  const Host = Constants.expoConfig?.extra?.host || "http://192.168.0.2:5000";

  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    account: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignUp = async () => {
    if (
      !form.name ||
      !form.account ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      Alert.alert("All fields are to be field");
    }

    if (form.password !== form.confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${Host}/api/auth/sign-up`, form);
      Alert.alert("Success", "Account created successfully!");
      router.replace(ROUTES.EMAIL_OTP);
      return response;
    } catch (error) {
      console.error("Sign-up error:", error);
      Alert.alert("Error", "Failed to create account. Please try again.");
    }
  };

  return (
    <ScrollView className="">
      <SafeAreaView className="mt-5">
        <View className="px-2">
          <StatusBar hidden />
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
            <View className="bg-gray-300 w-[29.77px] h-[29.77px] rounded-full">
              <Image source={icons.arrowLeft} />
            </View>
          </TouchableOpacity>

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
              title="Full Name"
              placeholder="John Doe"
              value={form.name}
              handleChangeText={(value) => setForm({ ...form, name: value })}
              keyboardType="default"
              textContentType="name"
            />

            <InputField
              title="Account Number"
              placeholder="1234567890"
              value={form.account}
              handleChangeText={(value) => setForm({ ...form, account: value })}
              keyboardType="numeric"
              textContentType="none"
            />

            <InputField
              title="Email Address"
              placeholder="name@example.com"
              value={form.email}
              handleChangeText={(value) => setForm({ ...form, email: value })}
              keyboardType="email-address"
              textContentType="emailAddress"
            />

            <InputField
              title="Create Password"
              placeholder="Enter a 6-digit password"
              value={form.password}
              handleChangeText={(value) =>
                setForm({ ...form, password: value })
              }
              secureTextEntry={true}
              keyboardType="default"
              textContentType="password"
            />

            <View>
              <InputField
                title="Retype Password"
                placeholder="Re-enter your password"
                value={form.confirmPassword}
                handleChangeText={(value) =>
                  setForm({ ...form, confirmPassword: value })
                }
                secureTextEntry={true}
                keyboardType="default"
                textContentType="password"
              />
            </View>
          </View>

          <Button
            title="Create an account"
            buttonStyle="w-[358px] h-[49.77px] mt-14"
            handleClick={handleSignUp}
          />

          <Text className=" text-[14px] text-center mt-6 text-secondary-400 ">
            Already have an account?{" "}
            {/*<Text className="text-primary-300 font-semibold">Log in</Text>*/}
            <Link
              href={ROUTES.SIGN_IN}
              className="text-primary-300 font-semibold"
            >
              Log in
            </Link>
          </Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignUp;
