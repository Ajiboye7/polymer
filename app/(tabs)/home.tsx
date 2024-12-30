import React, { Children, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  ImageBackground,
} from "react-native";
import { icons, images } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';


const Home = () => {
  const bottomSheetRef = useRef<BottomSheet>(null)

  const [isBusiness, setIsBusiness] = useState(false);

  const toggleSwitch = () => setIsBusiness((prevState) => !prevState);

  return (
    <SafeAreaView className="bg-primary-300 h-full">
      <View className="flex flex-row items-center justify-between px-3">
        <View className="flex flex-row items-center justify-start gap-3">
          <Image source={icons.profile} resizeMode="contain"  className="w-[50px] h-[50px]"/>

          <Text className="text-[16px] font-gilroyBold text-white">
            Hi, User
          </Text>
        </View>

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

      <Text className="text-[25px] font-gilroyBold text-white my-3 ml-3">
        My Balance
      </Text>

      <ImageBackground
        source={images.balanceBg}
        className=" w-full h-[91px] justify-center"
      >
        <View className="ml-3">
          <View className="flex flex-row items-center gap-2 mb-2">
            <Image source={icons.nigeria} resizeMode="contain" />
            <Text className="text-[#7E95B7] ">Ngerian Naira</Text>
          </View>
          <Text className="text-[25px] font-gilroyBold text-white">
            ₦ 113,000.00
          </Text>
        </View>
      </ImageBackground>

      <View className="flex flex-row items-center justify-around mt-5">
        <TouchableOpacity>
          <View className="gap-2">
            <Image source={icons.add} resizeMode="contain" />
            <Text className="text-[12px] text-secondary-600">Fund</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View className="gap-2">
            <Image source={icons.send2} resizeMode="contain" />
            <Text className="text-[12px] text-secondary-600">Send</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View className="gap-2">
            <Image source={icons.rates} resizeMode="contain" />
            <Text className="text-[12px] text-secondary-600">Rates</Text>
          </View>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default Home;



/*  Activity Indicator
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";

const CurrencyConversion = () => {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExchangeRates = async () => {
    try {
      const response = await fetch(
        `http://apilayer.net/api/live?access_key=bc2ede9430e854841f41172d7f67b91d&currencies=EUR,GBP,CAD,CNY,NGN&source=USD&format=1`
      );
      const data = await response.json();

      if (data.success) {
        const rates = data.quotes;
        const formattedRates = [
          { currency: "EUR", rate: rates.USDEUR },
          { currency: "GBP", rate: rates.USDGBP },
          { currency: "CAD", rate: rates.USDCAD },
          { currency: "CNY", rate: rates.USDCNY },
          { currency: "NGN", rate: rates.USDNGN },
        ];
        setExchangeRates(formattedRates);
      } else {
        console.error("Error fetching exchange rates:", data.error);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
    const interval = setInterval(fetchExchangeRates, 60000); // Refresh every 60 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#3555F5" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 px-5 py-10">
      <Text className="text-[20px] font-bold text-center mb-5">
        Currency Conversions
      </Text>

      <FlatList
        data={exchangeRates}
        keyExtractor={(item) => item.currency}
        renderItem={({ item }) => (
          <View className="flex-row justify-between items-center bg-white mb-3 p-4 rounded-lg shadow-sm">
            <Text className="text-[16px] font-semibold">{item.currency}</Text>
            <Text className="text-[16px] text-primary-500">
              {item.rate.toFixed(2)} NGN
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default CurrencyConversion;

 */
