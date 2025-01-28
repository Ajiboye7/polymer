/*import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
  ScrollView,
  Modal,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "@/constants";
import * as Clipboard from "expo-clipboard";
import InputField from "@/components/InputField";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";

const BankDetails = () => {
  const [form, setForm] = useState({
    bankName: "",
    recipientName: "",
    accountNumber: "",
    branchCode: "",
    remark: "",
  });

  const [isPinInputVisible, setPinInputVisible] = useState(false);
  const [pin, setPin] = useState<string[]>(["", "", "", ""]);
  const router = useRouter();

  const handlePaymentButton = () => {
    setPinInputVisible(true);
  };

  const handleNumberPress = (number: string) => {
    const emptyIndex = pin.findIndex((digit) => digit === "");
    if (emptyIndex !== -1) {
      const updatedPin = [...pin];
      updatedPin[emptyIndex] = number;
      setPin(updatedPin);

      if (updatedPin.join("").length === 4) {
        setTimeout(() => {
          setPinInputVisible(false);
          alert("PIN Verified! Proceeding to payment...");
          router.push("/(tabs)/home");
        }, 500);
      }
    }
  };

  const handleDeletePress = () => {
    const lastFilledIndex = pin
      .slice()
      .reverse()
      .findIndex((digit) => digit !== "");
    if (lastFilledIndex !== -1) {
      const updatedPin = [...pin];
      updatedPin[3 - lastFilledIndex] = "";
      setPin(updatedPin);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView className="flex-1 bg-white">
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
            </View>
          </ImageBackground>
        </View>

        <View className="bg-primary-300 rounded-t-[20px] px-3 -mt-12 ">
          <InputField
            title="Bank Name"
            placeholder="Select your bank name"
            value={form.bankName}
            handleChangeText={(value) => setForm({ ...form, bankName: value })}
            keyboardType="default"
          />

          <View className="mt-16 mb-10">
            <TouchableOpacity
              onPress={handlePaymentButton}
              className="bg-blue-500 px-6 py-3 rounded-full"
            >
              <Text className="text-white text-lg text-center">
                Proceed to Payment
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Numeric Keypad Modal 
        <Modal transparent animationType="slide" visible={isPinInputVisible}>
          <BlurView intensity={50} className="absolute inset-0" />
          <View className="bg-white rounded-t-2xl p-6 absolute bottom-0 w-full">
            <View className="flex-row justify-between mb-4">
              <Text className="text-xl text-center">Enter Transaction PIN</Text>
              <TouchableOpacity onPress={() => setPinInputVisible(false)}>
                <Image source={icons.close} resizeMode="contain" />
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-center mb-6">
              {pin.map((digit, index) => (
                <View
                  key={index}
                  className="bg-gray-200 w-10 h-10 mx-2 flex items-center justify-center text-xl rounded-md"
                >
                  <Text className="text-2xl">{digit}</Text>
                </View>
              ))}
            </View>

            {/* Custom Numeric Keyboard 
            <View className="flex-wrap flex-row justify-center">
              {/* First Row: 1, 2, 3 
              <View className="flex-row w-full justify-center">
                {[1, 2, 3].map((num) => (
                  <TouchableOpacity
                    key={num}
                    onPress={() => handleNumberPress(num.toString())}
                    className="w-[30%] p-4 m-2"
                  >
                    <Text className="text-2xl text-center">{num}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Second Row: 4, 5, 6 
              <View className="flex-row w-full justify-center">
                {[4, 5, 6].map((num) => (
                  <TouchableOpacity
                    key={num}
                    onPress={() => handleNumberPress(num.toString())}
                    className="w-[30%] p-4 m-2"
                  >
                    <Text className="text-2xl text-center">{num}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Third Row: 7, 8, 9 
              <View className="flex-row w-full justify-center">
                {[7, 8, 9].map((num) => (
                  <TouchableOpacity
                    key={num}
                    onPress={() => handleNumberPress(num.toString())}
                    className="w-[30%] p-4 m-2"
                  >
                    <Text className="text-2xl text-center">{num}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Fourth Row: 0 and Delete Button 
              <View className="flex-row w-full justify-center">
                {/* Empty Space for Alignment 
                <View className="w-[30%] p-4 m-2" />

                {/* 0 Button 
                <TouchableOpacity
                  onPress={() => handleNumberPress("0")}
                  className="w-[30%] p-4 m-2"
                >
                  <Text className="text-2xl text-center">0</Text>
                </TouchableOpacity>

                {/* Delete Button 
                <TouchableOpacity
                  onPress={handleDeletePress}
                  className="w-[30%] p-4 m-2"
                >
                  <Image source={icons.del} resizeMode="contain" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ScrollView>
  );
};

export default BankDetails;*/

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import { useRouter } from "expo-router";
import PinInputModal from "@/components/PinInputModal";

const BankDetails = () => {
  const [form, setForm] = useState({
    bankName: "",
    recipientName: "",
    accountNumber: "",
    branchCode: "",
    remark: "",
  });

  const [isPinInputVisible, setPinInputVisible] = useState(false);
  const router = useRouter();

  const handlePaymentButton = () => {
    setPinInputVisible(true);
  };

  const handlePinVerified = (pin: string) => {
    alert(`PIN Verified: ${pin}! Proceeding to payment...`);
    router.push("/(tabs)/home");
  };

  return (
    <ScrollView>
      <SafeAreaView className="flex-1 bg-white">
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
            </View>
          </ImageBackground>
        </View>

        <View className="bg-primary-300 rounded-t-[20px] px-3 -mt-12 ">
          <InputField
            title="Bank Name"
            placeholder="Select your bank name"
            value={form.bankName}
            handleChangeText={(value) => setForm({ ...form, bankName: value })}
            keyboardType="default"
          />

          <View className="mt-16 mb-10">
            <TouchableOpacity
              onPress={handlePaymentButton}
              className="bg-blue-500 px-6 py-3 rounded-full"
            >
              <Text className="text-white text-lg text-center">
                Proceed to Payment
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Pin Input Modal */}
        <PinInputModal
          isVisible={isPinInputVisible}
          onClose={() => setPinInputVisible(false)}
          onPinEntered={handlePinVerified}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default BankDetails;
