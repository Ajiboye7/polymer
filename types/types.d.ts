import { KeyboardTypeOptions, TextInputProps } from "react-native";



export interface ButtonProps {
  title: string;
  icon?: any;
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
  iconClick?: () => void;
  onFocus?: () => void;
  editable?: boolean;
  error?: string;
}

export interface SignUpFormProps{
  name:string,
  account: number,
  email: string,
  password: string,
  confirmPassword: string,
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

export interface EmailHeaderProps {
  text?: string;
}

export interface EmailContentProps {
  containerStyle?: string;
  headerText?: string;
  message?: string;
  footerText?: string;
  messageStyle?: string;
  link?: string;
}

export interface EmailBannerProps {
  parentContainer?: string;
  childContainer?: string;
}

export interface BaseUser {
  _id: string;
  name: string;
  account: string;
  email: string;
  token: string;
}

export interface FullUser extends BaseUser {
  pinSet: boolean;
  isVerified: boolean;
  identityNumber?: string;
  identityType?: string;
  accountType?: string;
}

export type IdentityPayload = {
  identityType: string;
};

export type IdentityNumberPayload = {
  identityNumber: string;
};

export type PinStatusPayload = {
  pinSet: boolean;
};

export type VerificationPayload = {
  isVerified: boolean;
};

export type accountTypePayload = {
  accountType: string;
}



{/*export interface User{
  _id: string;
  name: string;
  account: string;
  email: string;
  token: string;
  [key: string]: any;
}*/}

export interface AuthState{
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error:  string | null
}

export interface SignUpDetails{
  name: string;
  account: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignInDetails{
  email: string;
  password: string
}

export interface IdentityDetails{
  userId: string,
  identityType: 'bvn'| 'nin',
}
export interface IdentityNumberDetails {
  userId: string;
  identityNumber: string; 
}

export interface CreatePinDetails {
  userId: string;
  pin: string
}
 
export interface accountTypeDetails{
  userId: string;
  accountType: "business" | "regular"
}