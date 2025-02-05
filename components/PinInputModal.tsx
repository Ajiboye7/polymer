import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Image } from "react-native";
import { BlurView } from "expo-blur";
import { icons } from "@/constants";

interface PinInputModalProps {
  isVisible: boolean;
  onClose: () => void;
  onPinEntered: (pin: string) => void;
}

const PinInputModal: React.FC<PinInputModalProps> = ({
  isVisible,
  onClose,
  onPinEntered,
}) => {
  const [pin, setPin] = useState<string[]>(["", "", "", ""]);

  const handleNumberPress = (number: string) => {
    const emptyIndex = pin.findIndex((digit) => digit === "");
    if (emptyIndex !== -1) {
      const updatedPin = [...pin];
      updatedPin[emptyIndex] = number;
      setPin(updatedPin);

      if (updatedPin.join("").length === 4) {
        setTimeout(() => {
          onClose();
          onPinEntered(updatedPin.join(""));
          setPin(["", "", "", ""]);
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
    <Modal transparent animationType="slide" visible={isVisible}>
      <BlurView
              intensity={30}
              tint="dark"
              className="flex-1 justify-end items-center"
            >
              <View className="bg-white rounded-t-2xl p-6 absolute bottom-0 w-full">
        <View className="flex-row justify-between mb-4">
          <Text className="text-xl text-center">Enter Transaction PIN</Text>
          <TouchableOpacity onPress={onClose}>
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

        {/* Custom Numeric Keyboard */}
        <View className="flex-wrap flex-row justify-center">
  {/* First Row: 1, 2, 3 */}
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

  {/* Second Row: 4, 5, 6 */}
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

  {/* Third Row: 7, 8, 9 */}
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

  {/* Fourth Row: 0 and Delete Button */}
  <View className="flex-row w-full justify-center">
    {/* Empty Space for Alignment */}
    <View className="w-[30%] p-4 m-2" />

    {/* 0 Button */}
    <TouchableOpacity
      onPress={() => handleNumberPress("0")}
      className="w-[30%] p-4 m-2"
    >
      <Text className="text-2xl text-center">0</Text>
    </TouchableOpacity>

    {/* Delete Button */}
    <TouchableOpacity
      onPress={handleDeletePress}
      className="w-[30%] p-4 m-2"
    >
      <Image source={icons.del} resizeMode="contain" />
    </TouchableOpacity>
  </View>
</View>
      </View>
            </BlurView>
      
    </Modal>
  );
};

export default PinInputModal;
