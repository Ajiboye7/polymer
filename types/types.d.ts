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
  keyboardType?: KeyboardTypeOptions;
  textContentType?: TextInputProps["textContentType"];
  secureTextEntry?: boolean;
  inputStyles?: string;
  iconStyle?: string;
  icon?: any;
  iconClick?: () => void
  onFocus?: () => void; 
  editable?: boolean

}

export interface SwipeButtonProps {
  text: string;
  onSwipeComplete: () => void;
  showKeyboard?: boolean;
  onKeyboardPrompt?: () => void;
}

export type RootStackParamList = {
  SignUp: undefined;
  Home: undefined;
};

export type RootStackParamList = {
  VerificationScreen: undefined;
  InputIdentity: { selectedMode: "bvn" | "nin" };
};
