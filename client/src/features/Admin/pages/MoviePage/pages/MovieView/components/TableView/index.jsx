import React, { useEffect, useState } from 'react';
import TableItem from '../TableItem';
import movieApi from '../../../../../../../../api/movieApi';
import axios from 'axios';

const TableView = () => {
    const [listMovie, setlistMovie] = useState([]);

    useEffect(() => {
        async function fecthAllMovie() { 
            var result = await movieApi.getAllMovie();
            setlistMovie(result.data);
        }
        fecthAllMovie();

        return () => {
           
        }
    }, []);

    return (
        <div className="table-list">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Tên Film</th>
                        <th scope="col">Thời Lượng</th>
                        <th scope="col">Đạo diễn</th>
                        <th scope="col">Thể loại</th>
                        <th scope="col">Ngày CC</th>
                        <th scope="col">Ngày KT</th>
                        <th scope="col">Option</th>
                    </tr>
                </thead>
                <tbody id="list-movies">
                    {listMovie.length > 0 && listMovie.map((item) => {
                        return  <TableItem key={item.movieId} data={item}/>
                    })}
                </tbody>
            </table>
        </div>
    );
};


TableView.propTypes = {

};


export default TableView;
