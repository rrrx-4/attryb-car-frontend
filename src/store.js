import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./features/auth/authSlice"
import carSlice from "./features/car/carSlice"

export const store = configureStore({

    reducer: {
        auth: authSlice,
        car: carSlice
    },

})