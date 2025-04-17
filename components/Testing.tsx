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
  async (imageUri: profilePictureDetail, { rejectWithValue, getState }) => {
    pickImage();
    try {
      const state = getState() as RootState;
      const token = state.auth.user?.token;
      const response = await axios.post(
        `${Host}/user/profile/upload-picture`,
        {
          /*userId,*/
          imageUri,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
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
