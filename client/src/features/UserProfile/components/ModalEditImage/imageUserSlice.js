import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import userApi from "../../../../api/userApi";


export const getAllImageUser = createAsyncThunk('GET_ALL_IMAGE_USER', async (accessToken) => {
    const stateReponse = await userApi.getAllImageUser(accessToken);
    return stateReponse;
})

const imageUserAdapter = createEntityAdapter({
    selectId: (imageUser) => imageUser.id,
})

const imageUserSlice = createSlice({
    name: 'imageUser',
    initialState: imageUserAdapter.getInitialState({
        loading: false,
        error: '',
    }),
    reducers: {},
    extraReducers: {
        [getAllImageUser.pending]: (state) => {
            state.loading = true;
        },
        [getAllImageUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getAllImageUser.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = '';
            imageUserAdapter.setAll(state, payload.data);
        }
    }
});


export const imageUserSelectors = imageUserAdapter.getSelectors(state => state.imageUser);

const { reducer } = imageUserSlice;

export default reducer;