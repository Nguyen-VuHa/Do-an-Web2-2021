import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cinemaApi from 'src/api/cinemaApi';

const initialState = {
    loading: false,
    error: '',
    systemCinema: [],
    cinemaLocation: [],
    cinemaDetail: null,
}

export const fetchCinemaDetailById = createAsyncThunk('GET_SYSTEM_CINEMA_DETAIL', async (cinemaId) => {
    const stateReponse = await cinemaApi.getCinemaById(cinemaId);
    return stateReponse;
});

export const fetchSystemCinema = createAsyncThunk('GET_SYSTEM_CINEMA', async () => {
    const stateReponse = await cinemaApi.getAllCinema();
    return stateReponse;
});

export const fetchCinemaLocation = createAsyncThunk('GET_CINEMA_LOCATION', async () => {
    const stateReponse = await cinemaApi.getAllDistrict();
    return stateReponse;
});

const systemCinemaSlice = createSlice({
    name: 'system-cinema',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        // GET ALL SYSTEM CINEMA
        [fetchSystemCinema.pending]: (state) => {
            state.loading = true;
        },
        [fetchSystemCinema.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [fetchSystemCinema.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = '';
            state.systemCinema = payload.data;
        },
        // GET ALL SYSTEM CINEMA
        [fetchCinemaLocation.pending]: (state) => {
            state.loading = true;
        },
        [fetchCinemaLocation.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [fetchCinemaLocation.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = '';
            state.cinemaLocation = payload.data;
        },
        // GET CINEMA BY ID
        [fetchCinemaDetailById.pending]: (state) => {
            state.loading = true;
        },
        [fetchCinemaDetailById.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [fetchCinemaDetailById.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = '';
            state.cinemaDetail = payload.data;
        },
    }
});

const { reducer } = systemCinemaSlice;
export default reducer;