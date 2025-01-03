import { KeyboardTypeOptions, TextInputProps } from "react-native";

export interface ButtonProps {
  title: string;
  icon?: string;
  iconName?: string;
  buttonStyle?: string;
  textStyle?: string;
  handleClick?: () => void;
  disabled?: boolean;
}

export interface InputFieldProps {
    title?: string;
    otherStyles?: string;
    value?: string;
    placeholder?: string;
    handleChangeText?: (text: string) => void;
    keyboardType?: KeyboardTypeOptions; // Correct type for keyboardType
    textContentType?: TextInputProps["textContentType"]; // Correct type for textContentType
    secureTextEntry?: boolean;
    inputStyles?: string | object;
    iconStyle?: string;
    icon?: any;
  }

  export type RootStackParamList = {
    SignUp: undefined;
    Home: undefined;   
  };


  export type RootStackParamList = {
    VerificationScreen: undefined;
    InputIdentity: { selectedMode: "bvn" | "nin" };
  };