import React, { Children, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  ImageBackground,
  Modal,
} from "react-native";
import { icons, images } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import Button from "./Button";
import { Link, useRouter } from "expo-router";
import { ROUTES } from "@/constants/routes";
import { UseDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";


const  HomeBackground = () => {

  const router = useRouter();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const [isBusiness, setIsBusiness] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleSwitch = () => {
    setIsBusiness((prev) => !prev);
    if (!isBusiness) {
      setModalVisible(true);
    }
  };

  const handleCancel = () => {
    setIsBusiness(false);
    setModalVisible(false);
  };

  const user = useSelector((state: RootState)=> state.auth.user)

  const userName = user?.name

  return (
    <SafeAreaView className="bg-primary-300">
      <View className="flex flex-row items-center justify-between px-3 mt-10">
        <View className="flex flex-row items-center justify-start gap-3">
          <Image
            source={icons.profile}
            resizeMode="contain"
            className="w-[50px] h-[50px]"
          />

          <Text className="text-[16px] font-gilroyBold text-white">
            Hi, {userName}
          </Text>
        </View>

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

      <Text className="text-[25px] font-gilroyBold text-white my-3 ml-3">
        My Balance
      </Text>

      <ImageBackground
        source={images.balanceBg}
        className=" w-full h-[91px] justify-center"
      >
        <View className="ml-3">
          <View className="flex flex-row items-center gap-2 mb-2">
            <Image source={icons.nigeria} resizeMode="contain" />
            <Text className="text-[#7E95B7] ">Ngerian Naira</Text>
          </View>
          <Text className="text-[25px] font-gilroyBold text-white">
            ₦ 113,000.00
          </Text>
        </View>
      </ImageBackground>

      <View className="flex flex-row items-center justify-around mt-5">
        <TouchableOpacity onPress={()=>{
          router.push(ROUTES.FUND_ACCOUNT)
        }}>
          <View className="space-y-2">
            <Image source={icons.add} resizeMode="contain" />
            <Text className="text-[12px] text-secondary-600">Fund</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity >
          <View className="space-y-2">
            <Image source={icons.send2} resizeMode="contain" />
            <Text className="text-[12px] text-secondary-600">Send</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View className="space-y-2">
            <Image source={icons.rates} resizeMode="contain" />
            <Text className="text-[12px] text-secondary-600">Rates</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <BlurView
          intensity={30}
          tint="dark"
          className="flex-1 justify-end items-center"
        >
          <View className="w-[358px] h-[330px] bg-white rounded-lg px-4 py-5  mb-5">
            <Image source={icons.modalBusinessImage} className="w-16 h-16 mb-4 mx-auto"/>
            <Text className="text-[20px] text-center font-bold text-gray-900">
              Set Up Your Business Profile
            </Text>
            <Text className="text-[12px] text-center text-secondary-500 mt-2 mb-4 leading-[25px] font-semibold">
              Hey there! We noticed you haven’t set up your business {'\n'} profile.
              Set it up now to start making payments in the {'\n'} name of your
              business.
            </Text>


            <Button title="Set up now"
             buttonStyle=" h-[49.77px] w-full my-3 bg-primary-200"
             
             handleClick={() => setModalVisible(false)} />

            <TouchableOpacity onPress={handleCancel} className="mt-4">
              <Text className="text-[16px] text-primary-200 font-gilroyBold text-center ">Not Now</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeBackground;

