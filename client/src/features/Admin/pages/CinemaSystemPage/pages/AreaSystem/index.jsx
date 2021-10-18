import React, { useEffect, useState } from 'react';
import './area_view.scss';
import cinemaApi from '../../../../../../api/cinemaApi';

const AreaSystem = ({ isActive }) => {
    const [area, setArea] = useState([]);
    const [codeArea, setCodeArea] = useState('');
    const [nameArea, setNameArea] = useState('');
    const [listArea, setlistArea] = useState([]);


    useEffect(() => {
        async function fecthLocalDistrict() {
            const result = await cinemaApi.getAllArea();
            setArea(result.district);
        }

        fecthLocalDistrict();
    }, []);

    async function fecthDataDistrict() {
        const result = await cinemaApi.getAllDistrict();
        setlistArea(result.data);
    }

    useEffect(() => {
        fecthDataDistrict();
    }, [isActive]);

    const handleChangeSelect = (e) => {
        setNameArea(area[e.target.selectedIndex - 1]?.name);
        setCodeArea(e.target.value);
    }

    const handleSubmit = async () => {
        if(codeArea) {
            const data = {
                id: codeArea,
                district: nameArea.trim(),
            }
            const result = await cinemaApi.newDistrict(data);
            if(result.status === 'error') {
                alert(result.message);
            }
            else {
                fecthDataDistrict();
            }
        }
        else {
            alert('Bạn chưa chọn khu vực!');
        }
    }

    return (
        <div className="area-view">
            <h3>Area System</h3>
            <div className="layout-area">
                <div className="form-data">
                    <div className="form-group">
                        <label>Khu Vực</label>
                        <select 
                            id="option-province" className="option-province" 
                            name="calc_shipping_provinces"
                            onChange={(e) => handleChangeSelect(e)}
                        >
                            <option value="">Tỉnh / Thành phố</option>
                            {
                                area.map((data) => {
                                    return <option key={data.id} value={data.code}>{data.name}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>ID Khu Vực</label>
                        <div className="input-text">
                            <input 
                                id="theater-id" name="theater-id" 
                                type="text" className="input" readOnly
                                value={codeArea}
                            />
                            <span className="form-message"></span>
                        </div>
                    </div>
                    <button 
                        id="btn-save" type="button" 
                        className="btn btn-success"
                        onClick={() => handleSubmit()}
                    >Save Change</button>
                </div>
                <div className="list-area">
                    <table id="dtVerticalScrollExample" class="table table-striped table-bordered table-sm" cellspacing="0"
                        width="100%">
                        <thead>
                            <tr style={{color: 'green'}}>
                                <th class="th-sm" scope="col">ID</th>
                                <th class="th-sm" scope="col">Khu Vực</th>
                            </tr>
                            </thead>
                            <tbody id="list-district">
                            {
                                listArea.map((data) => {
                                    return <tr className="btn-tr" key={data.id}>
                                                <th scope="row">{data.id}</th>
                                                <td>{data.district}</td>
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


AreaSystem.propTypes = {

};


export default AreaSystem;
