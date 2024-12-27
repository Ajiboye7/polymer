import { TouchableOpacity, Text, Animated, View, Image } from "react-native";
import React, { useEffect, useRef } from 'react';
import { ButtonProps } from "@/types/types";

const Button = ({
  title,
  icon,
  iconName,
  buttonStyle,
  textStyle,
  handleClick,
  disabled,
}: ButtonProps) => {

    const animatedScale = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(animatedScale, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
          easing: (t) => t * t * t, 
        }).start();
      }, [animatedScale]);

      
  return (
    <Animated.View style={{ transform: [{ scale: animatedScale }] }}>
      <TouchableOpacity
      disabled={disabled}
      onPress={handleClick}
        activeOpacity={0.8}
        className={`flex-row items-center justify-center rounded-lg bg-[#0B274F] px-4 ${buttonStyle}`}
      >
        {iconName && (
          <Image
            className="mr-2"
            src={icon}
          />
        )}
        <Text className={`text-white text-lg ${textStyle}`}>{title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Button;
