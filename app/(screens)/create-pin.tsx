import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { ROUTES } from "@/constants/routes";
import { icons } from "@/constants";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { createPin } from "@/redux/slices/authSlice";

const CreatePin = () => {
  const [pin, setPin] = useState("");

  const handleInput = (text: string) => {
    if (text.length <= 4) {
      setPin(text);
    }
  };

  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?._id;

  {/*const handleCreatePin = async () => {
    try {
      if (!pin) {
        Alert.alert("Error", "Please input a PIN");
        return;
      }
  
      if (!userId) {
        Alert.alert("Error", "User not found");
        return;
      }
  
      try {
        await dispatch(createPin({ pin, userId })).unwrap();
        router.push(ROUTES.CONFIRM_FOUR_DIGIT_PIN);
        console.log("PIN created:", pin);
      } catch (error) {
        console.error("Error creating PIN:", error);
  
        let errorMessage = "Failed to create PIN";
        if (typeof error === "string") {
          errorMessage = error;
        } else if (error && typeof error === "object" && "message" in error) {
          errorMessage = error.message as string;
        }
  
        Alert.alert("Error", errorMessage);
      }
    } catch (error) {
      console.error("Unexpected error", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    }
  };*/}
  const handleCreatePin = () => {
    if (!pin) return Alert.alert('Error', 'Please input a PIN');
    if (!userId) return Alert.alert('Error', 'User not found');
  
    dispatch(createPin({ pin, userId }))
      .unwrap()
      .then(() => router.push(ROUTES.CONFIRM_FOUR_DIGIT_PIN))
      .catch(error => Alert.alert('Error', error.message || 'Failed to create PIN'));
  };

  return (
    <SafeAreaView className="mt-10">
      <View className="px-4">
        <Text className="text-[32px] text-primary-300 font-gilroyBold">
          Create your 4-Digit PIN
        </Text>
        <Text className="text-[14px] text-secondary-600 font-semibold my-5">
          Create a PIN to secure your Polymer app.
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

        <Button
          title="Continue"
          buttonStyle={`h-[50px] w-full ${
            pin.length === 4 ? "bg-primary-300" : "bg-secondary-500"
          }`}
          disabled={pin.length < 4}
          handleClick={handleCreatePin}
        />
      </View>
    </SafeAreaView>
  );
};

export default CreatePin;


{/* Reusable PININPUT component
  import React from "react";
import { View, TextInput } from "react-native";

const PinInput = ({ pin, setPin, maxLength, autoFocus, ...props }) => {
  return (
    <View className="mb-4">
      <View className="flex-row justify-center space-x-4 mb-4">
        {Array(maxLength)
          .fill(0)
          .map((_, index) => (
            <View
              key={index}
              className={`w-12 h-12 rounded-lg border-2 items-center justify-center ${
                pin.length > index
                  ? "border-primary-300 bg-primary-50"
                  : "border-secondary-300"
              }`}
            >
              {pin.length > index && (
                <View className="w-3 h-3 rounded-full bg-primary-300" />
              )}
            </View>
          ))}
      </View>
      <TextInput
        className="absolute opacity-0 h-12 w-full"
        value={pin}
        onChangeText={setPin}
        maxLength={maxLength}
        keyboardType="numeric"
        autoFocus={autoFocus}
        secureTextEntry
        {...props}
      />
    </View>
  );
};

export default PinInput;
  */}
