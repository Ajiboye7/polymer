import HomeScreen from "@/components/HomeScreen";

const Home = () => {
  return <HomeScreen />;
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
