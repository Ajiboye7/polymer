import React, { useRef, useEffect } from "react";
import { View, Text, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import Button from "@/components/Button";
import { useRouter } from "expo-router";

const BusinessProfileAnimation = () => {
  const router = useRouter(); 
  //const imagePosition = useRef(new Animated.Value(0)).current;
  const imagePosition = useRef(new Animated.Value(0)).current;
  const textPosition = useRef(new Animated.Value(-100)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(imagePosition, {
        toValue: -50,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(textPosition, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        router.push("/home"); 
      }, 3000);
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white">
      <Animated.Image
        source={images.profileCreationImage}
        style={{
          width: 100,
          height: 100,
          transform: [{ translateX: imagePosition }],
        }}
      />
      <Animated.Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          opacity: textOpacity,
          transform: [{ translateY: textPosition }],
        }}
      >
        Polymer
      </Animated.Text>
      <Animated.Text
        style={{
          position: "absolute",
          bottom: 50,
          left: 20,
          opacity: textOpacity,
          transform: [{ translateX: textPosition }],
        }}
      >
        Taking your business global!
      </Animated.Text>
      <Button title="Skip Animation" handleClick={() => router.push("/home")} />
    </SafeAreaView>
  );
};

export default BusinessProfileAnimation;
