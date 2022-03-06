import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "src/api/userApi";

export const getInfomationUser = createAsyncThunk('GET_USER_INFOMATION', async ({ userId, accessToken}) => {
    const stateReponse = await userApi.getInfoUser({ userId, accessToken});
    return stateReponse;
});

export const updateInfomationUser = createAsyncThunk('UPDATE_USER_INFOMATION', async ({accessToken,  dataProfile}) => {
    const stateReponse = await userApi.updateProfile(accessToken, dataProfile);
    return stateReponse;
});


const profileSlice = createSlice({
    name: 'profileUser',
    initialState: {
        loading: false,
        error: '',
        profile: null,
        statusUpdate: 0,
    },
    reducers: {
        setFullNameUser(state, action) {
            state.profile = {
                ...state.profile,
                fullname: action.payload,
            }
        },
        setNumberPhoneUser(state, action) {
            state.profile = {
                ...state.profile,
                numberphone: action.payload,
            }
        },
        setSexUser(state, action) {
            state.profile = {
                ...state.profile,
                sex: action.payload,
            }
        },
        setAddressUser(state, action) {
            state.profile = {
                ...state.profile,
                address: action.payload,
            }
        },

        setDefaultStatus(state) {
            state.statusUpdate = 0
        },
    },
    extraReducers: {
        // GET INFO USER
        [getInfomationUser.pending]: (state) => {
            state.loading = true;
        },
        [getInfomationUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getInfomationUser.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = '';
            state.profile = payload.data;
        },
        // UPDATE INFO USER
        [updateInfomationUser.pending]: () => {
        },
        [updateInfomationUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.statusUpdate = 2;
        },
        [updateInfomationUser.fulfilled]: (state) => {
            state.loading = false;
            state.error = '';
            state.statusUpdate = 1;
        },
    }
});

const { actions, reducer } = profileSlice;
export const { 
    setFullNameUser, setNumberPhoneUser,
    setSexUser, setAddressUser, setDefaultStatus,

 } = actions;
export default reducer;