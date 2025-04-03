import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import { router } from "expo-router";
import { ROUTES } from "@/constants/routes";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { identityNumber } from "@/redux/slices/authSlice";

const InputIdentity = () => {
  const [identityNumber, setIdentityNumber] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user._id

  {/*const handleContinue = async () => {
    try {
      if (!IdentityNumber) {
        Alert.alert("Error", "Please input your Identity Number");

        return;
      }

      console.log(IdentityNumber);

      if (!user?._id) {
        Alert.alert("Error", "User not found");
       // console.log("User in handleContinue:", user);
        return;
      }

      //console.log("User in handleContinue:", user);

      try {
        await dispatch(
          identityNumber({
            userId: user._id,
            identityNumber: IdentityNumber,
          })
        ).unwrap();

        router.push(ROUTES.CREATE_FOUR_DIGIT_PIN);
      } catch (error) {
        Alert.alert("Error", "Failed to add identity. Please try again.");
        console.error("Error adding identity:", error);
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
      console.error("Unexpected error:", error);
    }
  };*/}
  const handleContinue = () => {
    if (!identityNumber) return Alert.alert('Error', 'Please input your Identity Number');
    if (!userId) return Alert.alert('Error', 'User not found');
  
    dispatch(identityNumber({ userId, identityNumber: identityNumber }))
      .unwrap()
      .then(() => router.push(ROUTES.CREATE_FOUR_DIGIT_PIN))
      .catch(error => Alert.alert('Error', error.message || 'Failed to add identity'));
  };
  return (
    <SafeAreaView className="mx-3 pt-5">
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
          Verify Identity
        </Text>
        <Text className="text-[14px] text-secondary-600 leading-[20px] w-[358px] mb-5">
          Let’s get you verified and get your payments {"\n"}
          international.
        </Text>
      </View>
      <InputField
        title="Identity Number"
        placeholder="Enter your BVN"
        value={IdentityNumber}
        handleChangeText={(value) => setIdentityNumber(value)}
        keyboardType="numeric"
        textContentType="none"
      />

      <Button
        title="Continue"
        buttonStyle="w-full h-[49.77px] mt-8"
        handleClick={handleContinue}
      />
    </SafeAreaView>
  );
};

export default InputIdentity;
