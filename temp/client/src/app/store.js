import { configureStore } from "@reduxjs/toolkit";
import homepageSlice from "src/reducers/homePageSlice";
import systemCinemaSlice from "src/reducers/systemCinemaSlice";
import movieSlice from "src/reducers/movieSlice";
import commentSlice from "src/reducers/commentSlice";
import notifySlice from "src/reducers/notifySlice";
import profileSlice from "src/reducers/profileSlice";
import showtimeSlice from 'src/reducers/showtimeSlice';
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
        systemCinemaState: systemCinemaSlice,
        movieState: movieSlice,
        commentState: commentSlice,
        notifyState: notifySlice,
        profileState: profileSlice,
        showtimeState: showtimeSlice,
    },
})