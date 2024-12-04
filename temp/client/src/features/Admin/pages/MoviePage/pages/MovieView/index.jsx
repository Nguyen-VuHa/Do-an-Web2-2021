import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TableView from './components/TableView';
import './movie_view.scss';
import movieApi from '../../../../../../api/movieApi';

const MovieView = () => {
    const [textSearch, settextSearch] = useState('');
    const [listMovie, setlistMovie] = useState([]);
    const [pages, setPages] = useState([]);
    const [pageIndex, setpageIndex] = useState(0);

    async function fecthAllMovie(page) { 
        let arrayTemp = [];
        let result = await movieApi.getPagination(page ? page : 1, textSearch);
        if(result.status === 200) {
            setlistMovie(result.data);
            console.log(result);
            for( let i = 0; i < result.totalPages; i++) {
                let item = {};
                if((i + 1) === result.currentPage)
                {
                    item = {
                        index: i + 1,
                        status: 1
                    };
                    setpageIndex((i + 1));
                }
                else {
                    item = {
                        index: i + 1,
                        status: 0
                    };
                }
                arrayTemp.push(item)
            }
            setPages(arrayTemp);
        }
        else 
            return;
    }

    useEffect(() => {
        fecthAllMovie();
    }, []);

    return (
        <div className="movie-view">
            <div className="movie">
                <div className="movie__control">
                    <h3>Danh Sách Phim Có Trong Rạp</h3>
                    <div className="group-control">
                        <div className="group-search">
                            <input 
                                type="text" placeholder="Tìm kiếm theo tên film . . ."
                                value={ textSearch }
                                onChange={(e) => settextSearch(e.target.value)}
                            ></input>
                            <button type="button" onClick={() => fecthAllMovie()}><i className="far fa-search"></i></button>
                        </div>
                        <Link to="/admin/movie/editor" className="btn btn-success btn-add">
                            <i className="fal fa-plus-circle"></i>
                            Thêm Phim
                        </Link>
                    </div>
                </div>
                <div className="movie__gridview mt-3">
                    <TableView listMovie={ listMovie } pages={pages} pageIndex={pageIndex} fecthAllMovie={fecthAllMovie}/>
                </div>
            </div>
        </div>
    );
};


MovieView.propTypes = {

};


export default MovieView;
