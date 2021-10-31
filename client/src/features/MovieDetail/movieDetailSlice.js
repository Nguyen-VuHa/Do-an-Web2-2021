import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from '../../api/movieApi';

export const getMovieDetail = createAsyncThunk('GET_MOVIE_DETAIL', async () => {
    const stateReponse = await movieApi.getMovieDetail();
    return stateReponse;
});

const movieDetailSlice = createSlice({
    name: 'moive-detail',
    initialState: {
        loading: '',
        error: '',
        data: [],
    },
    reducers: {},
    extraReducers: {
        // GET ALL PRODUCTS VIEW
        [getMovieDetail.pending]: (state) => {
            state.loading = true;
        },
        [getMovieDetail.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getMovieDetail.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = '';
            state.data = payload.data
        },
    }
});


const  { reducer } = movieDetailSlice;
export default reducer;