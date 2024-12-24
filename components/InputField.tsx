import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
  Platform,
  Keyboard,
} from "react-native";
import React from "react";
import { InputFieldProps } from "@/types/types";
import { icons } from "@/constants";

const InputField = ({
  title,
  otherStyles,
  value,
  placeholder,
  handleChangeText,
  icon,
  secureTextEntry,
  inputStyles,
  iconStyle,
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className={`mt-5 ${otherStyles}`}>
          <Text className="text-fontColor-gray text-[12px] mb-2 text-secondary-400 ">
            {title}
          </Text>
          <View
            className={`bg-[#F0F0F0] p-4 w-full h-[52px] rounded-[10px] border border-primary-200 focus:border-primary-300 justify-center items-start ${inputStyles}`}
          >
            {icon && (
              <Image
                source={icon}
                className={`w-6 h-6 ml-4 absolute left-72 ${iconStyle}`}
              />
            )}
            <TextInput
              value={value}
              placeholder={placeholder}
              placeholderTextColor="#58585880"
              className="text-[14px] font-600 w-full\"
              onChangeText={handleChangeText}
              secureTextEntry={secureTextEntry}
              
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
