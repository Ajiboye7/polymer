import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState } from "react";
import { images } from "@/constants";
import { icons } from "@/constants";

interface TransferHeaderProps {
  title?: string;
  headerStyle?: string
}

const TransferHeader: React.FC<TransferHeaderProps> = ({ title, headerStyle }) => {
  const [isBusiness, setIsBusiness] = useState(false);

  const toggleSwitch = () => setIsBusiness((prevState) => !prevState);

  return (
    <View className={`h-[20%] px-3 ${headerStyle}` }>
      <ImageBackground
        source={images.BgBoxes}
        className="w-full h-[91px] justify-center"
      >
        <View className="flex flex-row items-center justify-between">
          <TouchableOpacity>
            <Image source={icons.arrowLeft} resizeMode="contain" />
          </TouchableOpacity>

          <Text className="text-[20px] font-gilroyBold text-primary-300">
            {title}
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
  );
};

export default TransferHeader;
