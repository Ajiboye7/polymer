import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "@/components/InputField";
import Button from "@/components/Button";

const InputIdentity = () => {
  return (
    <SafeAreaView className="mx-4">
      <View className="bg-gray-300 w-[29.77px] h-[29.77px] rounded-full">
        <TouchableOpacity>
          <Image source={icons.arrowLeft} />
        </TouchableOpacity>
      </View>
      <View>
        <Text className="text-[32px] text-primary-300 font-gilroyBold mt-5 mb-3 ">
          Verify Identity
        </Text>
        <Text className="text-[14px] text-secondary-600 leading-[20px] w-[358px] mb-5">
          Let’s get you verified and get your payments {"\n"}
          international.
        </Text>
      </View>

      <InputField
        title="Bank Verification Number"
        placeholder="Enter your Bvn"
        keyboardType="numeric"
      />

      <Button title="Continue" buttonStyle="w-full h-[49.77px] mt-8" />
    </SafeAreaView>
  );
};

export default InputIdentity;

/*import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import { icons } from "@/constants";


const InputIdentity = ({ route }: { route: any }) => {
  const navigation = useNavigation();
  const selectedMode = route?.params?.selectedMode || null; // Get the selected verification method

  // Show an error or redirect if the parameter is missing
  if (!selectedMode) {
    console.warn("Selected mode is undefined. Redirecting...");
    return null;
  }

  const [inputValue, setInputValue] = useState("");

  // Determine the placeholder text based on the selected mode
  const placeholderText =
    selectedMode === "bvn"
      ? "Enter your BVN"
      : "Enter your NIN";

  const handleVerify = () => {
    // Log the input value
    
    console.log(`${selectedMode} Verification Input:`, inputValue);
  };

  

  return (
    <SafeAreaView className="mx-4">
      {/* Back Button 
      <View className="bg-gray-300 w-[29.77px] h-[29.77px] rounded-full mb-6">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={icons.arrowLeft} />
        </TouchableOpacity>
      </View>

      {/* Screen Title 
      <View>
        <Text className="text-[32px] text-primary-300 font-gilroyBold mb-3">
          Verify Identity
        </Text>
        <Text className="text-[14px] text-secondary-600 leading-[20px] mb-5">
          Let’s get you verified and get your payments {"\n"}
          international.
        </Text>
      </View>

      {/* Input Field 
      <InputField
        title={selectedMode === "bvn" ? "Bank Verification Number" : "National Identity Number"}
        placeholder={placeholderText}
        value={inputValue}
        handleChangeText={(text) => setInputValue(text)}
        keyboardType="numeric"
      />

      {/* Verify Button 
      <Button
        title="Verify"
        buttonStyle="w-full h-[49.77px] mt-8"
        handleClick={handleVerify}
      />
    </SafeAreaView>
  );
};

export default InputIdentity;*/
