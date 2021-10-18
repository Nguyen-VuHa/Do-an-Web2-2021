import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from '../../api/movieApi';

export const getDataHomePage = createAsyncThunk('GET_MOVIE_HOMEPAGE', async () => {
    const stateReponse = await movieApi.getMovieHomePage();
    return stateReponse;
});

const movieHomepageSlice = createSlice({
    name: 'moive-homepage',
    initialState: {
        loading: '',
        error: '',
        data: [],
    },
    reducers: {},
    extraReducers: {
        // GET ALL PRODUCTS VIEW
        [getDataHomePage.pending]: (state) => {
            state.loading = true;
        },
        [getDataHomePage.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getDataHomePage.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = '';
            state.data = payload.data
        },
    }
});


const  { reducer } = movieHomepageSlice;
export default reducer;