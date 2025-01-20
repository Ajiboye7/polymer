import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import * as Clipboard from "expo-clipboard";

const Payment = () => {
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView className="flex-1 bg-primary-200">
          <View className="h-[25%]">
            <ImageBackground
              source={images.BgBoxes}
              className=" h-[91px] justify-center "
            >
              <View className="px-4">
                <Text className="text-[#7E95B7] text-[16px] font-gilroyBold leading-[20px]">
                  Hi, User
                </Text>
                <Text className="text-white text-[18px] font-gilroyBold leading-[25px]">
                  What kind of payments would you like to make today?
                </Text>
              </View>
            </ImageBackground>
          </View>

          <View className=" space-y-4 rounded-t-[30px] px-3 py-5 pt-6 -mt-12 bg-white">
            <TouchableOpacity>
              <Image
                source={images.internationalTransfer}
                className="h-[240px] w-full "
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image
                source={images.localTransfer}
                className="h-[240px] w-full"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default Payment;
