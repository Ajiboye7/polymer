import { View, Text, Image, StatusBar, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "@/components/InputField";
import { icons } from "@/constants";
import Button from "@/components/Button";

const PersonalDetails = () => {
  const [form, setForm] = useState({
    phone: "",
    nokName: "",
    nokRelationship: "",
    nin: "",
  });

  return (
    <SafeAreaView className="mt-5">
      <ScrollView>
        <View className="px-2">
          <StatusBar hidden />
          <View className="bg-gray-300 w-[29.77px] h-[29.77px] rounded-full">
            <Image source={icons.arrowLeft} />
          </View>
          <View>
            <Text className="text-[32px] text-primary-300 font-gilroySemiBold mt-5 mb-3 ">
              Add Personal Details
            </Text>
            <Text className="text-[14px] text-secondary-600 leading-[20px] w-[358px] ">
              Finish setting up your Polymer business account by {"\n"}with
              adding your business details
            </Text>
          </View>
          <View>
            <InputField
              title="Phone Number"
              placeholder="08172710973"
              value={form.phone}
              handleChangeText={(value) => setForm({ ...form, phone: value })}
              keyboardType="numeric"
              textContentType="none"
            />

            <InputField
              title="Next of Kin Name"
              placeholder="John Doe"
              value={form.nokName}
              handleChangeText={(value) => setForm({ ...form, nokName: value })}
              keyboardType="numeric"
              textContentType="name"
            />

            <InputField
              title="Next of Kin Relationship"
              placeholder="Father"
              value={form.nokRelationship}
              handleChangeText={(value) => setForm({ ...form, nokRelationship: value })}
              keyboardType="email-address"
              textContentType="name"
            />

            <InputField
              title="NIN"
              placeholder="2324546576897"
              value={form.nin}
              handleChangeText={(value) => setForm({ ...form, nin: value })}
              keyboardType="numeric"
              textContentType="none"
            />
          </View>

          <Button
            title="Complete Profile"
            buttonStyle="w-[358px] h-[49.77px] mt-14"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalDetails;
