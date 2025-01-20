import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
  ScrollView
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "@/constants";
import * as Clipboard from "expo-clipboard";


const FundAccount = () => {
  const [isBusiness, setIsBusiness] = useState(false);

  const toggleSwitch = () => setIsBusiness((prevState) => !prevState);

  const accountNumber = "0235676005";

  const handleCopyToClipboard = async () => {
    await Clipboard.setStringAsync(accountNumber);
    Alert.alert("Copied!", "Account number copied to clipboard.");
  };

  return (
    <ScrollView>
      <SafeAreaView className=" flex-1 white">
      <View className="h-[25%] px-3">
      <ImageBackground
        source={images.BgBoxes}
        className="w-full h-[91px] justify-center"
      >
        <View className="flex flex-row items-center justify-between">
          <TouchableOpacity>
            <Image source={icons.arrowLeft} resizeMode="contain" />
          </TouchableOpacity>

          <Text className="text-[20px] font-gilroyBold text-primary-300">
            Fund Account
          </Text>

          <View className="w-[46.25px] h-[25px] bg-white rounded-full flex-row justify-between items-center px-[4px] relative">
            <Image
              source={icons.regularUser}
              className={`w-[14px] h-[14px] ${
                isBusiness ? "opacity-50" : "opacity-100"
              }`}
              resizeMode="contain"
            />
            <Image
              source={icons.businessOwner}
              className={`w-[14px] h-[14px] ${
                isBusiness ? "opacity-100" : "opacity-50"
              }`}
              resizeMode="contain"
            />

            <TouchableOpacity
              onPress={toggleSwitch}
              className={`w-[18px] h-[18px] bg-[#5BBE8A] rounded-full absolute ${
                isBusiness ? "right-[2px]" : "left-[2px]"
              } shadow-md`}
            />
          </View>
        </View>
      </ImageBackground>
      </View>
      

      <View className="bg-primary-300  rounded-t-[20px] px-3 -mt-12 pb-5">
        <Text className="text-[20px] text-white font-gilroyBold mt-6 mb-5 ">
          My Account Number
        </Text>
        <View className="px-3 mb-6 flex flex-row items-center justify-between h-[90px] bg-primary-200 rounded-[20px]  ">
          <View className="flex gap-2">
            <Text className="text-[12px] text-[#7E95B7] ">Account Number</Text>
            <View className="flex flex-row items-center">
              <Text className="text-[25px] font-gilroyExtraBold text-white">
                {accountNumber}
              </Text>
              <TouchableOpacity onPress={handleCopyToClipboard}>
                <Image source={icons.copy} />
              </TouchableOpacity>
            </View>
          </View>
          <View className="w-[94.86px] h-[40px] items-center justify-center bg-white rounded-[25px]">
            <Image source={icons.sterling} />
          </View>
        </View>

        <ImageBackground
          source={images.balanceBg}
          className="-mx-3 px-3 h-[91px] justify-center items-start"
        >
          <View className="flex gap-2 ">
            <Text className="text-[12px] text-secondary-600">Account Name</Text>
            <Text className="text-[25px] font-gilroyBold text-white">
              Ajiboye Muyideen
            </Text>
          </View>
        </ImageBackground>

        <View className="flex flex-row items-center justify-start pl-2 h-[60px] bg-white rounded-[50px] my-10">
          <TouchableOpacity className="mr-6 ">
            <View className="bg-primary-200 w-[41.67px] h-[41.67px] items-center justify-center rounded-full">
              <Image source={icons.share} resizeMode="contain" />
            </View>
          </TouchableOpacity>

          <Text className="text-[16px] font-gilroySemiBold">
            Share Account Information
          </Text>
        </View>

        <View className=" px-5 flex flex-row items-center justify-start bg-secondary-500 rounded-[20px] h-[80px] ">
          <View className="flex flex-row items-center  gap-2">
            <TouchableOpacity>
              <Image source={icons.setting} />
            </TouchableOpacity>
            <Text className="text-[12px] font-interItalic text-secondary-100 w-[288px]">
              When you deposit directly into this account, it reflects on your
              Naira account balance.
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
    </ScrollView>
    
  );
};

export default FundAccount;
