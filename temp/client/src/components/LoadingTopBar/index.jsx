import React, { useContext, useEffect, useRef } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { LoadingContext } from 'src/contexts/loadingContext';

const LoadingTopBar = () => {
    const ref = useRef(null);
    const { stateLoading } = useContext(LoadingContext);
    
    useEffect(() => {
        if(ref && ref.current){
            if(stateLoading !== null)
            {
                if(stateLoading){
                    ref.current.continuousStart();
                }
                else {
                    ref.current.continuousStart();
                    let timeOut = setTimeout(() => {
                        ref.current.complete();
                    }, 500)
                    
                    return () => clearTimeout(timeOut);
                }
            }
        }
    }, [stateLoading]);

    return (
        <>
            <LoadingBar color="#27df2d" ref={ref} shadow={true}/>
        </>
    );
};

export default LoadingTopBar;
