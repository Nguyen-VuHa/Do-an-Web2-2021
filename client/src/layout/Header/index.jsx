import React, { useRef, useState, useEffect } from 'react';
import ContentMenuHeader from './ContentMenu';
import { 
    Header, NavHeader, HeaderLogo
} from './Header.Style';
import { Button } from 'src/style-common/Button.Style';
import LoginForm from './LoginForm';

const TheHeader = () => {
    const [isDropDown, setIsDropDown] = useState(false);
    const [scrollHeight, setScrollHeight] = useState(0);

    const buttonRef = useRef(null);
    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if(buttonRef && !buttonRef.current.contains(event.target))
        { 
            if(dropdownRef && !dropdownRef.current.contains(event.target)) {
                setIsDropDown(false);
            }
        }
    }

    useEffect(() => {
        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside);
        }
    }, []);

    useEffect(() => {
        const handleWindowScroll = () => {
            setScrollHeight(window.pageYOffset);
            setIsDropDown(false);
        }

        window.addEventListener('scroll', handleWindowScroll);
        return () => {
            window.removeEventListener('scroll', handleWindowScroll);
        }
    }, []);

    return (
        <Header 
            className={scrollHeight >= 90 ? "hide" : ""}
        >
            <NavHeader>
                <a href='/'>
                    <HeaderLogo  src="https://www.tiendauroi.com/wp-content/uploads/2020/02/bhd-star-cinema.png" alt="Logo App" />
                </a>
                <ContentMenuHeader />
                <div className="position-relative">
                    <Button ref={buttonRef} width={170} onClick={() => setIsDropDown(!isDropDown)}>
                        Đăng nhập
                    </Button>
                    <LoginForm isDropDown={isDropDown} dropdownRef={dropdownRef} setIsDropDown={setIsDropDown}/>
                </div>
            </NavHeader>
        </Header>
    );
};

export default TheHeader;
