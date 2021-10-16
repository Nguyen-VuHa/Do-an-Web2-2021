import React, { useEffect, useState } from 'react';

const FormMovie = ({ setlistData, messageValid }) => {
    const [listDataMovie, setListDataMovie] = useState({
        nameMovie: '',
        time: '',
        description: '',
        startdate: '',
        enddate: '',
        category: '',
        directors: '',
        mainActor: '',
        chanelId: '',
    });

    useEffect(() => {
        setlistData(listDataMovie);
    }, [listDataMovie]);

    const handleChangeInput = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        switch (name) {
            case 'nameMovie':
                setListDataMovie({
                    ...listDataMovie,
                    nameMovie: value,
                })
                break;
            case 'time':
                const reg = /^[0-9\b]+$/;
                if(value === '' || reg.test(value)) {
                    setListDataMovie({
                        ...listDataMovie,
                        time: value,
                    })
                }
                break;
            case 'description':
                setListDataMovie({
                    ...listDataMovie,
                    description: value,
                })
                break;
            case 'startdate':
                setListDataMovie({
                    ...listDataMovie,
                    startdate: value,
                })
                break;
            case 'enddate':
                setListDataMovie({
                    ...listDataMovie,
                    enddate: value,
                })
                break;
            case 'category':
                setListDataMovie({
                    ...listDataMovie,
                    category: value,
                })
                break;
            case 'directors':
                setListDataMovie({
                    ...listDataMovie,
                    directors: value,
                })
                break;
            case 'mainActor':
                setListDataMovie({
                    ...listDataMovie,
                    mainActor: value,
                })
                break;
            case 'chanelId':
                setListDataMovie({
                    ...listDataMovie,
                    chanelId: value,
                })
                break;
            default:
                break;
        }
    }

    return (
        <div className="form-content">
            <div className="group-info-movie">
                <h3>Thông Tin Film</h3>
                <div className="form-group">
                    <label>Tên Film</label>
                    <div className="input-text">
                        <input 
                            id="name" name="nameMovie" type="text" 
                            value={listDataMovie.nameMovie}
                            onChange={(e) => handleChangeInput(e)}
                        />
                        <span className="form-message" >{messageValid.nameMovie}</span>
                    </div>
                </div>
                <div className="form-group">
                    <label>Thời lượng (phút)</label>
                    <div className="input-text">
                        <input 
                            id="time" name="time" type="text" 
                            value={listDataMovie.time}
                            onChange={(e) => handleChangeInput(e)}
                        />
                        <span className="form-message" >{messageValid.time}</span>
                    </div>
                </div>
                <div className="form-group">
                    <label>Mô tả</label>
                    <div className="input-text">
                        <textarea 
                            id="description" name="description" type="text"
                            value={listDataMovie.description}
                            onChange={(e) => handleChangeInput(e)}
                        />
                        <span className="form-message" >{ messageValid.description }</span>
                    </div>
                </div> 
                <div className="form-datetime-picker">
                    <div className="form-group">
                        <label>Ngày công chiếu</label>
                        <div className="input-text">
                            <input 
                                id="startdate" name="startdate" type="date" 
                                value={listDataMovie.startdate}    
                                onChange={(e) => handleChangeInput(e)}
                            />
                            <span className="form-message">{messageValid.startdate}</span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Ngày kết thúc</label>
                        <div className="input-text">
                            <input 
                                id="enddate" name="enddate" type="date"   
                                value={listDataMovie.enddate}   
                                onChange={(e) => handleChangeInput(e)}
                            />
                            <span className="form-message">{messageValid.enddate}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="group-info-related">
                <h3>Thông Tin Liên Quan</h3>
                <div id="form-group" className="form-group">
                    <label>Thể loại</label>
                    <div className="input-text">
                        <input 
                            id="category" name="category" type="text"  
                            value={listDataMovie.category} 
                            onChange={(e) => handleChangeInput(e)}
                        />
                        <span className="form-message">{messageValid.category}</span>
                    </div>
                </div>
                <div id="form-group" className="form-group">
                    <label>Đạo diễn</label>
                    <div className="input-text">
                        <input 
                            id="directors" name="directors" type="text"  
                            value={listDataMovie.directors} 
                            onChange={(e) => handleChangeInput(e)}
                        />
                        <span className="form-message">{messageValid.directors}</span>
                    </div>
                </div>
                <div id="form-group" className="form-group">
                    <label>Diễn viên chính</label>
                    <div className="input-text">
                        <input 
                            id="mainActor" name="mainActor" type="text"
                            value={listDataMovie.mainActor} 
                            onChange={(e) => handleChangeInput(e)}
                        />
                        <span className="form-message" >{messageValid.mainActor}</span>
                    </div>
                </div>
                <div id="form-group" className="form-group">
                    <label>ID Chanel Video trailer</label>
                    <div className="input-text">
                        <input 
                            id="chanelId" name="chanelId" type="text"   
                            value={listDataMovie.chanelId} 
                            onChange={(e) => handleChangeInput(e)}
                        />
                        <span className="form-message" >{messageValid.chanelId}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};


FormMovie.propTypes = {

};


export default FormMovie;
