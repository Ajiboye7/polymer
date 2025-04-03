import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Constants from "expo-constants";
import {
  //AuthState,
  SignUpDetails,
  SignInDetails,
  IdentityDetails,
  // User,
} from "@/types/types";

const Host = Constants.expoConfig?.extra?.host || "http://192.168.0.4:5000";

interface User {
  id: string;
  name: string;
  account: string;
  email: string;
  token: string;
  identityType?: "bvn" | "nin"; // Add this if your backend returns it
}

interface AuthState {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

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
      return response.data.data.user; // Now matches the structure
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
      // Alert.alert("Error", errorMessage);

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

      console.error("Sign-up error:", errorMessage)

      return rejectWithValue(errorMessage);
    }
  }
);

export const IdentityType = createAsyncThunk(
  "auth/identityType",
  async ({ userId, identityType }: IdentityDetails, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${Host}/api/auth/update-identity`, {
        userId,
        identityType,
      });

      if (!response.data.user) {
        throw new Error("User data not returned from server");
      }

      return response.data.user;
    } catch (error) {
        let errorMessage = 'Failed to update identity';
        if (axios.isAxiosError(error)) {
          errorMessage = error.response?.data?.message || errorMessage;
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
    builder
      .addCase(signUp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUp.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Sign up failed";
      })
      .addCase(signIn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signIn.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Sign in failed";
      })
      .addCase(
        IdentityType.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.user = action.payload;
        }
      )
      .addCase(IdentityType.rejected, (state, action) => {
        state.error = (action.payload as string) || "Failed to update identity";
      });
  },
});

export default authSlice.reducer;
