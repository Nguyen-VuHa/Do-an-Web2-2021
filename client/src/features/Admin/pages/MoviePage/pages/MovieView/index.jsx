import React from 'react';
import { Link } from 'react-router-dom';
import TableView from './components/TableView';
import './movie_view.scss';

const MovieView = () => {

    return (
        <div className="movie-view">
            <div className="movie">
                <div className="movie__control">
                    <h3>Danh Sách Phim Có Trong Rạp</h3>
                    <div className="group-control">
                        <div className="group-search">
                            <input 
                                type="text" placeholder="Tìm kiếm theo tên film . . ."
                                
                            ></input>
                            <button type="button"><i className="far fa-search"></i></button>
                        </div>
                        <Link to="/admin/movie/editor" className="btn btn-success btn-add">
                            <i className="fal fa-plus-circle"></i>
                            Thêm Phim
                        </Link>
                    </div>
                </div>
                <div className="movie__gridview mt-3">
                    <TableView />
                </div>
            </div>
        </div>
    );
};


MovieView.propTypes = {

};


export default MovieView;
