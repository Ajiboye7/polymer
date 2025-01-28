
import { useState } from "react";
import { View, Text, KeyboardAvoidingView, Platform, TextInput } from "react-native";
import SwipeButton from "rn-swipe-button";
import { icons } from "@/constants";


interface CustomSwipeButtonProps {
  title: string;
  onSwipeSuccess: () => void;
  titleStyles?: object; 
  containerStyles?: object;
}

const CustomSwipeButton: React.FC<CustomSwipeButtonProps> = ({
  title,
  onSwipeSuccess,
  titleStyles,
  containerStyles,
}) => {

  const [isPinInputVisible, setPinInputVisible] = useState(false);
  const [pin, setPin] = useState("");
  
  const handlePinChange = (value: string) => {
    setPin(value);
    if (value.length === 4) {
  
      console.log("PIN Entered:", value);
      setPinInputVisible(false); 
    }
  };
  return (
    

    <KeyboardAvoidingView
          className="mb-10"
            style={{ flex: 1, justifyContent: "center", paddingHorizontal: 20 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View>
              {!isPinInputVisible ? (
               <SwipeButton
               thumbIconBackgroundColor="white"
               thumbIconImageSource={icons.arrowRight}
               thumbIconBorderColor="transparent"
               railBackgroundColor="#F8F8F8"
               railBorderColor="transparent"
               title={title}
               titleStyles={{
                 color: "#184484",
                 fontSize: 16,
                 fontWeight: "bold",
                 ...titleStyles,
               }}
               containerStyles={containerStyles}
               shouldResetAfterSuccess
               onSwipeSuccess={onSwipeSuccess}
               
             />
              ) : (
                <View>
                  <Text className="text-[32px] text-primary-300 font-bold">
                    Enter your 4-Digit PIN
                  </Text>
                  <Text className="text-[14px] text-secondary-600 my-5">
                    Enter your PIN to make transfer
                  </Text>

                
                  <View className="flex-row justify-around items-center mb-8 bg-gray-200 w-[140px] h-[50px] rounded-[10px] self-center">
                    {Array(4)
                      .fill(0)
                      .map((_, index) => (
                        <View
                          key={index}
                          className={`w-[10px] h-[10px] rounded-full ${
                            pin.length > index
                              ? "bg-primary-300"
                              : "bg-secondary-700"
                          }`}
                        />
                      ))}
                  </View>
                 
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
    
    
  );
};

export default CustomSwipeButton;


{/*<View>
      <SwipeButton
        thumbIconBackgroundColor="white"
        thumbIconImageSource={icons.arrowRight}
        thumbIconBorderColor="transparent"
        railBackgroundColor="#F8F8F8"
        railBorderColor="transparent"
        title={title}
        titleStyles={{
          color: "#184484",
          fontSize: 16,
          fontWeight: "bold",
          ...titleStyles,
        }}
        containerStyles={containerStyles}
        shouldResetAfterSuccess
        onSwipeSuccess={onSwipeSuccess}
        
      />
    </View>*/}