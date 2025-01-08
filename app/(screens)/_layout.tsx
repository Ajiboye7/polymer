import React from "react";
import { Stack } from "expo-router";

const ScreensLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="otp"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="verify-identity"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="input-identity"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="confirm-new-password"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="password-recovery"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="reset-password"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="recovery-otp"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="photo-capture"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="number-of-tries"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="one-minute-verification"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="verification-network-error"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="verification-error"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="create-pin"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="confirm-pin"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="accounts-type"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="fund-account"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="personal-details"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
};

export default ScreensLayout;
