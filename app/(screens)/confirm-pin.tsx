import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import Button from "@/components/Button";

const ConfirmPin = () => {
  const [pin, setPin] = useState("");

  const handleInput = (text: string) => {
    if (text.length <= 4) {
      setPin(text);
    }
  };

  return (
    <SafeAreaView className="mt-10">
      <View className="px-4">
        <Text className="text-[32px] text-primary-300 font-gilroyBold">
          Confirm your 4-Digit PIN
        </Text>
        <Text className="text-[14px] text-secondary-600 font-semibold my-5">
          Retype your pin to confirm.
        </Text>

        <View className="flex-row justify-around items-center mb-8 bg-gray-200 w-[140px] h-[50px] rounded-[10px]">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <View
                key={index}
                className={`w-[10px] h-[10px] rounded-full ${
                  pin.length > index ? "bg-primary-300" : "bg-secondary-700"
                }`}
              />
            ))}
        </View>

        <TextInput
          className="absolute h-0 w-0"
          keyboardType="numeric"
          maxLength={4}
          value={pin}
          onChangeText={handleInput}
          autoFocus
        />

        {/*<TouchableOpacity
          className={`h-[50px] w-full rounded-lg justify-center items-center ${
            pin.length === 4 ? "bg-primary-300" : "bg-secondary-500"
          }`}
          disabled={pin.length < 4}
          onPress={() => {
            console.log("PIN Created:", pin);
          }}
        >
          <Text
            className={`text-lg font-semibold ${
              pin.length === 4 ? "text-white" : "text-gray-400"
            }`}
          >
            Continue
          </Text>
        </TouchableOpacity>*/}

        <Button
          title="Continue"
          buttonStyle={`h-[50px] w-full ${
            pin.length === 4 ? "bg-primary-300" : "bg-secondary-500"
          }`}
          disabled={pin.length < 4}
          handleClick={() => {
            console.log("PIN Created:", pin);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ConfirmPin;
