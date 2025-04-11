import { View, Text, ImageBackground, Image, ScrollView, Alert } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants";
import { images } from "@/constants";
import TransferHeader from "@/components/TransferHeader";
import CustomView from "@/components/CustomView";
import InputField from "@/components/InputField";
import CustomSwipeButton from "@/components/CustomSwipeButton";
import PinInputModal from "@/components/PinInputModal";
import { useRouter } from "expo-router";
import { ROUTES } from "@/constants/routes";
import { useLocalSearchParams } from "expo-router";
import {  useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { confirmPin as verifyPin } from "@/redux/slices/authSlice";


const LocalBankDetails = () => {
  const router = useRouter();
  const params = useLocalSearchParams()

  const {
    bankName = 'GTB',
    accountNumber = '0325642061',
    accountHolder = 'Ajiboye Muyideen Olanrewaju',
    bankIcon = icons.gtBank
  } = params;

  const getBankAcronym = (name: string) => {
    return name.slice(0, 4).toUpperCase();
  };
  


  const [isPinInputVisible, setPinInputVisible] = useState(false);
  const [details, setDetails] = useState({
    remark: "",
    accountNumber: "",
  });

  const handleSwipeSuccess = () => {
    setPinInputVisible(true);
  };

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?._id;

  const handlePinVerified = (pin: string, userId: string) => {
    if (!userId) return Alert.alert('Error', 'User not found');
   
  
    dispatch(verifyPin({ pin, userId }))
      .unwrap()
      .then(() => {
        Alert.alert('Success', `PIN Verified: ${pin}! Proceeding to payment...`);
        router.push(ROUTES.ACCOUNT_TYPE);
      })
      .catch(error => {
        Alert.alert('Error', error.message || 'PIN confirmation failed');
      });
  };
  

  return (
    <ScrollView>
      <SafeAreaView className="flex-1">
        <TransferHeader title="Bank Details" headerStyle="-mb-4" />
        <CustomView className="pb-8">
          <Text className="text-white text-[20px] font-gilroyBold mt-6">
            Transfer from
          </Text>
          <ImageBackground
            source={images.balanceBg}
            className="h-[91px] -mx-3 my-5 pl-3 justify-center"
          >
            <View className="space-y-2 ">
              <View className="flex flex-row items-center space-x-2 ">
                <Image source={icons.nigeria} resizeMode="contain" />
                <Text className="text-[12px] text-secondary-600">
                  Nigeria Naira
                </Text>
              </View>

              <Text className="text-[25px] font-gilroyBold text-white">
                ₦ 113,000.00
              </Text>
            </View>
          </ImageBackground>

          <Text className="text-white text-[20px] font-gilroyBold mb-4">
            Transfer to
          </Text>

          <View className="bg-primary-200 h-[120px] justify-center p-5 rounded-[20px]">
        <Text className="text-[12px] text-[#7E95B7]">Account Number</Text>
        <View className="flex flex-row items-center justify-between">
          <Text className="text-white text-[25px] font-gilroyBold">
            {accountNumber}
          </Text>
          <View className="flex flex-row items-center justify-center rounded-full space-x-2 w-[85px] h-[40px] bg-white">
            <Image source={bankIcon} resizeMode="contain" />
            <Text className="">{getBankAcronym(bankName.toString())}</Text>
          </View>
        </View>

        <View className="flex flex-row items-center space-x-1">
          <Image source={icons.success} resizeMode="contain" />
          <Text className="text-white text-[16px] font-gilroyBold">
            {accountHolder}
          </Text>
        </View>
      </View>

          <View className="mb-16">
            <InputField
              title="Amount"
             // placeholder="1234567890"
              value={details.accountNumber}
              handleChangeText={(value) =>
                setDetails({ ...details, accountNumber: value })
              }
              keyboardType="numeric"
              textContentType="none"
            />

            <InputField
              title="Remarks(optional)"
              placeholder="Enter note (Within 50 Characters)"
              value={details.remark}
              handleChangeText={(value) =>
                setDetails({ ...details, remark: value })
              }
              keyboardType="default"
              textContentType="none"
            />
          </View>
          <View className="mb-10">
          <CustomSwipeButton
            title="Proceed to pay"
            onSwipeSuccess={handleSwipeSuccess}
          />
          </View>
          
        </CustomView>

        <PinInputModal
          isVisible={isPinInputVisible}
          onClose={() => setPinInputVisible(false)}
          onPinEntered={(pin) => handlePinVerified(pin, userId)}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default LocalBankDetails;
