import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { ROUTES } from "@/constants/routes";
import Constants from "expo-constants";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthState, SignUpPayload, SignInPayload, User } from "@/types/types";


const router = useRouter();
const Host = Constants.expoConfig?.extra?.host || "http://192.168.0.4:5000";

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (userData: SignUpPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${Host}/api/auth/sign-up`, userData);
      //const { name } = response.data.data;

      //Alert.alert("Success", `${name} successfully created!`);
      router.replace(ROUTES.EMAIL_OTP);

      return response.data.data; // Return only relevant data
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
      Alert.alert("Error", errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (userData: SignInPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${Host}/api/auth/sign-in`, userData);
      //const { name } = response.data.data;

     // Alert.alert("Success", `Welcome back ${name}` || response?.data?.message);
      router.replace(ROUTES.HOME);
      return response.data.data;
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
      Alert.alert("Error", errorMessage);

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
      .addCase(
        signUp.fulfilled,
        (state, action: PayloadAction<{ user: User }>) => {
          state.status = "succeeded";
          state.user = action.payload.user;
        }
      )
      .addCase(signUp.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload?.message || "Sign up failed";
      })
      .addCase(signIn.pending, (state) => {
        state.status = "loading";
      })

      .addCase(
        signIn.fulfilled,
        (state, action: PayloadAction<{ user: User }>) => {
          state.status = "succeeded";
          state.user = action.payload.user;
        }
      )
      .addCase(signIn.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload?.message || "Sign in failed";
      });
  },
});


export default authSlice.reducer