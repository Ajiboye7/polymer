import Constants from "expo-constants";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { userState, ProfileDetail, profilePictureDetail } from "@/types/types";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Host = Constants.expoConfig?.extra?.host || "http://192.168.0.6:5000";

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

{
  /*export const uploadProfilePicture = createAsyncThunk(
  "profile/uploadProfilePicture",
  async ({profilePicture, userId}: profilePictureDetail, {rejectWithValue}) => {
    try{
        const response = await axios.post(
            `${Host}/user/profile/uploadProfilePicture`,
            profilePicture
        );
        return response.data.data
    }catch(error){
        let errorMessage = "An unexpected error occurred. Please try again.";
        if(axios.isAxiosError(error)){
            errorMessage = error.response?.data.message || 'Failed to upload picture'
        }else if(error instanceof Error){
            errorMessage = error.message
        }
        console.log('error uploading profile picture', errorMessage)

        return rejectWithValue(errorMessage)
    }
  }
);*/
}
const pickImage = async () => {
  const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

  if (!permissionResult.granted) {
    alert("Permission to access camera roll is required!");
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled && result.assets && result.assets.length > 0) {
    return result.assets[0].uri;
  }

  if (!result.canceled && result.assets && result.assets[0]) {
    const pickedImageUri = result.assets[0].uri;

    if (pickedImageUri) {
      const uriParts = pickedImageUri.split(".");
      const fileType = uriParts[uriParts.length - 1];

      const formData = new FormData();
      formData.append("photo", {
        uri: pickedImageUri,
        name: `profile_picture.${fileType}`,
        type: `image/${fileType}`,
      } as any);
    }
  }
};
export const uploadProfilePicture = createAsyncThunk(
  "profile/uploadProfilePicture",
  async (
    { /*userId,*/ imageUri }: profilePictureDetail,
    { rejectWithValue }
  ) => {
    pickImage();
    try {
      const response = await axios.post(
        `${Host}/user/profile/upload-picture`,
        {
          /*userId,*/
          imageUri,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
          // state.userProfile = action.payload
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
            state.userProfile.profilePicture = action.payload.imageUri;
          }
        }
      )

      .addCase(uploadProfilePicture.rejected, (state, action) => {
        state.error = (action.payload as string) || "failed to upload image";
      });
  },
});

export default userSlice.reducer;
