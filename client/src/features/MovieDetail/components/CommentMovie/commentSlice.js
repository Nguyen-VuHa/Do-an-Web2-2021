import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentApi from '../../../../api/commentApi';

export const getAllComments = createAsyncThunk('GET_COMMENT_MOVIE', async (movieId) => {
    const stateReponse = await commentApi.getCommentMovie(movieId);
    return stateReponse;
});

export const addComments = createAsyncThunk('ADD_COMMENT_MOVIE', async (data) => {
    const stateReponse = await commentApi.addComments(data);
    return stateReponse;
});

const commentSlice = createSlice({
    name: 'movie-comments',
    initialState: {
        loading: '',
        error: '',
        data: [],
    },
    reducers: {},
    extraReducers: {
        [getAllComments.pending]: (state) => {
            state.loading = true;
        },
        [getAllComments.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getAllComments.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = '';
            state.data = payload.data;
        },
        [addComments.pending]: (state) => {
            state.loading = true;
        },
        [addComments.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [addComments.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = '';
        },
    }
});


const  { reducer } = commentSlice;
export default reducer;