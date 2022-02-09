import React, { useContext, useState, useEffect, useRef } from 'react';
import { 
    ButtonNotify, NotifyCount,
    LayoutDropNotify, NotifyTitle,
    NotifyContent, NotifyContentItem,
    ImageNotify, ContentItem, NotifyTime
} from './NotifyUser.Style';
import Images from 'src/contants/image';
import { ClipLoader } from "react-spinners";
import styled from 'styled-components';
import { Green } from 'src/contants/cssContants';
import { AuthContext } from 'src/contexts/authContext';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications } from 'src/reducers/notifySlice';
import moment from 'moment';

const LoadingNotifyLayout = styled.div` 
    width: 100%;
    min-height: 500px;
    
    div {
        font-size: 20px;
        font-weight: 600;
        color: ${Green};
    }
`;

const NotifyUser = () => {
    const dispatch = useDispatch();

    const { loading, notify } = useSelector(state => state.notifyState);

    const { state, dispatchAuth } = useContext(AuthContext);
    const { numberOfNotify } = state;

    const [activeDropNotify, setActiveDropNotify] = useState(false);
    const [loadingNotify, setLoadingNotify] = useState(true);

    const btnRef = useRef(null);
    const dropRef = useRef(null);

    const handleClickOutside = (event) => {
        if(btnRef.current && !btnRef.current.contains(event.target))
        { 
            if(dropRef && !dropRef.current.contains(event.target)) {
                setActiveDropNotify(false);
                setTimeout(() => {
                    setLoadingNotify(true);
                }, 500);
            }
        }
    }

    const handleScrollHide = () => {
        setActiveDropNotify(false);
        setTimeout(() => {
            setLoadingNotify(true);
        }, 500);
    }
    useEffect(() => {
        window.addEventListener('click', handleClickOutside);
        window.addEventListener('scroll', handleScrollHide);

        return () => {
            window.removeEventListener('click', handleClickOutside);
            window.removeEventListener('scroll', handleScrollHide);
        }
    }, []);

    useEffect(() => {
        if(activeDropNotify === true) {
            let timeOut = setTimeout(() => {
                if(loading === false)
                {
                    dispatchAuth({
                        type: 'CLEAR_NUMBER_OF_NOTIFY',
                        payload: null,
                    })
                    setLoadingNotify(false);
                }
            }, 500);
    
            return () => clearTimeout(timeOut);
        }
    }, [activeDropNotify, loading]);
    

    return (
        <>
            <ButtonNotify
                ref={btnRef}
                onClick={() => {
                    setActiveDropNotify(!activeDropNotify);
                    if(activeDropNotify) {
                        setTimeout(() => {
                            setLoadingNotify(true);
                        }, 500);
                    }
                    else {
                        dispatch(getNotifications());
                    }
                }} 
            >
                <i className="fal fa-bells"></i>
                {
                    numberOfNotify && numberOfNotify !== 0 
                    && <NotifyCount>
                        <span>{ numberOfNotify }</span>
                    </NotifyCount>
                }
            </ButtonNotify>

            <LayoutDropNotify className={activeDropNotify ? "active" : ""} ref={dropRef} >
                <div className="w-100">
                    <div className="w-100 d-flex justify-content-between align-items-center p-3" style={{borderBottom: '2px solid #27df2d'}}>
                        <NotifyTitle>Thông báo</NotifyTitle>
                        <div></div>
                    </div>
                </div>
                {
                    loadingNotify 
                    ? <LoadingNotifyLayout className="d-flex flex-column align-items-center pt-5">
                        <ClipLoader size={50} color={Green}/>
                        <div className="mt-3">Đang tải thông báo...</div>
                    </LoadingNotifyLayout>
                    : <div data-simplebar style={{width: '100%', maxHeight: '540px'}}>
                        <NotifyContent>
                            {
                                notify && notify.length > 0
                                && notify.map(n => {
                                    const momentTime =  moment(n.time).fromNow();
                                    return <NotifyContentItem key={n.uuid}>
                                            <ImageNotify>
                                                <img src={n.image ? n.image : Images.DefaultAvatar} alt="Image Error" style={{width: '60px', height: '60px', objectFit: 'contain', borderRadius: '50%'}} />
                                            </ImageNotify>
                                            <ContentItem className="ml-3">
                                                <p dangerouslySetInnerHTML={{__html:  n.message }}></p>
                                                <NotifyTime>{ momentTime }</NotifyTime>
                                            </ContentItem>
                                        </NotifyContentItem>
                                })
                            }
                        </NotifyContent>
                    </div>
                }
            </LayoutDropNotify>
        </>
    );
};

export default NotifyUser;
