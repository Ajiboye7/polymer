import { View, Text, Image, StatusBar } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "@/components/InputField";
import { icons } from "@/constants";
import Button from "@/components/Button";
import { useRouter } from 'expo-router';

const BusinessProfile = () => {
  const [form, setForm] = useState({ name: "" });
  const router = useRouter();

  const handleCreateProfile = () => {
    router.push('/(screens)/business-profile-animation');  // Adjust the route based on your folder structure
  };

  return (
    <SafeAreaView className="mt-5">
      <View className="px-2">
        <StatusBar hidden />
        <View className="bg-gray-300 w-[29.77px] h-[29.77px] rounded-full">
          <Image source={icons.arrowLeft} />
        </View>
        <Text className="text-[32px] text-primary-300 font-gilroyBold mt-5 mb-3">
          Let's get started
        </Text>
        <Text className="text-[14px] text-secondary-600 leading-[20px] w-[358px]">
          Let’s take your business global. Start making {"\n"}international
          payments in the name of your business.
        </Text>
        <InputField
          title="Business Name"
          placeholder="Enter your business name"
          value={form.name}
          handleChangeText={(value) => setForm({ ...form, name: value })}
        />
        <Button
          title="Create a profile"
          buttonStyle="w-[358px] h-[49.77px] mt-10"
          handleClick={handleCreateProfile}
        />
      </View>
    </SafeAreaView>
  );
};

export default BusinessProfile;
