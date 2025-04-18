import Constants from "expo-constants";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { userState, ProfileDetail, profilePictureDetail } from "@/types/types";
import * as ImagePicker from "expo-image-picker";
import { RootState } from "../store";

const Host = Constants.expoConfig?.extra?.host || "http://192.168.0.2:5000";

const initialState: userState = {
  userProfile: null,
  status: "idle",
  error: null,
  profilePictureUploadStatus: "idle",
};

export const createProfile = createAsyncThunk(
  "profile/createProfile",
  async (userProfileData: ProfileDetail, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.user?.token;

      const response = await axios.post(
        `${Host}/user/profile/create-profile`,
        userProfileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      let errorMessage = "An unexpected error occurred. Please try again.";

      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message ||
          "Failed to create user profile. please try again";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      console.log("error creating profile", errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);
const pickImage = async (): Promise<{ uri: string; name: string; type: string } | null> => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return null;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });
  
    if (!result.canceled && result.assets?.[0]?.uri) {
      const uri = result.assets[0].uri;
      const fileName = uri.split('/').pop() || `profile_${Date.now()}.jpg`;
      const fileType = `image/${uri.split('.').pop()}`;
      
      return {
        uri,
        name: fileName,
        type: fileType,
      };
    }
    return null;
  };


export const uploadProfilePicture = createAsyncThunk(
  "profile/uploadProfilePicture",
  async (_, { rejectWithValue, getState }) => {
    try {
      const imageFile = await pickImage();
      console.log(imageFile)
      if (!imageFile) return rejectWithValue("No image selected");

      const formData = new FormData();
      formData.append('photo', {
        uri: imageFile.uri,
        name: imageFile.name,
        type: imageFile.type,
      } as any);

      const state = getState() as RootState;
      const token = state.auth.user?.token;

      const response = await axios.put(
        `${Host}/user/profile/upload-picture`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      return response.data.data;
    } catch (error) {
      let errorMessage = "Failed to upload profile picture. Please try again";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProfile.pending, (state) => {
        state.status = "loading";
      })

      .addCase(
        createProfile.fulfilled,
        (state, action: PayloadAction<ProfileDetail>) => {
          state.status = "succeeded";
          state.userProfile = {
            ...action.payload,
            profilePicture: null,
          };
        }
      )
      .addCase(createProfile.rejected, (state, action) => {
        (state.status = "failed"),
          (state.error =
            (action.payload as string) || "error creating profile");
      })

      .addCase(uploadProfilePicture.pending, (state) => {
        state.status = "loading";
      })

      .addCase(
        uploadProfilePicture.fulfilled,
        (state, action: PayloadAction<profilePictureDetail>) => {
          if (state.userProfile) {
            state.userProfile.profilePicture = action.payload.profilePicture;
          }
          //console.log(state)
        }
      )

      .addCase(uploadProfilePicture.rejected, (state, action) => {
        state.error = (action.payload as string) || "failed to upload image";
      });
  },
});

export default userSlice.reducer;
