import Constants from "expo-constants";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  AuthState,
  SignUpDetails,
  SignInDetails,
  IdentityDetails,
  IdentityNumberDetails,
  CreatePinDetails,
  BaseUser,
  FullUser,
  IdentityPayload,
  IdentityNumberPayload,
  VerificationPayload,
  PinStatusPayload,
  accountTypeDetails,
  accountTypePayload,
} from "@/types/types";
import { RootState } from "../store";

const Host = Constants.expoConfig?.extra?.host || "http://192.168.0.3:5000";

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (userData: SignUpDetails, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${Host}/api/auth/sign-up`, userData);
      return response.data.data.user;
    } catch (error) {
      let errorMessage = "An unexpected error occurred. Please try again.";

      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message ||
          "Failed to create account. Please try again.";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      console.error("Sign-up error:", errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (userData: SignInDetails, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${Host}/api/auth/sign-in`, userData);
      return response.data.data.user;
    } catch (error) {
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message ||
          "Failed to SignIn account. Please try again.";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      console.error("Sign-up error:", errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);

export const IdentityType = createAsyncThunk(
  "auth/identityType",
  async ({ identityType }: IdentityDetails, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.user?.token;
      //console.log('toke', token)
      const response = await axios.put(
        `${Host}/api/auth/add-identity-type`,
        {
          identityType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.data;
    } catch (error) {
      let errorMessage = "Failed to update identity";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const identityNumber = createAsyncThunk(
  "auth/identityNumber",
  async (
    { identityNumber }: IdentityNumberDetails,
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.user?.token;
      //console.log(token)
      const response = await axios.put(
        `${Host}/api/auth/add-identity-number`,
        {
          identityNumber,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      let errorMessage = "Failed to add Identity Number";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const accountType = createAsyncThunk(
  "auth/accountType",
  async (
    { accountType }: accountTypeDetails,
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.user?.token;
      const response = await axios.put(
        `${Host}/api/auth/add-account-type`,
        {
          accountType,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.data;
    } catch (error) {
      let errorMessage = "Failed to add account type";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const createPin = createAsyncThunk(
  "auth/createPin",
  async ({ pin }: CreatePinDetails, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.user?.token;
      //console.log(token)
      const response = await axios.put(
        `${Host}/api/auth/create-pin`,
        {
          pin,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      

      return response.data.data;
    } catch (error) {
      let errorMessage = "Failed to create pin";
      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

{/**
  catch (error) {
  console.log('Full error object:', error); // Debug
  if (axios.isAxiosError(error)) {
    console.log('Response data:', error.response?.data); // Debug
    const serverMessage = error.response?.data?.message;
    return rejectWithValue(serverMessage || "API request failed");
  }
  return rejectWithValue("Network or unexpected error");
} */}

export const confirmPin = createAsyncThunk(
  "auth/confirmPin",
  async ({ pin }: CreatePinDetails, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.user?.token;
      //console.log(token)
      const response = await axios.post(
        `${Host}/api/auth/confirm-pin`,
        {
          pin,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.data;
    } catch (error) {
      let errorMessage = "Failed to create pin";
      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.status = "loading";
    });
    {
    }
    builder
      .addCase(signUp.fulfilled, (state, action: PayloadAction<BaseUser>) => {
        state.status = "succeeded";
        state.user = {
          ...action.payload,
          pinSet: false,
          isVerified: false,
        };
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Sign up failed";
      })
      .addCase(signIn.pending, (state) => {
        state.status = "loading";
      });
    {
    }

    builder
      .addCase(signIn.fulfilled, (state, action: PayloadAction<FullUser>) => {
        state.status = "succeeded";
        state.user = action.payload;
      })

      .addCase(signIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Sign in failed";
      })

      .addCase(
        IdentityType.fulfilled,
        (state, action: PayloadAction<IdentityPayload>) => {
          if (state.user) {
            state.user = {
              ...state.user,
              identityType: action.payload.identityType,
            };
          }
        }
      )
      .addCase(IdentityType.rejected, (state, action) => {
        state.error = (action.payload as string) || "Failed to update identity";
      })

      .addCase(
        identityNumber.fulfilled,
        (state, action: PayloadAction<IdentityNumberPayload>) => {
          if (state.user) {
            state.user = {
              ...state.user,
              identityNumber: action.payload.identityNumber,
            };
          }
        }
      )
      .addCase(identityNumber.rejected, (state, action) => {
        state.error =
          (action.payload as string) || "Failed to add identity number";
      })

      .addCase(
        createPin.fulfilled,
        (state, action: PayloadAction<PinStatusPayload>) => {
          if (state.user) {
            state.user = {
              ...state.user,
              pinSet: action.payload.pinSet,
            };
          }
        }
      )
      .addCase(createPin.rejected, (state, action) => {
        state.error = (action.payload as string) || "Failed to create pin";
      })

      .addCase(
        confirmPin.fulfilled,
        (state, action: PayloadAction<VerificationPayload>) => {
          if (state.user) {
            state.user = {
              ...state.user,
              isVerified: action.payload.isVerified,
            };
          }
        }
      )
      .addCase(confirmPin.rejected, (state, action) => {
        state.error = (action.payload as string) || "Failed to verify pin";
      })

      .addCase(
        accountType.fulfilled,
        (state, action: PayloadAction<accountTypePayload>) => {
          if (state.user) {
            state.user = {
              ...state.user,
              accountType: action.payload.accountType,
            };
          }
        }
      )
      .addCase(accountType.rejected, (state, action) => {
        state.error =
          (action.payload as string) || "Failed to add account type";
      });
  },
});

export default authSlice.reducer;
