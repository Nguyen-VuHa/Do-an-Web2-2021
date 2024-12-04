import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../../api/userApi";
import Images from "../../contants/image";
export const getImageUser = createAsyncThunk('GET_AVARTAR_IMAGE_USER', async (accessToken) => {
    const stateReponse = await userApi.getAvartarUser(accessToken);
    return stateReponse;
});

export const postAvartar = createAsyncThunk('SAVE_AVARTAR_USER', async ({ accessToken, objData }) => {
    const stateReponse = await userApi.saveAvartarUser(accessToken, objData);
    return { stateReponse, objData };
})


const avartarUserSlice = createSlice({
    name: 'imageUser',
    initialState: {
        loading: '',
        error: '',
        imageUrl: Images.DefaultAvatar,
    },
    reducers: {},
    extraReducers: {
        [getImageUser.pending]: (state) => {
            state.loading = true;
        },
        [getImageUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getImageUser.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = '';
            state.imageUrl = payload.data;
        },
        [postAvartar.pending]: (state) => {
            state.loading = true;
        },
        [postAvartar.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [postAvartar.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = '';
            state.imageUrl = payload.objData.imgUrl;
        }
    }
});

const { reducer } = avartarUserSlice;

export default reducer;