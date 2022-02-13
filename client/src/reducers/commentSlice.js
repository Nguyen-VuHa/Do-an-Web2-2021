import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentApi from 'src/api/commentApi';

export const getAllComments = createAsyncThunk('GET_COMMENT_MOVIE', async (movieId) => {
    const stateReponse = await commentApi.getCommentMovie(movieId);
    return stateReponse;
});

export const addComments = createAsyncThunk('ADD_COMMENT_MOVIE', async (data) => {
    const stateReponse = await commentApi.addComments(data);
    return stateReponse;
});

export const addFeedbackComments = createAsyncThunk('ADD_FEEDBACK_COMMENT_MOVIE', async (data) => {
    const stateReponse = await commentApi.addFeedbackComments(data);
    return stateReponse;
});

const commentSlice = createSlice({
    name: 'movie-comments',
    initialState: {
        loading: false,
        error: '',
        createStatus: 0,
        comments: [],
    },
    reducers: {
        defautlCreateStatus(state) {
            state.createStatus = 0;
        }
    },
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
            state.comments = payload.data;
        },
        [addComments.pending]: (state) => {
            state.loading = true;
        },
        [addComments.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [addComments.fulfilled]: (state) => {
            state.loading = false;
            state.error = '';
            state.createStatus = 1;
        },
        [addFeedbackComments.pending]: (state) => {
            state.loading = true;
        },
        [addFeedbackComments.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [addFeedbackComments.fulfilled]: (state) => {
            state.loading = false;
            state.error = '';
            state.createStatus = 1;
        },
    }
});


const  { actions, reducer } = commentSlice;
export const { defautlCreateStatus } = actions;
export default reducer;