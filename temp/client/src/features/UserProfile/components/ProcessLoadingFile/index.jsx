import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isHiden } from './processLoadingSlice';
import './process_loading.scss';

const ProcessLoadingFile = () => {
    const state = useSelector((state) => state.processLoading);
    const dispatch = useDispatch();
    const [timeDirection, settimeDirection] = useState(70);
    const [valueProcess, setValueProcess] = useState(0);
    
    useEffect(() => {
        if(state.isLoading) {
            const timeout = setTimeout(() => {
                setValueProcess(valueProcess + 1);
            }, timeDirection);
    
            if(valueProcess === 33)
                settimeDirection(30)
    
            if(valueProcess === 80)
                settimeDirection(10)

            if(state.status === 1)
                settimeDirection(1);
    
            if(valueProcess === 100 && state.status === 1)
            {
                clearTimeout(timeout);
               
            }
            return () => clearTimeout(timeout);
        }
    }, [valueProcess, state, timeDirection]);

    useEffect(() => {
        if(valueProcess === 100 && state.status === 0)
        {
            setValueProcess(99);
            settimeDirection(999999);
        }
    }, [valueProcess, state]);


    useEffect(() => {
        if(valueProcess === 100) { 
            const timeHide = setTimeout(() => {
                settimeDirection(70);
                dispatch(isHiden());
                setValueProcess(0);
            }, 1000);

           
            return () => clearTimeout(timeHide);
        }
    }, [valueProcess, dispatch]);


    return (
        <div className={ state.isLoading ? "popup-loading active" : "popup-loading"}>
            <div className="card shadow mb-1">
                <div className="card-body p-3">
                    <h4>{ valueProcess === 100 ? 'Hoàn tất' : 'Đang xử lý. . .' }</h4>
                    <p className="font-italic">{ valueProcess === 100 ? 'Hình ảnh đã được xử lý' : 'Hình ảnh đang được tải lên' }</p>
                    <div className="progress-outer">
                        <div className="progress">
                            <div className="progress-bar progress-bar-info progress-bar-striped active" role="progressbar" aria-valuenow={55} aria-valuemin={0} aria-valuemax={100} style={{width: `${valueProcess}%`, boxShadow: '-1px 10px 10px rgba(91, 192, 222, 0.7)'}} />
                            <div className="progress-value">{`${valueProcess}%`}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


ProcessLoadingFile.propTypes = {

};


export default ProcessLoadingFile;
