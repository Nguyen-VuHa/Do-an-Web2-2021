import React from 'react';
import { useSelector } from 'react-redux';
import './loading.scss';

const LoadingPage = () => {
    const isLoading = useSelector((state) => state.isLoading);

    return (
        <div className={isLoading ? 'section-loader' : 'section-loader hide'}>
            <div className="loader">
                <span style={{'--i': 1}} />
                <span style={{'--i': 2}} />
                <span style={{'--i': 3}} />
                <span style={{'--i': 4}} />
                <span style={{'--i': 5}} />
                <span style={{'--i': 6}} />
                <span style={{'--i': 7}} />
                <span style={{'--i': 8}} />
                <span style={{'--i': 9}} />
                <span style={{'--i': 10}} />
                <span style={{'--i': 11}} />
                <span style={{'--i': 12}} />
                <span style={{'--i': 13}} />
                <span style={{'--i': 14}} />
                <span style={{'--i': 15}} />
                <span style={{'--i': 16}} />
                <span style={{'--i': 17}} />
                <span style={{'--i': 18}} />
                <span style={{'--i': 19}} />
                <span style={{'--i': 20}} />
            </div>
            <div className="content-loading">
                Chờ nhó! Đang loading. . .
            </div>
      </div>
      
    );
};


LoadingPage.propTypes = {

};


export default LoadingPage;
