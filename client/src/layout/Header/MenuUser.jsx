import React, { useContext, useEffect, useRef, useState } from 'react';
import { ButtonUser, LayoutDropMenu, ButtonMenu } from './MenuUser.Style';
import Images from 'src/contants/image';
import { Text } from 'src/style-common/Text.Style';
import { Divider } from 'src/style-common/Layout.Style';
import { Link } from 'react-router-dom';
import { AuthContext } from 'src/contexts/authContext';

const MenuUser = () => {
    const { state, dispatchAuth } = useContext(AuthContext);

    const btnRef = useRef(null);
    const dropRef = useRef(null);

    const [activeDropNotify, setActiveDropNotify] = useState(false);

    const handleClickOutside = (event) => {
        if(btnRef.current && !btnRef.current.contains(event.target))
        { 
            if(dropRef && !dropRef.current.contains(event.target)) {
                setActiveDropNotify(false);
            }
        }
    }

    const handleScrollHide = () => {
        setActiveDropNotify(false);
    }

    useEffect(() => {
        window.addEventListener('click', handleClickOutside);
        window.addEventListener('scroll', handleScrollHide);

        return () => {
            window.removeEventListener('click', handleClickOutside);
            window.removeEventListener('scroll', handleScrollHide);
        }
    }, []);

    const handleLogout = () => {
        dispatchAuth({
            type: 'CLEAR_USER_INFO',
            payload: null,
        });

        localStorage.clear();
    }
    
    return (
        <>
            <ButtonUser 
                ref={btnRef}
                className="ml-2"
                url={ state && state.avartar ? state.avartar : Images.DefaultAvatar}
                onClick={() => {
                    setActiveDropNotify(!activeDropNotify);
                }} 
            />

            <LayoutDropMenu
                className={activeDropNotify ? "active" : ""} ref={dropRef} 
            >
                <div className="d-flex flex-column justify-content-center align-items-center pt-3 pb-1 w-100">
                    <Text className="fw-600 txt-green font-params fml-baloo-tammudu-2" fontSize={18}>
                        {state && state.fullname ? state.fullname : 'No Name'}
                    </Text>
                    <div className="d-flex mt-2">
                        <Text className="fw-400 ">Số dư :</Text>
                        <Text className="fw-600 txt-green ml-2">{state && state.surplus ? state.surplus.toLocaleString() : '0'} đ</Text>
                    </div>
                </div>
                <div className="w-100 px-5">
                    <Divider className="my-1"/>
                </div>
                <ul className="m-0 p-3">
                    <li className="m-0 p-0">
                        <ButtonMenu>
                            <i className="fal fa-user-circle" />
                            <Link to="/profile" onClick={() => setActiveDropNotify(false)}>My Profile</Link>
                        </ButtonMenu>
                    </li>   
                    <li>
                        <ButtonMenu onClick={() => handleLogout()}>
                            <i className="fal fa-sign-out" />
                            <Link to="/">Logout</Link>
                        </ButtonMenu>
                    </li>     
                </ul>
            </LayoutDropMenu>
        </>
    );
};

export default MenuUser;
