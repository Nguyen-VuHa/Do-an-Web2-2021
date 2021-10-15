import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from '../components/LoadingPage/loadingSlice';

export default configureStore({
    reducer: {
        isLoading: loadingSlice,
    },
})