import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from '../components/LoadingPage/loadingSlice';
import isLonginSlice from '../contants/loginSlice';

export default configureStore({
    reducer: {
        isLoading: loadingSlice,
        isLogin: isLonginSlice,
    },
})