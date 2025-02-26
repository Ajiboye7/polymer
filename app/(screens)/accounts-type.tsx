import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { ROUTES } from "@/constants/routes";

const AccountType = () => {

  const [selectedMode, setSelectMode]= useState < "business" | "regular" | null>(null)

  const router = useRouter()
  return (
    <SafeAreaView className="px-3 mt-8">
      <Text className="text-[32px] text-primary-300 font-gilroyBold ">What suits you?</Text>
      <Text className="text-[14px] leading-[20px] text-secondary-600 my-5">
        Are you a business owner or a regular user? Let’s get to know what suits
        you.
      </Text>

      <View className="flex flex-row gap-3">
        <TouchableOpacity 
        onPress={() => setSelectMode("business")}
        >
          <View className= {`w-[170px] h-[170px] items-center justify-center rounded-[25px] ${selectedMode === "business" ? "bg-tertiary" : "bg-gray-200"}` }>
            <Image
              source={icons.businessOwner}
              className="w-[80px] h-[80px]"
              resizeMode="contain"
            />
            <Text className="text-[14px] text-secondary-600 mt-3">Business Owner</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
        onPress={()=> setSelectMode("regular")}
        >
          <View className={`w-[170px] h-[170px] items-center justify-center rounded-[25px] ${ selectedMode === "regular" ? "bg-tertiary" : "bg-gray-200"}`}>
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
      disabled={!selectedMode}
      title="Get Started"
      buttonStyle={`w-full h-[49.77px] mt-10  ${selectedMode ? "bg-primary-300" : "bg-secondary-600"}`}
      handleClick={()=> {
        if(selectedMode){
          router.replace(ROUTES.HOME)
          console.log("Selected Mode :" , selectedMode)
        }
      }}
      />
    </SafeAreaView>
  );
};

export default AccountType;
