import {createSlice, createAsyncThunk, bindActionCreators} from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config/config.js';

const initialState = {
    user : null,
    isError : false,
    isSuccess : false,
    isLoading : false,
    message : ""
}

export const LoginUser = createAsyncThunk("/user/LoginUser", async(user, thunkAPI)=>{
    try{
        const response = await axios.post(`${config.base_url}/login`, {
            email : user.email,
            password : user.password
        }, {withCredentials:true});
        console.log("login ", response.data);
        return response.data;

    }catch(error){
        if(error.response){
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }

    }
});

export const getMe = createAsyncThunk("/user/getMe", async(_, thunkAPI)=>{
    try{
        const response = await axios.get(`${config.base_url}/me`);
        return response.data;

    }catch(error){
        if(error.response){
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }

    }
});

export const LoutOut = createAsyncThunk("/user/LogOut", async()=>{
        await axios.delete(`${config.base_url}/logout`);
});

export const authSlice = createSlice({
    name : "auth",
    initialState, 
    reducers : {
        reset : (state) => initialState,
    },
    extraReducers:(builder) => {
        builder.addCase(LoginUser.pending, (state)=> {
            state.isLoading = true

        });
        builder.addCase(LoginUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;

        });
        builder.addCase(LoginUser.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
        });

        //get User login
        builder.addCase(getMe.pending, (state)=> {
            state.isLoading = true

        });
        builder.addCase(getMe.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;

        });
        builder.addCase(getMe.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
        });

    }
});

export const {reset} = authSlice.actions;

export default authSlice.reducer;