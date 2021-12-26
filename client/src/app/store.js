import { configureStore } from "@reduxjs/toolkit";
import homepageSlice from "src/reducers/homePageSlice";
// import loadingSlice from '../components/LoadingPage/loadingSlice';
// import isLonginSlice from '../contants/loginSlice';
// import dataHomePpage from '../features/HomePage/homepageSlice';
// import ProcessLoadingFile from "../features/UserProfile/components/ProcessLoadingFile/processLoadingSlice";
// import imageUsersSlice from '../features/UserProfile/components/ModalEditImage/imageUserSlice';
// import avartarUserSlice from '../features/UserProfile/profileSlice';
// import cinemaSlice from '../features/CenimaSystem/cinemaSystemSlice';
// import movieDetailSlice from "../features/MovieDetail/movieDetailSlice";
// import commentSlice from "../features/MovieDetail/components/CommentMovie/commentSlice";

export default configureStore({
    reducer: {
        homepageState: homepageSlice,
    },
})