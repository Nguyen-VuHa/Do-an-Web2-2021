import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({ 
    name: 'loading',
    initialState: false,
    reducers: {
        ShowLoading: () => {
            return true;
        },
        HideLoading: () => {
            return false;
        }
    },
});

const  { reducer, actions } = loadingSlice;
export const { ShowLoading, HideLoading } = actions;
export default reducer;