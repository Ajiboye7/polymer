import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import axios from "axios";

const { width } = Dimensions.get("window");

interface ExchangeRate {
  currency: string;
  rate: number;
}

const CurrencyConversionSwiper: React.FC = () => {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);
  const [currentCurrency, setCurrentCurrency] = useState<string>("USD");
  const [currentRate, setCurrentRate] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchExchangeRates = async (): Promise<void> => {
    try {
      const response = await axios.get(
        "https://api.freecurrencyapi.com/v1/latest",
        {
          params: {
            apikey: "fca_live_bI6zOcQeLTdG5tKru30UB1UiBIabBQbZJmxJT7Bk",
          },
        }
      );

      const data = response.data;
      const rates = data.data;

      // Format rates for the required currencies
      const formattedRates: ExchangeRate[] = [
        { currency: "USD", rate: 1 }, // Base currency
        { currency: "EUR", rate: rates.EUR },
        { currency: "GBP", rate: rates.GBP },
        { currency: "CAD", rate: rates.CAD },
        { currency: "CNY", rate: rates.CNY },
        { currency: "NGN", rate: rates.NGN },
      ];

      setExchangeRates(formattedRates);
      setCurrentRate(rates.NGN); // Initialize with Naira rate
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const handleCurrencyChange = (index: number): void => {
    if (exchangeRates.length > 0) {
      const selectedCurrency = exchangeRates[index];
      setCurrentCurrency(selectedCurrency.currency);
      setCurrentRate(selectedCurrency.rate);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#3555F5" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 justify-center items-center">
      {/* Top Section: Naira Conversion */}
      <View className="mb-5">
        <Text className="text-[24px] font-bold text-primary-500">
          {`₦ ${(currentRate * 1).toFixed(2)}`}
        </Text>
        <Text className="text-[16px] text-gray-600">
          1 {currentCurrency} = {`₦ ${(currentRate * 1).toFixed(2)}`}
        </Text>
      </View>

      {/* Swiper Section: Currency Carousel */}
      <View className="h-[100px] w-full">
        <Swiper
          loop={true}
          autoplay={true}
          autoplayTimeout={3}
          showsPagination={false}
          onIndexChanged={(index) => handleCurrencyChange(index)}
        >
          {exchangeRates.map((item, index) => (
            <View
              key={index}
              className="flex justify-center items-center h-[100px] bg-white mx-5 rounded-lg shadow-lg"
            >
              <Text className="text-[20px] font-semibold">{item.currency}</Text>
              <Text className="text-gray-500">1 {item.currency}</Text>
            </View>
          ))}
        </Swiper>
      </View>
    </View>
  );
};

export default CurrencyConversionSwiper;
