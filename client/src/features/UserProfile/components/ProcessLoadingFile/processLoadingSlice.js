import { createSlice } from "@reduxjs/toolkit";

const processLoadingSlice = createSlice({
    name: 'loadingSlice',
    initialState: {
        isLoading: false,
        status: 0, 
    },
    reducers: {
        isLoading: (state) => {
            return {
                ...state,
                isLoading: true,
            };
        },
        isSuccess: () => {
            return {
                isLoading: true,
                status: 1, 
            };
        },
        isHiden: (state) => {
            return {
                ...state,
                isLoading: false,
            };
        }
    }
});


const { reducer, actions } = processLoadingSlice;
export const { isLoading, isHiden, isSuccess } = actions;
export default reducer;