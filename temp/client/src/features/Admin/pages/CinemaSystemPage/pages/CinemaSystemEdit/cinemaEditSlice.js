import { createSlice } from "@reduxjs/toolkit";

var initialState = false;


const statusEdit = createSlice({
    name: 'isStatusModal',
    initialState,
    reducers: {
        showModal: () => {
            return true;
        },
        hideModal: () => {
            return false;
        }
    },
});


const { reducer, actions } = statusEdit;
export const { showModal, hideModal } = actions;
export default reducer;