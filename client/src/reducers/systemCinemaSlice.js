import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cinemaApi from 'src/api/cinemaApi';

const initialState = {
    loading: false,
    error: '',
    systemCinema: [],
}

export const fetchSystemCinema = createAsyncThunk('GET_SYSTEM_CINEMA', async () => {
    const stateReponse = await cinemaApi.getAllCinema();
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
    }
});

const { reducer } = systemCinemaSlice;
export default reducer;