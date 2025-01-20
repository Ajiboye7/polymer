import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "@/constants";
import * as Clipboard from "expo-clipboard";
import InputField from "@/components/InputField";
//import SwipeButton from "@/components/SwipeButton";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SwipeButton from "rn-swipe-button";

const BankDetails = () => {
  const [form, setForm] = useState({
    bankName: "",
    recipientName: "",
    accountNumber: "",
    branchCode: "",
    remark: "",
  });

  const handleSwipeComplete = () => {
    console.log("Swipe action completed!");
    // Navigate to the next screen or perform any desired action.
  };

  const [isBusiness, setIsBusiness] = useState(false);

  const toggleSwitch = () => setIsBusiness((prevState) => !prevState);

  const accountNumber = "0235676005";

  const handleCopyToClipboard = async () => {
    await Clipboard.setStringAsync(accountNumber);
    Alert.alert("Copied!", "Account number copied to clipboard.");
  };

  return (
    <ScrollView>
      <SafeAreaView className="flex-1 white">
        <View className="h-[20%] px-3">
          <ImageBackground
            source={images.BgBoxes}
            className="w-full h-[91px] justify-center"
          >
            <View className="flex flex-row items-center justify-between">
              <TouchableOpacity>
                <Image source={icons.arrowLeft} resizeMode="contain" />
              </TouchableOpacity>

              <Text className="text-[20px] font-gilroyBold text-primary-300">
                Bank Detail
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

        <View className="bg-primary-300 rounded-t-[20px] px-3 -mt-12">
          <View>
            <InputField
              title="Bank Name"
              placeholder="Select your bank name"
              value={form.bankName}
              handleChangeText={(value) =>
                setForm({ ...form, bankName: value })
              }
              keyboardType="default"
              textContentType="name"
            />

            <InputField
              title="Receipt Name"
              placeholder="John Doe"
              value={form.recipientName}
              handleChangeText={(value) =>
                setForm({ ...form, recipientName: value })
              }
              keyboardType="default"
              textContentType="name"
            />

            <InputField
              title="Account Number"
              placeholder="1234567890"
              value={form.accountNumber}
              handleChangeText={(value) =>
                setForm({ ...form, accountNumber: value })
              }
              keyboardType="numeric"
              textContentType="none"
            />

            <InputField
              title="Branch Code"
              placeholder="35699"
              value={form.branchCode}
              handleChangeText={(value) =>
                setForm({ ...form, branchCode: value })
              }
              secureTextEntry={true}
              keyboardType="numeric"
              textContentType="none"
            />

            {/*<GestureHandlerRootView style={{ flex: 1 }}>
              <SwipeButton
                text="Swipe to Unlock"
                showKeyboard={true}
                onSwipeComplete={() => console.log("Swipe Completed!")}
              />
            </GestureHandlerRootView>*/}

<View className="flex-1 justify-center items-center bg-gray-200 p-4">
      <Text className="text-lg font-bold text-gray-700 mb-4">
        Slide to Complete
      </Text>
      <SwipeButton
        text="Swipe to Confirm"
        onSwipeSuccess={() => Alert.alert("Success", "Payment Confirmed!")}
        thumbIconBackgroundColor="white"
        thumbIconBorderColor="gray"
        railBackgroundColor="#D1D5DB" // Tailwind `bg-gray-300`
        railFillBackgroundColor="#10B981" // Tailwind `bg-green-500`
        railFillBorderColor="#10B981"
        titleColor="#111827" // Tailwind `text-gray-900`
        titleFontSize={16}
        style={{
          height: 60,
        }}
        className="w-full rounded-lg"
      />
    </View>

            <InputField
              title="Remarks (Optional)"
              placeholder="Enter note (within 200 characters)"
              value={form.remark}
              handleChangeText={(value) => setForm({ ...form, remark: value })}
              secureTextEntry={true}
              keyboardType="default"
              textContentType="name"
            />
          </View>

          <TouchableOpacity>
            <View className="flex flex-row items-center justify-start mt-8 mb-12 pl-2 h-[60px] bg-white rounded-[50px]">
              <TouchableOpacity className="mr-6 ">
                <Image source={icons.arrowRight} resizeMode="contain" />
              </TouchableOpacity>

              <Text className="text-[16px] font-gilroySemiBold">
                Proceed to bank details
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default BankDetails;
