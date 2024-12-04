import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from 'src/api/movieApi';

export const getMovieDetailById = createAsyncThunk('GET_MOVIE_DETAIL_BY_ID', async (movieId) => {
    const stateReponse = await movieApi.getMovieDetailById(movieId);
    return stateReponse;
});

export const getMovieCurrent = createAsyncThunk('GET_MOVIE_CURRENT', async () => {
    const stateReponse = await movieApi.getMovieCurrentShow();
    return stateReponse;
});

const movieSlice = createSlice({
    name: 'movie',
    initialState: {
        loading: false,
        error: '',
        movieArr: [],
        movieDetail: null,
    },
    reducers: {},
    extraReducers: {
        // GET MOVIE DETAILS
        [getMovieDetailById.pending]: (state) => {
            state.loading = true;
        },
        [getMovieDetailById.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        [getMovieDetailById.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = '';
            state.movieDetail = payload.data;
        },
         // GET MOVIE CURRENT
         [getMovieCurrent.pending]: (state) => {
            state.loading = true;
        },
        [getMovieCurrent.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        [getMovieCurrent.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = '';
            state.movieArr = payload.data;
        },
    }
});

const { reducer } = movieSlice;
export default reducer;