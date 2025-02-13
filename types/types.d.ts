import { KeyboardTypeOptions, TextInputProps , ImageSourcePropType} from "react-native";

export interface ButtonProps {
  title: string;
  icon?: ImageSourcePropType;
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
  icon?: ImageSourcePropType;
  iconClick?: () => void;
  onFocus?: () => void;
  editable?: boolean;
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

export interface LayoutProps {
  children: React.ReactNode;
  backgroundComponent?: React.ReactNode;
  snapPoints?: Array<number | string>
}

export type RootStackParamList = {
  VerificationScreen: undefined;
  InputIdentity: { selectedMode: "bvn" | "nin" };
};

export interface EmailHeaderProps{
  text?: string
}

export interface EmailContentProps {
  containerStyle?: string;
  headerText?: string;
  message?: string;
  footerText?: string;
  messageStyle?: string
  link?: string
  showFooterText?: boolean
  icon?: ImageSourcePropType;
  iconName?: string
}

export interface EmailBannerProps {
  parentContainer?: string;
  childContainer?: string;
}

export interface TransactionTypeProps {
  transactionType?: string
}
