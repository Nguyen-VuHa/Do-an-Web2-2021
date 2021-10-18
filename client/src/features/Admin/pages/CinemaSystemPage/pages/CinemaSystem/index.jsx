import React, { useEffect, useState } from 'react';
import './cinema_sys.scss';
import cinemaApi from '../../../../../../api/cinemaApi';

const CinemaSystemView = ({ buttonRef, setisFecth, isFecth }) => {

    const [listCinema, setlistCinema] = useState([]);
    
    const fecthData = async () => {
        const result = await cinemaApi.getAllCinema();
        setlistCinema(result.data);
    }

    useEffect(() => {

        if(!isFecth) {
            fecthData();
        }

    }, [isFecth]);

    console.log(listCinema);

    return (
        <div className="cinema-sys">
            <div className="header-sys">
                <h3>List Cinema</h3>
                <div className="control">
                    <div 
                        className="btn btn-success btn-add" data-toggle="modal" 
                        data-target="#modal-edit" ref={ buttonRef }
                        onClick={() => setisFecth(true)}
                    >
                        <i className="fal fa-plus-circle mr-2"></i>
                        Thêm Rạp Chiếu
                    </div>
                </div>
            </div>
            <div className="datagrid-view">
                    <div className="table-list">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Tên Rạp</th>
                                <th scope="col">Loại Rạp</th>
                                <th scope="col">Khu Vực</th>
                                <th scope="col">Size Ngang</th>
                                <th scope="col">Size Dọc</th>
                                <th scope="col">Địa Chỉ</th>
                                <th scope="col-2">Option</th>
                            </tr>
                        </thead>
                        <tbody id="list-movies">
                            {
                                listCinema && listCinema.map((data) => {
                                    return <tr key={data.id}>
                                        <th> { data.nameCinema} </th>
                                        <th> { data.typeCinema} </th>
                                        <th> { data.city} </th>
                                        <th> { data.horizontalSize} </th>
                                        <th> { data.verticalSize} </th>
                                        <th> { `${data.wards}, ${data.district} - ${data.city}`} </th>
                                        <th style={{display: 'flex'}}>
                                            <div  className="btn btn-primary btn-edit w-25 mr-2"><i className="fal fa-edit"></i></div>
                                            <div  className="btn btn-danger btn-remove w-25"><i className="fal fa-trash-alt"></i></div>
                                        </th>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};


CinemaSystemView.propTypes = {

};


export default CinemaSystemView;
