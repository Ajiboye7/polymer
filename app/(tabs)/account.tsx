import {
  View,
  Text,
  Image,
  ImageBackground,
  Switch,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TransferHeader from "@/components/TransferHeader";
import CustomView from "@/components/CustomView";
import { icons, images } from "@/constants";
import { account } from "@/constants";

const Account = () => {
  const [isSwitch1Enabled, setIsSwitch1Enabled] = useState(false);
  const [isSwitch2Enabled, setIsSwitch2Enabled] = useState(false);

  const toggleSwitch1 = () => setIsSwitch1Enabled((prevState) => !prevState);
  const toggleSwitch2 = () => setIsSwitch2Enabled((prevState) => !prevState);

  const ListHeader = () => (
    <View>
      <View className="flex flex-row items-center justify-between">
        <Text className="text-[16px] text-secondary-600 font-gilroyBold">
          Hi, Ajiboye
        </Text>
        <Image source={icons.profile} className="w-[50px] h-[50px]" />
      </View>

      <View className="mb-5">
        <ImageBackground
          source={images.balanceBg}
          className="-mx-3 mt-5 py-2 h-[91px] "
        >
          <View className="flex flex-row justify-between items-center mb-3 mx-3 text-[14px]">
            <Text className="text-white">Enable Finger Print/Face ID</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isSwitch1Enabled ? "#3555F5" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch1}
              value={isSwitch1Enabled}
            />
          </View>

          <View className="flex flex-row justify-between items-center mb-3 mx-3 text-[14px]">
            <Text className="text-white">Show Dashboard Account Balance</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isSwitch2Enabled ? "#3555F5" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch2}
              value={isSwitch2Enabled}
            />
          </View>
        </ImageBackground>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1">
      <TransferHeader title="My Account" />

      <CustomView viewStyle="bg-primary-300 px-0">
        <View className="">
        <FlatList
          data={account}
          contentContainerStyle={{ paddingLeft: 12, paddingRight: 12, backgroundColor:"" }}
          keyExtractor={(items) => items.id}
          ListHeaderComponent={ListHeader}
          renderItem={({ item, index }) => (
            <View style={{ backgroundColor: 'rgba(128, 139, 150, 0.2)', height:40, padding: 5,  }}>
                <TouchableOpacity>
              <View className="flex flex-row items-center justify-between">
                <View className="flex flex-row items-center space-x-2">
                  <Image 
                  source={item.icon}
                  />
                  <Text className= {`text-[14px] ${index === account.length -1 ? "text-danger": "text-white"}` }>{item.title}</Text>

                </View>
                <Image 
                source={icons.arrowSquareRight}
                />
              </View>
            </TouchableOpacity>
            </View>
          
          )}
        />
        </View>
        
      </CustomView>
    </SafeAreaView>
  );
};

export default Account;

