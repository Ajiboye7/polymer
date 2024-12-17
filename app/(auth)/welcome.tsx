import { View, Text, ImageBackground, StatusBar, Image, ScrollView } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { images } from "@/constants";
import { onboarding } from "@/constants";
import Button from "@/components/Button";


const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className="flex-1">
        <ScrollView>
        <StatusBar hidden />
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View className="w-[5px] h-[5px] mx-1 bg-gray-300 rounded-full" />}
        activeDot={
          <View className="w-[15px] h-[5px] mx-1 bg-[#0B274F] rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex-1">
            <ImageBackground
              source={images.onboardingBgImg}
              resizeMode="cover"
              className="w-full h-[422px] justify-center items-center"
            >
              <Image
                source={item.image}
                className="w-[250px] h-[250px] mb-6"
                resizeMode="contain"
              />
            </ImageBackground>

            <View className="px-2">
            <View className="items-start ">
              <Text className="text-[32px] text-primary-300 font-bold mb-4 w-[270px] leading-[44.66px]">
                {item.title}
              </Text>

              <Text className="text-[14px] text-secondary-600 font-semibold w-[300px] leading-[25px]">{item.description}</Text>
            </View>

            <View className="my-3">
            <Button title={isLastSlide ? "Get Started" : "Next"}
            buttonStyle="w-[145px] h-[50px]"
            />
            </View>
            
            <Text>Already have an account?  <Text className="text-primary-300 font-bold">Log in</Text></Text>
            </View>
            
          </View>
         
        ))}
      </Swiper>
        </ScrollView>
      
    </SafeAreaView>
  );
};

export default Onboarding;