import Constants from "expo-constants";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  AuthState,
  SignUpDetails,
  SignInDetails,
  IdentityDetails,
  User,
  IdentityNumberDetails,
  CreatePinDetails,
  BaseUser,
  FullUser,
  IdentityPayload,
  IdentityNumberPayload,
  VerificationPayload,
  PinStatusPayload,
} from "@/types/types";

const Host = Constants.expoConfig?.extra?.host || "http://192.168.0.4:5000";

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
  async ({ userId, identityType }: IdentityDetails, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${Host}/api/auth/add-identity-type`, {
        userId,
        identityType,
      });

      if (!response.data.data) {
        throw new Error("User data not returned from server");
      }

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
    { userId, identityNumber }: IdentityNumberDetails,
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(`${Host}/api/auth/add-identity-number`, {
        userId,
        identityNumber,
      });
      if (!response.data.data) {
        throw new Error("User data not returned from server");
      }
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

export const createPin = createAsyncThunk(
  "auth/createPin",
  async ({ userId, pin }: CreatePinDetails, { rejectWithValue }) => { 
    try {
      //console.log("Sending request to create PIN:", { userId, pin }); 
      const response = await axios.put(`${Host}/api/auth/create-pin`, {
        userId,
        pin, 
      });

      if (!response.data.data) {
        throw new Error("User data not returned from server");
      }

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


export const confirmPin = createAsyncThunk(
  "auth/confirmPin", 
  async ({ userId, pin }: CreatePinDetails, { rejectWithValue }) => { 
    try {
      //console.log("Sending request to create PIN:", { userId, pin }); 
      const response = await axios.post(`${Host}/api/auth/confirm-pin`, {
        userId,
        pin, 
      });

      if (!response.data) {
        throw new Error("User data not returned from server");
      }

      return response.data;
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
    builder
      .addCase(signUp.pending, (state) => {
        state.status = "loading";
      })
      {/** 
        .addCase(signUp.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.user = action.payload;
      })*/}
      builder.addCase(signUpUser.fulfilled, (state, action: PayloadAction<BaseUser>) => {
        state.status = "succeeded";
        state.user = {
          ...action.payload,
          pinSet: false,
          isVerified: false
        };
      });
      .addCase(signUp.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Sign up failed";
      })
      .addCase(signIn.pending, (state) => {
        state.status = "loading";
      })
      {/**
        .addCase(signIn.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.user = action.payload;
      }) */}

      builder.addCase(signInUser.fulfilled, (state, action: PayloadAction<FullUser>) => {
        state.status = "succeeded";
        state.user = action.payload;
      });
       
      .addCase(signIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Sign in failed";
      })

      



          .addCase(IdentityType.fulfilled, (state, action: PayloadAction<IdentityPayload>) => {
            if (state.user) {
              state.user.identityType = action.payload.identityType;
              // If using FullUser type and you want to mark the object as updated:
              state.user = { ...state.user, identityType: action.payload.identityType };
            }
          })
          .addCase(IdentityType.rejected, (state, action) => {
            state.error = action.payload as string || "Failed to update identity";
          })
        
          // Identity Number
          .addCase(identityNumber.fulfilled, (state, action: PayloadAction<IdentityNumberPayload>) => {
            if (state.user) {
              state.user.identityNumber = action.payload.identityNumber;
              // Alternative immutable update:
              state.user = { ...state.user, identityNumber: action.payload.identityNumber };
            }
          })
          .addCase(identityNumber.rejected, (state, action) => {
            state.error = action.payload as string || "Failed to add identity number";
          })
        
          // Create PIN
          .addCase(createPin.fulfilled, (state, action: PayloadAction<PinStatusPayload>) => {
            if (state.user) {
              state.user.pinSet = action.payload.pinSet;
              // Or immutably:
              state.user = { ...state.user, pinSet: action.payload.pinSet };
            }
          })
          .addCase(createPin.rejected, (state, action) => {
            state.error = (action.payload as string) || "Failed to create pin";
          })
          
          // Confirm PIN
          .addCase(confirmPin.fulfilled, (state, action: PayloadAction<VerificationPayload>) => {
            if (state.user) {
              state.user.isVerified = action.payload.isVerified;
              // Or immutably:
              state.user = { ...state.user, isVerified: action.payload.isVerified };
            }
          })
          .addCase(confirmPin.rejected, (state, action) => {
            state.error = (action.payload as string) || "Failed to verify pin";
          });
      
  },
});

export default authSlice.reducer;


{/** 
        .addCase(IdentityType.fulfilled, (state, action: PayloadAction<{identityType: string}>) => {
        if (state.user) {
          state.user.identityType = action.payload.identityType;
        }
      })
      .addCase(IdentityType.rejected, (state, action) => {
        state.error = action.payload as string || "Failed to update identity";
      })

          .addCase(identityNumber.fulfilled, (state, action: PayloadAction<{identityNumber: string}>) => {
            if (state.user) {
              state.user.identityNumber = action.payload.identityNumber;
            }
          })
          .addCase(identityNumber.rejected, (state, action) => {
            state.error = action.payload as string || "Failed to add identity number";
          })

          .addCase(
            createPin.fulfilled,
            (state, action: PayloadAction<{pinSet: boolean}>) => {
              if (state.user) {
                state.user.pinSet = action.payload.pinSet;
              }
            }
          )
          .addCase(createPin.rejected, (state, action) => {
            state.error = (action.payload as string) || "Failed to create pin";
          })
          
          .addCase(
            confirmPin.fulfilled,
            (state, action: PayloadAction<{isVerified: boolean}>) => {
              if (state.user) {
                state.user.isVerified = action.payload.isVerified;
              }
            }
          )
          .addCase(confirmPin.rejected, (state, action) => {
            state.error = (action.payload as string) || "Failed to verify pin";
          });*/}