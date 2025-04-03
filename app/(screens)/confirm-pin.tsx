import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert
} from "react-native";
import React, { useState } from "react";
import Button from "@/components/Button";
import { icons } from "@/constants";
import {  useRouter } from "expo-router";
import { ROUTES } from "@/constants/routes";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { confirmPin as pinConfirmation } from "@/redux/slices/authSlice";


const ConfirmPin = () => {

  const router = useRouter()

 

  const [pin, setPin] = useState("");

  const handleInput = (text: string) => {
    if (text.length <= 4) {
      setPin(text);
    }
  };

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?._id;

  {/*const handleConfirmPin = async () => {
    console.log("Confirm PIN button clicked");
  
    try {
      if (!pin) {
        Alert.alert("Error", "Please input a PIN");
        console.log("PIN is empty");
        return;
      }
  
      if (!userId) {
        Alert.alert("Error", "User not found");
        console.log("User ID not found");
        return;
      }
  
      try {
        console.log("Dispatching confirmPins action", { userId, pin });
        await dispatch(pinConfirmation({ pin, userId })).unwrap();
  
        console.log("PIN confirmation successful");
        router.push(ROUTES.HOME);
      } catch (error) {
        console.error("Error confirming PIN:", error);
  
        let errorMessage = "Failed to confirm PIN";
        if (typeof error === "string") {
          errorMessage = error;
        } else if (error && typeof error === "object" && "message" in error) {
          errorMessage = error.message as string;
        }
  
        Alert.alert("Error", errorMessage);
      }
    } catch (error) {
      console.error("Unexpected error", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again");
    }
  };*/}
  const handleConfirmPin = () => {
    if (!pin) return Alert.alert('Error', 'Please input a PIN');
    if (!userId) return Alert.alert('Error', 'User not found');
  
    dispatch(pinConfirmation({ pin, userId }))
      .unwrap()
      .then(() => router.push(ROUTES.HOME))
      .catch(error => Alert.alert('Error', error.message || 'PIN confirmation failed'));
  };
  
  return (
    <SafeAreaView className="mt-10">
      <View className="px-4">

      <TouchableOpacity  onPress={()=>{
         router.back();
      }} className="mb-5">
          <View className="bg-gray-300 w-[29.77px] h-[29.77px] rounded-full">
            <Image source={icons.arrowLeft} />
          </View>
          </TouchableOpacity>

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

        <Button
          title="Continue"
          buttonStyle={`h-[50px] w-full ${
            pin.length === 4 ? "bg-primary-300" : "bg-secondary-500"
          }`}
          disabled={pin.length < 4}
          handleClick={handleConfirmPin}
          
        />
      </View>
    </SafeAreaView>
  );
};

export default ConfirmPin;
