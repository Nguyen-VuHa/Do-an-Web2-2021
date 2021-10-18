import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from '../components/LoadingPage/loadingSlice';
import isLonginSlice from '../contants/loginSlice';
import dataHomePpage from '../features/HomePage/homepageSlice';

export default configureStore({
    reducer: {
        isLoading: loadingSlice,
        isLogin: isLonginSlice,
        homepage: dataHomePpage,
    },
})