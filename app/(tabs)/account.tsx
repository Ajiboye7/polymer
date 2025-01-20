/*import React, { useState } from "react";
import { SafeAreaView, View, Text, StatusBar } from "react-native";
import { icons } from "@/constants";

import SwipeButton from "rn-swipe-button";

const App: React.FC = () => {
  const defaultStatusMessage = "Swipe status appears here";
  const [swipeStatusMessage, setSwipeStatusMessage] =
    useState(defaultStatusMessage);

  const updateSwipeStatusMessage = (message: string) =>
    setSwipeStatusMessage(message);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View className="mt-16">
          <SwipeButton
            thumbIconBackgroundColor="white"
            thumbIconImageSource={icons.arrowRight}
            thumbIconBorderColor="white"
            railBackgroundColor="#F8F8F8"
            railBorderColor="transparent"
            title="Proceed to bank details"
            titleStyles={{
              color: "#184484",
              fontSize: 16,
              fontWeight: "bold",
            }}
            shouldResetAfterSuccess
            onSwipeFail={() => updateSwipeStatusMessage("Incomplete swipe!")}
            onSwipeStart={() => updateSwipeStatusMessage("Swipe started!")}
            onSwipeSuccess={() =>
              updateSwipeStatusMessage("Submitted successfully!")
            }
          />

          <Text>{swipeStatusMessage}</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;*/

import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import CustomSwipeButton from "@/components/CustomSwipeButton";
import { icons } from "@/constants";

const App: React.FC = () => {
  const [isPinInputVisible, setPinInputVisible] = useState(false);
  const [pin, setPin] = useState("");

  const handleSwipeSuccess = () => {
    // Show PIN input when swipe is successful
    setPinInputVisible(true);
  };

  const handlePinChange = (value: string) => {
    setPin(value);
    if (value.length === 4) {
      // PIN complete; you can add your logic here (e.g., validate PIN)
      console.log("PIN Entered:", value);
      setPinInputVisible(false); // Optionally hide the PIN input
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        style={{ flex: 1, justifyContent: "center", paddingHorizontal: 20 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View>
          {!isPinInputVisible ? (
            <CustomSwipeButton
              title="Proceed to enter PIN"
              onSwipeSuccess={handleSwipeSuccess}
            />
          ) : (
            <View>
              <Text className="text-[32px] text-primary-300 font-bold">
                Enter your 4-Digit PIN
              </Text>
              <Text className="text-[14px] text-secondary-600 my-5">
                Enter your PIN to make transfer
              </Text>

              {/* PIN Dots */}
              <View className="flex-row justify-around items-center mb-8 bg-gray-200 w-[140px] h-[50px] rounded-[10px] self-center">
                {Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <View
                      key={index}
                      className={`w-[10px] h-[10px] rounded-full ${
                        pin.length > index ? "bg-primary-300" : "bg-secondary-700"
                      }`}
                    />
                  ))}
              </View>

              {/* Hidden Text Input */}
              <TextInput
                style={{ opacity: 0, position: "absolute" }}
                keyboardType="numeric"
                maxLength={4}
                value={pin}
                onChangeText={handlePinChange}
                autoFocus
              />
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default App;
