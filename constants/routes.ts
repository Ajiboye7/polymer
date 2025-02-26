// constants/routes.ts
export const ROUTES = {
  ONBOARDING: "(auth)/welcome",
  SIGN_IN: "/(auth)/sign-in",
  SIGN_UP: "/(auth)/sign-up",
  HOME: "/(tabs)/home",
  EMAIL_OTP:"/(screens)/otp",
  VERIFY_IDENTITY:"/(screens)/verify-identity",
  INPUT_IDENTITY:"/(screens)/input-identity",
  CREATE_FOUR_DIGIT_PIN: "/(screens)/create-pin",
  CONFIRM_FOUR_DIGIT_PIN: "/(screens)/confirm-pin",
  ACCOUNT_TYPE: "/(screens)/accounts-type",
  FUND_ACCOUNT: "/(screens)/fund-account",
  BUSINESS_PROFILE_SCREEN: "/(screens)/business-profile",
  BUSINESS_PROFILE_ANIMATION_SCREEN: "/(screens)/business-profile-animation",
  INTERNATIONAL_TRANSFER:"/(screens)/international-transfer",
  INTERNATIONAL_BANK_DETAILS:"/(screens)/international-bank-details",
  TRANSFER_SUCCESSFUL:"/(screens)/transfer-successful",
  TRANSACTION_DETAILS:"/(screens)/transaction-details",

} as const;
export type AppRoutes = keyof typeof ROUTES; 
