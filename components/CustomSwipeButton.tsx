import React from "react";
import { View, Text } from "react-native";
import SwipeButton from "rn-swipe-button";
import { icons } from "@/constants";


interface CustomSwipeButtonProps {
  title: string;
  onSwipeSuccess: () => void; // Function executed on successful swipe
  titleStyles?: object; // Optional title styling
  containerStyles?: object; // Optional container styling
}

const CustomSwipeButton: React.FC<CustomSwipeButtonProps> = ({
  title,
  onSwipeSuccess,
  titleStyles,
  containerStyles,
}) => {
  return (
    <View>
      <SwipeButton
        thumbIconBackgroundColor="white"
        thumbIconImageSource={icons.arrowRight}
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
    </View>
  );
};

export default CustomSwipeButton;
