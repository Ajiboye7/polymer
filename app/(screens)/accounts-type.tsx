import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { ROUTES } from "@/constants/routes";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { accountType as accountMode } from "@/redux/slices/authSlice";

const AccountType = () => {

  const [accountType, setAccountType]= useState < "business" | "regular" | null>(null)
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user._id

  const router = useRouter()

  const handleAccountType = () =>{
    if(!accountType) return Alert.alert('Error', 'please select an account type')
    if(!userId) return Alert.alert('Error', 'User not found')

      dispatch(accountMode({userId, accountType}))
      .unwrap()
      .then(()=>router.push(ROUTES.HOME))
      .catch(error => Alert.alert('Error', error.message || 'Failed to add account type'))
  }
  return (
    <SafeAreaView className="px-3 mt-8">
      <Text className="text-[32px] text-primary-300 font-gilroyBold ">What suits you?</Text>
      <Text className="text-[14px] leading-[20px] text-secondary-600 my-5">
        Are you a business owner or a regular user? Let’s get to know what suits
        you.
      </Text>

      <View className="flex flex-row gap-3">
        <TouchableOpacity 
        onPress={() => setAccountType("business")}
        >
          <View className= {`w-[170px] h-[170px] items-center justify-center rounded-[25px] ${accountType === "business" ? "bg-tertiary" : "bg-gray-200"}` }>
            <Image
              source={icons.businessOwner}
              className="w-[80px] h-[80px]"
              resizeMode="contain"
            />
            <Text className="text-[14px] text-secondary-600 mt-3">Business Owner</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
        onPress={()=> setAccountType("regular")}
        >
          <View className={`w-[170px] h-[170px] items-center justify-center rounded-[25px] ${ accountType === "regular" ? "bg-tertiary" : "bg-gray-200"}`}>
            <Image
              source={icons.regularUser}
              className="w-[80px] h-[80px]"
              resizeMode="contain"
            />
            <Text className="text-[14px] text-secondary-600 mt-3 ">Regular User</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Button 
      disabled={!accountType}
      title="Get Started"
      buttonStyle={`w-full h-[49.77px] mt-10  ${accountType ? "bg-primary-300" : "bg-secondary-600"}`}
      handleClick={handleAccountType}
      />
    </SafeAreaView>
  );
};

export default AccountType;
