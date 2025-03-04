import { View, Text, ImageBackground, Image, ScrollView } from "react-native";
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

const LocalBankDetails = () => {
  const router = useRouter();

  const [isPinInputVisible, setPinInputVisible] = useState(false);
  const [details, setDetails] = useState({
    remark: "",
    accountNumber: "",
  });

  const handleSwipeSuccess = () => {
    router.replace(ROUTES.TRANSFER_SUCCESSFUL)
  };

  const handlePinVerified = (pin: string) => {
    alert(`PIN Verified: ${pin}! Proceeding to payment...`);
    router.push("/(tabs)/home");
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
              <Text className="text-white text-[25px] font-gilroyBold ">
                0325642061
              </Text>
              <View className="flex flex-row items-center justify-center rounded-full space-x-2 w-[85px] h-[40px] bg-white">
                <Image source={icons.gtBank} resizeMode="contain" />
                <Text className="">GTB</Text>
              </View>
            </View>

            <View className="flex flex-row items-center space-x-1  ">
              <Image source={icons.success} resizeMode="contain" />

              <Text className="text-white text-[16px] font-gilroyBold">
                Ajiboye Muyideen Olanrewaju
              </Text>
            </View>
          </View>

          <View className="mb-16">
            <InputField
              title="Account Number"
              placeholder="1234567890"
              value={details.accountNumber}
              handleChangeText={(value) =>
                setDetails({ ...details, accountNumber: value })
              }
              keyboardType="numeric"
              textContentType="none"
            />

            <InputField
              title="Bank Name"
              placeholder="Select your bank name"
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
          onPinEntered={handlePinVerified}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default LocalBankDetails;
