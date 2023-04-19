import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
// import * as api from '../api/api'
import API from '../api/api'
import axios from "axios";
import { getUserFromLS, storeUserToLS } from "../../utils/localStorage";

const initialState = {

    user: getUserFromLS(),
    loading: false,
    error: "",

}


export const signup = createAsyncThunk('auth/signup', async (user, thunkAPI) => {

    try {

        console.log(user);



        const resp = await API.post('/register', user);

        return resp.data;

    }
    catch (error) {

        console.log(error);

        return thunkAPI.rejectWithValue(error.response.data)
    }


})




export const signin = createAsyncThunk('auth/signin', async (user, thunkAPI) => {
    try {



        console.log(user);

        const resp = await API.post("/login", user);

        return resp.data;

    }
    catch (error) {

        console.log("signin error", error);

        // return thunkAPI.rejectWithValue(error.response.data)
    }


})





const authSlice = createSlice({

    name: "auth",
    initialState,
    reducers: {



    },
    extraReducers: (builder) => {

        builder.addCase(signup.pending, (state, action) => {

            state.loading = true;

        }).addCase(signup.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            storeUserToLS(action.payload);
        }).addCase(signup.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(signin.pending, (state, action) => {

            state.loading = true;

        }).addCase(signin.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            // console.log(state.user);
            storeUserToLS(action.payload);
        }).addCase(signin.rejected, (state, action) => {
            state.loading = false;
            console.log(action.payload);
            // state.error = action.payload.message;
        })


    }

})

export default authSlice.reducer;