import React, { useEffect, useState } from 'react';
import moment from 'moment';

const FormProfile = ({ isEditor, dataUser, setvalueSubmit }) => {
    const [valueForm, setValueForm] = useState({
        idUser: '',
        email: '',
        fullname: '',
        numberphone: '',
        birthday: '',
        sex: '',
        address: '',
    });

    useEffect(() => {
        setvalueSubmit(valueForm);

        return () => {
            setvalueSubmit({});
        }
    }, [valueForm, setvalueSubmit]);

    useEffect(() => {
        if(Object.keys(dataUser).length > 0) {
            setValueForm({
                idUser: dataUser.idUser,
                email: dataUser.email,
                fullname: dataUser.fullname,
                numberphone: dataUser.numberphone,
                birthday: dataUser.birthday ? moment(dataUser.birthday).format('YYYY-MM-DD') : null,
                sex: dataUser.sex,
                address: dataUser.address,
            })
        }

        return () => {
            setValueForm({
                idUser: '',
                email: '',
                fullname: '',
                numberphone: '',
                birthday: '',
                sex: '',
                address: '',
            });
        }
    }, [dataUser]);

    return (
        <>
            <div className="group-layout">
                <div id="form-group" className="form-group disable">
                    <label>Mã Thẻ Thành Viên</label>
                    <div className="input-text">
                        {
                            Object.keys(dataUser).length > 0 ? 
                                <input 
                                    id="code" name="code" 
                                    type="text" className="disable" disabled
                                    value={valueForm.idUser}
                                />
                                : <div className="skeleton-box" style={{width: '100%', height: '20px', background: '#386976'}}></div>
                        }
                        <div className="form-message"></div>
                    </div>
                </div>  
                <div id="form-group" className="form-group disable">
                    <label>Email</label>
                    <div className="input-text">
                        {
                            Object.keys(dataUser).length > 0 ? 
                                <input 
                                    id="email" name="email" 
                                    type="text" className="disable" disabled
                                    value={valueForm.email}
                                />
                                : <div className="skeleton-box" style={{width: '70%', height: '20px', background: '#386976'}}></div>
                        }
                        <div className="form-message"></div>
                    </div>
                </div>  
            </div>
            <div className="group-layout">
                <div className="form-group disable">
                    <label>Họ & Tên</label>
                    <div className="input-text">
                        {
                            Object.keys(dataUser).length > 0 ? 
                                <input 
                                    id="fullname" name="fullname" 
                                    type="text" className={isEditor ? "" : "disable"} disabled={isEditor ? false : true}
                                    value={valueForm.fullname}
                                    onChange={(e) =>  setValueForm({
                                            ...valueForm,
                                            fullname: e.target.value,
                                        })}
                                    autoComplete="off"
                                />
                                : <div className="skeleton-box" style={{width: '50%', height: '20px', background: '#386976'}}></div>
                        }
                        <div className="form-message"></div>
                    </div>
                </div>  
                <div className="form-group disable">
                    <label>Số Điện Thoại</label>
                    <div className="input-text">
                        {
                            Object.keys(dataUser).length > 0 ? 
                                <input 
                                    id="numberphone" name="numberphone" 
                                    type="text" className={isEditor ? "" : "disable"} disabled={isEditor ? false : true}
                                    value={valueForm.numberphone}
                                    onChange={(e) => {
                                        const reg = /^[0-9\b]+$/;
                                        if(e.target.value === '' || reg.test(e.target.value))
                                        {
                                            setValueForm({
                                                ...valueForm,
                                                numberphone: e.target.value,
                                            })
                                        }
                                    }}
                                    autoComplete="off"
                                />
                                : <div className="skeleton-box" style={{width: '50%', height: '20px', background: '#386976'}}></div>
                        }
                        <div className="form-message"></div>
                    </div>
                </div>  
            </div>
            <div className="group-layout">
                <div className="form-group disable">
                    <label>Ngày sinh nhật</label>
                    <div className="input-text">
                        {
                            Object.keys(dataUser).length > 0 ? 
                                <input 
                                    id="birthday" name="birthday" type="date" className={isEditor ? "" : "disable"} disabled={isEditor ? false : true}
                                    value={valueForm.birthday}
                                    onChange={(e) => setValueForm({
                                        ...valueForm,
                                        birthday: e.target.value,
                                    })}
                                    autoComplete="off"
                                />
                                : <div className="skeleton-box" style={{width: '50%', height: '20px', background: '#386976'}}></div>
                        }
                        <div className="form-message"></div>
                    </div>
                </div>  
                <div className="form-group disable">
                    <label>Giới tính</label>
                    <div className="input-text">
                        {
                            Object.keys(dataUser).length > 0 ? 
                                <select 
                                    className={isEditor ? "" : "disable"} disabled={isEditor ? false : true}
                                    value={valueForm.sex}
                                    onChange={(e) => setValueForm({
                                        ...valueForm,
                                        sex: e.target.value,
                                    })}
                                    autoComplete="off"
                                >
                                    <option value="">-- Chọn giới tính --</option>
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                    <option value="Khác">Khác</option>
                                </select>
                                : <div className="skeleton-box" style={{width: '50%', height: '20px', background: '#386976'}}></div>
                        }
                        <div className="form-message"></div>
                    </div>
                </div>  
            </div>
            <div className="form-group disable">
                <label>Địa chỉ</label>
                <div className="input-text">
                    {
                        Object.keys(dataUser).length > 0 ? 
                            <textarea 
                                id="address" name="address" 
                                type="text" className={isEditor ? "" : "disable"} disabled={isEditor ? false : true}
                                value={valueForm.address}
                                onChange={(e) => setValueForm({
                                    ...valueForm,
                                    address: e.target.value,
                                })}
                                autoComplete="off"
                            />
                            :   <div>
                                    <div className="skeleton-box" style={{width: '90%', height: '20px', background: '#386976'}}></div>
                                    <div className="skeleton-box" style={{width: '65%', height: '20px', background: '#386976', marginTop: '5px'}}></div>
                                    <div className="skeleton-box" style={{width: '50%', height: '20px', background: '#386976', marginTop: '5px'}}></div>
                                </div>
                    }
                    <div className="form-message"></div>
                </div>
            </div>  
        </>
    );
};


FormProfile.propTypes = {

};


export default FormProfile;
