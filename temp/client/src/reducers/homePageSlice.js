import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from 'src/api/movieApi';

export const fetchMovieHomePage = createAsyncThunk('GET_MOVIE_HOMEPAGE', async () => {
    const stateReponse = await movieApi.getMovieHomePage();
    return stateReponse;
});

const initialState = {
    loading: false,
    error: '',
    movieComming: [],
    movieCurrent: [],
    movieTrend: [],
}

const homepageSlice = createSlice({
    name: 'movie-homepage',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        // GET ALL PRODUCTS VIEW
        [fetchMovieHomePage.pending]: (state) => {
            state.loading = true;
        },
        [fetchMovieHomePage.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [fetchMovieHomePage.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = '';
            state.movieComming = payload.data.movieComing;
            state.movieCurrent = payload.data.movieCurrent;
            state.movieTrend = payload.data.movieTrending;
        },
    }
});

const { reducer } = homepageSlice;
export default reducer;