import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";

const initialState = {

    allcars: [],
    loading: false,
    editCar: null,
    isEditCar: false,

}

export const getCarsByUser = createAsyncThunk('car/getCars', async ({ price, colour, mileage }, thunkAPI) => {

    console.log('dd');

    try {

        const resp = await API.get(`/cars?price=${price}&colour=${colour}&mileage=${mileage}`);

        return resp.data;

    } catch (error) {

        console.log(error);

    }

})


export const createCar = createAsyncThunk('car/create', async (car, thunkAPI) => {

    try {


        // console.log(car);

        const resp = await API.post('/createcar', car);

        // console.log(resp.data);

        return resp.data;

    } catch (error) {

        console.log(error);

    }

})

export const updateCar = createAsyncThunk('car/edit', async (car, thunkAPI) => {

    // console.log(id);

    const { _id } = car;

    console.log(_id);

    try {

        const resp = await API.patch(`/edit/${_id}`, car)

        return resp.data;

    } catch (error) {
        console.log(error);
    }

})

export const deleteCar = createAsyncThunk('car/delete', async (id, thunkAPI) => {

    console.log(id);

    try {
        const resp = await API.delete(`/delete/${id}`);

        return resp.data;

    } catch (error) {
        console.log(error);
    }


})


const carSlice = createSlice({

    name: 'car',
    initialState,

    reducers: {

        setCar: (state, action) => {

            state.editCar = action.payload;

        },

        setIsEditCar: (state, action) => {

            state.isEditCar = !state.isEditCar;

        }

    },
    extraReducers: (builder) => {

        builder.addCase(createCar.pending, (state, action) => {

            state.loading = true;

        }).addCase(createCar.fulfilled, (state, action) => {
            state.loading = false;
            state.car = action.payload
        }).addCase(createCar.rejected, (state, action) => {
            state.loading = false;
            console.log('create car error');
        }).addCase(getCarsByUser.pending, (state, action) => {
            state.loading = true;
        }).addCase(getCarsByUser.fulfilled, (state, action) => {
            state.loading = false;
            // console.log(action.payload);
            state.allcars = action.payload;
        }).addCase(getCarsByUser.rejected, (state, action) => {
            state.loading = false;
            console.log('getcars error');
        }).addCase(updateCar.pending, (state, action) => {
            // state.loading = true;
        }).addCase(updateCar.fulfilled, (state, action) => {
            state.editCar = {};
            state.isEditCar = false;
            // console.log(action.payload);
            // state.allcars = action.payload;
        }).addCase(updateCar.rejected, (state, action) => {
            // state.loading = false;
            console.log('getcars error');
        }).addCase(deleteCar.pending, (state, action) => {
            // state.loading = true;
        }).addCase(deleteCar.fulfilled, (state, action) => {
            // state.editCar = {};
            // state.isEditCar = false;
            // console.log(action.payload);
            // state.allcars = action.payload;
        }).addCase(deleteCar.rejected, (state, action) => {
            // state.loading = false;
            console.log('getcars error');
        })

    }

})


export default carSlice.reducer;

export const { setCar, setIsEditCar } = carSlice.actions