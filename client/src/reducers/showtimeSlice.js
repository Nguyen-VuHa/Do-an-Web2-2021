import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import showtimeApi from 'src/api/showtimeApi';

export const createShowTimes = createAsyncThunk('CREATE_NEW_SHOW_TIME', async (data) => {
    const stateReponse = await showtimeApi.createNewShowtime(data);
    return stateReponse;
});

export const fetchAllShowTimes = createAsyncThunk('FETCH_ALL_SHOWTIME', async () => {
    const stateReponse = await showtimeApi.fetchAllShowtime();
    return stateReponse;
});


const showtimeSlice = createSlice({
    name: 'showtimes',
    initialState: {
        loading: false,
        error: '',
        showtimes: [],
        statusSubmit: 0,
    },
    reducers: {
        setDefaultStatus(state) { 
            return {
                ...state,
                statusSubmit: 0,
            };
        }
    },
    extraReducers: {
        // CREATE SHOW TIME
        [createShowTimes.pending]: (state) => {
            state.loading = true;
        },
        [createShowTimes.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.statusSubmit = 2;
        },
        [createShowTimes.fulfilled]: (state) => {
            state.loading = false;
            state.error = '';
            state.statusSubmit = 1;
        },
        // GET ALL SHOW TIME
        [fetchAllShowTimes.pending]: (state) => {
            state.loading = true;
        },
        [fetchAllShowTimes.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        [fetchAllShowTimes.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = '';
            state.showtimes = payload.data;
        },
    }
});

const { reducer, actions } = showtimeSlice;
export const { 
    setDefaultStatus,
} = actions;
export default reducer;