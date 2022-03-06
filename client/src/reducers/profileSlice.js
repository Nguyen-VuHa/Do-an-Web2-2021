import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "src/api/userApi";

export const getInfomationUser = createAsyncThunk('GET_USER_INFOMATION', async ({ userId, accessToken}) => {
    const stateReponse = await userApi.getInfoUser({ userId, accessToken});
    return stateReponse;
});

const profileSlice = createSlice({
    name: 'profileUser',
    initialState: {
        loading: false,
        error: '',
        profile: null,
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
    },
    extraReducers: {
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
    }
});

const { actions, reducer } = profileSlice;
export const { 
    setFullNameUser, setNumberPhoneUser,
    setSexUser, setAddressUser
 } = actions;
export default reducer;