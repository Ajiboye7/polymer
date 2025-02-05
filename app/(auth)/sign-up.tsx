/*import { View, Text, Image, StatusBar, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "@/components/InputField";
import { icons } from "@/constants";
import Button from "@/components/Button";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    account: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  return (
    <SafeAreaView className="mt-5">
      <ScrollView>
        <View className="px-2">
          <StatusBar hidden />
          <View className="bg-gray-300 w-[29.77px] h-[29.77px] rounded-full">
            <Image source={icons.arrowLeft} />
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
            <InputField title="name" placeholder="john Doe" />
            
            <InputField title="Account number" placeholder="1234567890"
            keyboardType="numeric"
            textContentType="none"
             />
            <InputField title="Email" placeholder="name@example.com"
            textContentType="emailAddress"
             keyboardType="email-address"
             />

            <InputField
              title="Create a password"
              placeholder="Enter a 6-digit password"
              icon={icons.eye}
              secureTextEntry={true}
              textContentType="password"

              
            />

            <InputField
              title="Retype password"
              placeholder="Enter a 6-digit password"
              icon={icons.eye}
            />
          </View>

          <Button
            title="Create an account"
            buttonStyle="w-[358px] h-[49.77px] mt-14"
          />

          <Text className=" text-[14px] text-center mt-6 text-secondary-400 ">
            Already have an account?{" "}
            <Text className="text-primary-300 font-semibold">Log in</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;*/

import { View, Text, Image, StatusBar, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "@/components/InputField";
import { icons } from "@/constants";
import Button from "@/components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    account: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <ScrollView className="">
      <SafeAreaView className="mt-5">
        <View className="px-2">
          <StatusBar hidden />
          <View className="bg-gray-300 w-[29.77px] h-[29.77px] rounded-full">
            <Image source={icons.arrowLeft} />
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
          <View className="border border-solid-violet-500">
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
              icon={icons.eye}
            />

            <View >
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
                icon={icons.eye}
              />
            </View>
          </View>

          <Button
            title="Create an account"
            buttonStyle="w-[358px] h-[49.77px] mt-14"
          />

          <Text className=" text-[14px] text-center mt-6 text-secondary-400 ">
            Already have an account?{" "}
            <Text className="text-primary-300 font-semibold">Log in</Text>
          </Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignUp;
