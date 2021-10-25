import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import isByLength from 'validator/lib/isByteLength';
import isEmpty from 'validator/lib/isEmpty';
import movieApi from '../../../../../../api/movieApi';
import { HideLoading, ShowLoading } from '../../../../../../components/LoadingPage/loadingSlice';
import FormMovie from './components/FormMovie';
import PosterMovie from './components/PosterMovie';
import './movie_editor.scss';

const MovieEditor = () => {
    const history = useHistory();
    const params = useParams();
    const [listPoster, setListPoster] = useState({});
    const [listData, setlistData] = useState({});
    const [messageValid, setmessageValid] = useState({});

    const dispatch = useDispatch();

    const handleBack = () => {
        history.goBack();
    }

    const handleSubmit =async () => {
        const valid = validatorAll(listData);
        const poster = checkPoster(listPoster);
        if(!poster) {
           alert("Bạn cần chọn đủ 4 poster!");
        } else if(!valid) {
            alert("Bạn cần nhập đủ thông tin cần thiết!");
        }
        else {
            dispatch(ShowLoading());
            var data = {
                poster: listPoster,
                dataMovie: listData
            }
            
            if(!params.movieId)
            {
                var result = await movieApi.newMovie(data);
                if(result.status === 200)
                {
                    setTimeout(() => {
                        dispatch(HideLoading());
                        history.push('/admin/movie/view');
                    }, 1000);
                }
                else{
                    alert(result.message);
                    dispatch(HideLoading());
                }
            }
            else {
                let resultMovie = await movieApi.updateMovie(data, params.movieId);
                if(resultMovie.status === 200)
                {
                    setTimeout(() => {
                        dispatch(HideLoading());
                        history.push('/admin/movie/view');
                    }, 1000);
                }
                else{
                    alert(resultMovie.message);
                    dispatch(HideLoading());
                }
            }
        }
       
    }

    const checkPoster = (poster) => {
        if(poster.poster1 === '' || poster.poster2 === '' || poster.poster3 === '' || poster.poster4 === '' )
            return false;
        else
            return true;
    }

    const validatorAll = (data) => {
        var msg = {};

        if(isEmpty(data.nameMovie))
            msg.nameMovie = "Trường này không được trống!";
        else if(isByLength(data.nameMovie, 80))
            msg.nameMovie = "Tên Films quá dài! phải thấp hơn 80 ký tự";
        else
            delete msg.nameMovie

        if(isEmpty(data.time))
            msg.time = "Trường này không được trống!";
        else if(data.time > 400)
            msg.time = "Thời lượng đã vượt quá ngưỡng cho phép của 1 bộ films";
        else
            delete msg.time

        if(isEmpty(data.description))
            msg.description = "Trường này không được trống!";
        else if(isByLength(data.description, 1000))
            msg.description = "Mô tả không được vượt quá 1000 ký tự";
        else
            delete msg.description

        if(isEmpty(data.startdate))
            msg.startdate = "Trường này không được trống!";
        else
            delete msg.startdate

        var startDate = new Date(data.startdate);
        var endDate = new Date(data.enddate);
        if(isEmpty(data.enddate))
            msg.enddate = "Trường này không được trống!";
        else if(startDate.getTime() >= endDate.getTime())
            msg.enddate = "Ngày kết thúc phải lớn hơn ngày bắt đầu";
        else
            delete msg.enddate

        if(isEmpty(data.category))
            msg.category = "Trường này không được trống!";
        else if(isByLength(data.category, 255))
            msg.category = "Tên thể loại quá dài!";
        else
            delete msg.category

        if(isEmpty(data.directors))
            msg.directors = "Trường này không được trống!";
        else if(isByLength(data.directors, 255))
            msg.directors = "Tên nhà sản xuất quá dài!";
        else
            delete msg.directors

        if(isEmpty(data.mainActor))
            msg.mainActor = "Trường này không được trống!";
        else if(isByLength(data.mainActor, 255))
            msg.mainActor = "Tên diễn viên quá dài!";
        else
            delete msg.mainActor

        if(isEmpty(data.chanelId))
            msg.chanelId = "Trường này không được trống!";
        else if(isByLength(data.chanelId, 255))
            msg.chanelId = "chanel ID không hợp lệ!";
        else
            delete msg.chanelId

        setmessageValid(msg);
        if(Object.keys(msg).length > 0) return false;

        return true;
    }

    return (
        <div className="movie-editor">
            <h3 class="title">Add Movies</h3>   
            <PosterMovie setListPoster={setListPoster}/>
            <FormMovie setlistData={setlistData} messageValid={messageValid}/>
            <div className="movie-editor-control">
                <div className="group-button">
                    <div className="btn btn-warning mr-2" onClick={() => handleBack()}>
                        Hủy
                    </div>
                    <div className="btn btn-success" onClick={() => handleSubmit()}>
                        Lưu Lại
                    </div>
                </div>
            </div>
        </div>
    );
};


MovieEditor.propTypes = {

};


export default MovieEditor;
