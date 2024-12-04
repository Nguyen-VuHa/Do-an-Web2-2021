import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from 'src/api/userApi';

export const getNotifications = createAsyncThunk('GET_NOTIFICATIONS', async (accessToken) => {
    const stateReponse = await userApi.getNotifications(accessToken);
    return stateReponse;
});

const notifySlice = createSlice({
    name: 'notifications',
    initialState: {
        loading: false,
        error: '',
        notify: [],
    },
    reducers: {},
    extraReducers: {
        // GET LIST NOTIFICATION
        [getNotifications.pending]: (state) => {
            state.loading = true;
        },
        [getNotifications.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        [getNotifications.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = '';
            state.notify = payload.notify;
        },
    }
});

const { reducer } = notifySlice;
export default reducer;