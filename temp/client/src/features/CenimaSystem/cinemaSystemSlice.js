import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cinemaApi from "../../api/cinemaApi";

export const getAllCinemas = createAsyncThunk('GET_ALL_CINEMAS', async () => {
    const stateReponse = await cinemaApi.getAllCinema();
    return stateReponse
});

const cinemaSlice = createSlice({
    name: 'cinemas',
    initialState: {
        loading: '',
        error: '',
        cinemas: [],
    },
    reducers: {},
    extraReducers: {
        [getAllCinemas.pending]: (state) => {
            state.loading = true;
        },
        [getAllCinemas.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getAllCinemas.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = '';
            state.cinemas = payload.data;
        }
    }
});

const { reducer } = cinemaSlice;

export default reducer;