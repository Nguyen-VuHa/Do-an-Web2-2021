import React, { useEffect, useState } from 'react';
import TableItem from '../TableItem';
import movieApi from '../../../../../../../../api/movieApi';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

const TableView = ({ listMovie, pages, pageIndex, fecthAllMovie }) => {
    const match = useRouteMatch();

    return (
        <>
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
                        {
                            listMovie.length > 0 ? listMovie.map((item) => {
                                            return  <TableItem key={item.movieId} data={item}/>
                                        })
                                    : <tr>
                                        <th colSpan={7} className="emty-item">Không tìm thấy bộ phim nào!. . .</th>
                                    </tr>
                        }
                    </tbody>
                </table>
            </div>
            {
                listMovie.length > 0 ?  <ul className="pagination">
                                    <li>
                                        <Link 
                                            to={match.url} 
                                            className={ pageIndex === 1 ? "disable" : ""} 
                                            onClick={ pageIndex === 1 ? null : () => {
                                                                fecthAllMovie(pageIndex - 1)
                                            }}
                                        >
                                            <i className="fas fa-angle-left"></i>
                                        </Link>
                                    </li>
                                    {
                                    pages.map((item, index) => {    
                                        return <li key={index}>
                                                    <Link 
                                                        to={match.url}
                                                        className={ item.status === 1 ? 'active' : ''} 
                                                        onClick={  item.status === 1 ? null : () => {
                                                            fecthAllMovie(item.index)
                                                        }}
                                                    >{ item.index }</Link>
                                                </li>})}
                                                <li>
                                                    <Link 
                                                        to={match.url} 
                                                        className={ pageIndex === pages.length ? "disable" : ""}
                                                        onClick={ pageIndex === pages.length ? null : () => {
                                                            fecthAllMovie(pageIndex + 1)
                                                        }}
                                                    >
                                                        <i className="fas fa-angle-right"></i>
                                                    </Link>
                                                </li>
                                            </ul>
                        : ''
            }
         
        </>
       
    );
};


TableView.propTypes = {

};


export default TableView;
