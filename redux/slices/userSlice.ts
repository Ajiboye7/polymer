import Constants from "expo-constants";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { userState, ProfileDetail } from "@/types/types";

const Host = Constants.expoConfig?.extra?.host || "http://192.168.0.3:5000";

const initialState: userState = {
    userProfile : null,
    status: 'idle',
    error: null
}


export const createProfile = createAsyncThunk(
    'profile/createProfile',
    async(userProfileData: ProfileDetail, {rejectWithValue} )=>{
        try{
            const response = await axios.post(`${Host}/user/profile/create-profile`, userProfileData)
            return response.data.data
          
        }catch(error){
            let errorMessage = "An unexpected error occurred. Please try again.";

            if(axios.isAxiosError(error)){
                errorMessage= error.response?.data?.message || 'Failed to create user profile. please try again'
            }else if(error instanceof Error){
                errorMessage = error.message
            }

            console.log('error creating profile', errorMessage)

            return rejectWithValue(errorMessage)
        }
    }
)


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{}, 
    extraReducers: (builder)=>{
        builder.addCase(createProfile.pending, (state)=>{
            state.status = 'loading'
        })

    .addCase(createProfile.fulfilled, (state, action: PayloadAction<ProfileDetail>)=>{
            state.status = 'succeeded'
            state.userProfile = action.payload
        })
        .addCase(createProfile.rejected, (state, action)=>{
            state.status= 'failed',
            state.error = (action.payload as string) || 'error creating profile'
        })

    }
})

export default userSlice.reducer