import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import Swiper from "react-native-swiper";

// Icons and other constants
import { icons } from "@/constants";

const CurrencyConverter = () => {
  const currencies = [
    {
      name: "US Dollar",
      short: "USD",
      rate: 770.0,
      symbol: "$",
      icon: icons.america,
    },
    {
      name: "Canadian Dollar",
      short: "CAD",
      rate: 590.0,
      symbol: "C$",
      icon: icons.america,
    },
    {
      name: "British Pound",
      short: "GBP",
      rate: 970.0,
      symbol: "£",
      icon: icons.america,
    },
    {
      name: "Euro",
      short: "EUR",
      rate: 850.0,
      symbol: "€",
      icon: icons.america,
    },
    {
      name: "Chinese Yuan",
      short: "CNY",
      rate: 110.0,
      symbol: "¥",
      icon: icons.america,
    },
  ];

  const [currentCurrencyIndex, setCurrentCurrencyIndex] = useState(0);

  // Cycle through currencies every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCurrencyIndex((prev) => (prev + 1) % currencies.length);
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [currencies.length]);

  const currentCurrency = currencies[currentCurrencyIndex];

  return (
    <View className="flex gap-1">
      {/* Currency Conversion Section */}
      <View className="flex flex-row items-center justify-between w-full px-3 h-[64px] border-y-[1px] border-gray-200">
        <View className="flex flex-row items-center justify-start gap-4">
          <Text className="text-[12px] text-secondary-600 font-semibold">
            From
          </Text>

          <View className="flex flex-row items-center justify-between p-3 w-[158px] h-[44px] border border-solid border-gray-100 rounded-[25px] bg-secondary-300">
            <Image
              source={icons.nigeria}
              resizeMode="contain"
              className="w-[24px] h-[24px]"
            />
            <Text className="text-[12px] text-[#303030] font-semibold">
              Nigeria Naira
            </Text>
            <Image source={icons.dropDown} resizeMode="contain" />
          </View>
        </View>

        {/* Updated Converted Amount */}
        <Text className="text-[16px] text-[#303030] font-bold">
          ₦{currentCurrency.rate.toLocaleString()}
        </Text>
      </View>

      <View className="relative">
        <Image
          source={icons.exchange}
          className="absolute right-[90px] top-[-27px] z-10"
          resizeMode="contain"
        />
      </View>

      <View className="flex flex-row items-center justify-between w-full px-3 h-[64px] border-y-[1px] border-gray-200">
        <View className="flex flex-row items-center justify-start gap-8">
          <Text className="text-[12px] text-secondary-600 font-semibold">
            To
          </Text>

          <View className="flex flex-row items-center justify-between p-3 w-[158px] h-[44px] border border-solid border-gray-100 rounded-[25px] bg-secondary-300">
            <Image
              source={currentCurrency.icon}
              resizeMode="contain"
              className="w-[24px] h-[24px]"
            />
            <Text className="text-[12px] text-[#303030] font-semibold">
              {currentCurrency.name}
            </Text>
            <Image source={icons.dropDown} resizeMode="contain" />
          </View>
        </View>

        {/* Updated Currency and Symbol */}
        <Text className="text-[16px] text-[#303030] font-bold">
          {currentCurrency.symbol}1.00
        </Text>
      </View>

      {/* Swiper Section */}
      <Swiper
        showsButtons={false}
        dotStyle={{ backgroundColor: "#ccc", width: 8, height: 8 }}
        activeDotStyle={{ backgroundColor: "#3555F5", width: 8, height: 8 }}
        autoplay
        autoplayTimeout={5}
        loop
        style={{ height: 100 }}
      >
        {currencies.map((currency, index) => (
          <View
            key={index}
            className="flex items-center justify-center h-full"
          >
            <Text className="text-[16px] text-secondary-500 font-bold">
              {currency.short} - ₦{currency.rate.toLocaleString()}
            </Text>
          </View>
        ))}
      </Swiper>
    </View>
  );
};

export default CurrencyConverter;
