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

export const fetchShowTimesByMovie = createAsyncThunk('FETCH_SHOWTIME_BY_MOVIE', async (movieId) => {
    const stateReponse = await showtimeApi.fetchShowtimesByMovie(movieId);
    return stateReponse;
});

export const fetchShowtimesByCinema = createAsyncThunk('FETCH_SHOWTIME_BY_CINEMA', async (idCinema) => {
    const stateReponse = await showtimeApi.fetchShowtimesByCinema(idCinema);
    return stateReponse;
});

export const fetchShowtimesById = createAsyncThunk('FETCH_SHOWTIME_BY_ID', async (showtimeId) => {
    const stateReponse = await showtimeApi.fetchShowtimesById(showtimeId);
    return stateReponse;
});


const showtimeSlice = createSlice({
    name: 'showtimes',
    initialState: {
        loading: false,
        error: '',
        showtimes: [],
        showtimesByMovie: [],
        showtimesByCinema: [],
        showtimeById: null,
        movieNameShowTimes: '',
        movieId: null,
        statusSubmit: 0,
        historyBooking: null,
    },
    reducers: {
        setNameMovie(state, action) { 
            return {
                ...state,
                movieNameShowTimes: action.payload.movieName,
                movieId: action.payload.movieId
            };
        },
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
         // GET SHOWTIMES BY MOVIE
         [fetchShowTimesByMovie.pending]: (state) => {
            state.loading = true;
        },
        [fetchShowTimesByMovie.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        [fetchShowTimesByMovie.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = '';
            state.showtimesByMovie = payload.data;
        },
         // GET SHOWTIMES BY CINEMA
        [fetchShowtimesByCinema.pending]: (state) => {
            state.loading = true;
        },
        [fetchShowtimesByCinema.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        [fetchShowtimesByCinema.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = '';
            state.showtimesByCinema = payload.data;
        },
        // GET SHOWTIMES BY ID
        [fetchShowtimesById.pending]: (state) => {
            state.loading = true;
        },
        [fetchShowtimesById.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        [fetchShowtimesById.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = '';
            state.showtimeById = payload.data;
            state.historyBooking = payload.data.HistoryBookings;
        },
    }
});

const { reducer, actions } = showtimeSlice;
export const { 
    setDefaultStatus,
    setNameMovie,
} = actions;
export default reducer;