import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './cinema_edit.scss';
import GoogleMap from './components/GoogleMap';
import cinemaApi from '../../../../../../api/cinemaApi';
import { HideLoading, ShowLoading } from '../../../../../../components/LoadingPage/loadingSlice';

const CinemaSystemEdit = ({ buttonRef, setisFecth }) => {
    const dispatch = useDispatch();
    const [listArea, setListArea] = useState([]);
    const [listAllCity, setListAllCity] = useState([]);
    const [listDistrict, setlistDistrict] = useState({});
    const [dataCinema, setDataCinema] = useState({
        idArea: '',
        nameCinema: '',
        typeCinema: '2D',
        city: '',
        district: '',
        wards: '',
        horizontalSize: '',
        verticalSize: '',
        pointLat: '',
        pointLng: '',
    });

    useEffect(() => {
        async function fecthArea() {
            const resultArea = await cinemaApi.getAllDistrict();
            const resultCity = await cinemaApi.getAllArea();
            setListArea(resultArea.data);
            setListAllCity(resultCity.district);
        }
        fecthArea();
    }, []);

    const handleChangeArea = (e) => {
        const dataSelect = listAllCity.find(item => item.code === e.target.value);
        if(dataSelect) {
            setDataCinema({
                ...dataCinema,
                idArea: dataSelect.code,
                city: dataSelect.name
            });
            setlistDistrict(dataSelect);
        } else {
            setDataCinema({
                ...dataCinema,
                idArea: '',
                city: ''
            })
            setlistDistrict({});
        }
      
    }

    const handleSubmitForm = async () => {
        dispatch(ShowLoading());
        const result = await cinemaApi.newCinema(dataCinema);
        if(result.status === 'error') {
            dispatch(HideLoading());
            alert(result.message);
        }
        else {
            setTimeout(() => {
                dispatch(HideLoading());
                setisFecth(false);
                setDataCinema({
                    idArea: '',
                    nameCinema: '',
                    typeCinema: '2D',
                    city: '',
                    district: '',
                    wards: '',
                    horizontalSize: '',
                    verticalSize: '',
                    pointLat: '',
                    pointLng: '',
                })
                buttonRef.current.click();
            }, 1500);
        }
    }

    return (
        <div className="modal fade" id="modal-edit" role="dialog" aria-labelledby="modal-edit" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Form Thêm Rạp Chiếu Phim</h5>
                        <div type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="form-cinema-1">
                            <div className="form-group">
                                <label>Khu Vực</label>
                                <div className="input-text">
                                    <select id="option-theater" className="option-theater" onChange={(e) => handleChangeArea(e)}>
                                        <option value="">-- Chọn khu vực --</option>
                                        { 
                                            listArea.map((item) => {
                                                return <option key={item.id} value={item.id}>{item.district}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Tên Rạp</label>
                                <div className="input-text">
                                    <input 
                                        id="nameCinema" name="nameCinema" type="text"
                                        value={dataCinema.nameCinema}
                                        onChange={(e) => setDataCinema({
                                            ...dataCinema,
                                            nameCinema: e.target.value
                                        })}
                                    />
                                    <span className="form-message"></span>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Loại Rạp</label>
                                <select id="option-type" className="option-type" onChange={(e) => setDataCinema({
                                            ...dataCinema,
                                            typeCinema: e.target.value
                                        })}>
                                    <option value="2D">2D</option>
                                    <option value="3D">3D</option>
                                    <option value="4DX">4DX</option>
                                    <option value="STD">STD</option>
                                    <option value="STARIUM">STARIUM</option>
                                    <option value="PREMIUM">PREMIUM</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-cinema-2">
                            <div className="form-group-address">
                                <div className="city-address">
                                    <label>Tỉnh / Thành Phố</label>
                                    <div className="input-text">
                                        <select id="option-city" className="option-theater">
                                            { listDistrict?.name ? <option value={listDistrict.name}> {listDistrict.name} </option> : '' }
                                        </select>
                                    </div>  
                                </div>
                                <div className="district-address">
                                    <label>Quận / Huyện</label>
                                    <div className="input-text">
                                        <select 
                                            id="option-district" className="option-theater" 
                                            onChange={(e) => setDataCinema({
                                                ...dataCinema,
                                                district: e.target.value
                                            })}
                                        >
                                            {
                                                Object.keys(listDistrict).length > 0 ? listDistrict?.districts.map(item => {
                                                    return <option key={ item.id } value={ item.name }>{ item.name }</option>
                                                }) : ''
                                            }
                                        </select>
                                    </div>  
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Địa chỉ cụ thể (phường - xã)</label>
                                <div className="input-text">
                                    <input 
                                        id="nameWard" name="nameWard" type="text"
                                        value={dataCinema.wards}
                                        onChange={(e) => setDataCinema({
                                            ...dataCinema,
                                            wards: e.target.value
                                        })}
                                    />
                                    <span className="form-message"></span>
                                </div>
                            </div>
                            <div className="form-group-address">
                                <div className="city-address">
                                    <label>Horizontal size</label>
                                    <div className="input-text">
                                        <input 
                                            id="horizonSize" name="horizonSize" type="text" 
                                            value={dataCinema.horizontalSize}
                                            onChange={(e) => {
                                                const reg = /^[0-9\b]+$/;
                                                if(e.target.value === '' || reg.test(e.target.value)) { 
                                                    setDataCinema({
                                                        ...dataCinema,
                                                        horizontalSize: e.target.value
                                                    })
                                                }
                                            }}
                                        />
                                        <span className="form-message"></span>
                                    </div>  
                                </div>
                                <div className="district-address">
                                    <label>Vertical size</label>
                                    <div className="input-text">
                                        <input 
                                            id="verticalSize" name="verticalSize" type="text" 
                                            value={dataCinema.verticalSize}
                                            onChange={(e) => {
                                                const reg = /^[0-9\b]+$/;
                                                if(e.target.value === '' || reg.test(e.target.value)) { 
                                                    setDataCinema({
                                                        ...dataCinema,
                                                        verticalSize: e.target.value
                                                    })
                                                }
                                            }}
                                        />
                                        <span className="form-message"></span>
                                    </div>  
                                </div>
                            </div>
                        </div>
                        <div className="gg-map">
                            <div className="form-group-address">
                                <div className="city-address">
                                    <label>Point Lat</label>
                                    <div className="input-text">
                                        <input 
                                            id="latPoint" name="latPoint" type="text" 
                                            value={dataCinema.pointLat}
                                            onChange={(e) => setDataCinema({
                                                ...dataCinema,
                                                pointLat: e.target.value
                                            })}
                                        />
                                        <span className="form-message"></span>
                                    </div>  
                                </div>
                                <div className="district-address">
                                    <label>Point Lng</label>
                                    <div className="input-text">
                                        <input 
                                            id="lngPoint" name="lngPoint" type="text"
                                            value={dataCinema.pointLng}
                                            onChange={(e) => setDataCinema({
                                                ...dataCinema,
                                                pointLng: e.target.value
                                            })}
                                        />
                                        <span className="form-message"></span>
                                    </div>  
                                </div>
                            </div>
                            <div className="google-map" >
                                <GoogleMap />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        <button 
                            type="button" className="btn btn-info"
                            onClick={() => handleSubmitForm()}
                        >Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};


CinemaSystemEdit.propTypes = {

};


export default CinemaSystemEdit;
