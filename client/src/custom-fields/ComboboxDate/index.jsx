import React, { useEffect, useRef, useState } from 'react';
import { GrayWhite, Green } from 'src/contants/cssContants';
import styled from 'styled-components';
import InputDate from '../InputDate';
import moment from 'moment';

const LayoutInputDate = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 40px;

    padding: 12px 16px;

    border: 1px solid ${GrayWhite};
    color: ${GrayWhite};
    box-sizing: border-box;
    border-radius: 6px;

    cursor: pointer;
    user-select: none;

    &:hover {
        border: 1px solid ${Green};
    }

    &.active {
        border: 1px solid ${Green};
        color: ${Green};
    }
`;

const TextInput = styled.div`
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;

    letter-spacing: 0.002em;
`;


const InputDropDowns = styled.div`
    position: absolute;
    z-index: 10000;
    ${props => props.pointerDrop ? 'top: 110%;': 'bottom: 110%;'}
    ${props => props.pointerDropLeft ? 'left: 0' : 'right: 0;'}

`;

const ComboboxDate = ({ onChange, className }) => {
    const dropRef = useRef(null);
    const buttonRef = useRef(null);

    const [isToggle, setIsToggle] = useState(false);
    const [pointerDrop, setPointerDrop] = useState(false);
    const [pointerDropLeft, setPointerDropLeft] = useState(false);

    const [dateChange, setDateChange] = useState(null);

    

    // useEffect(() => {
    //     if(isToggle === true) {
    //         const handleClickOutside = (event) => {
    //             if(!document.getElementById('datetime-picker').contains(event.target))
    //             {
    //                 console.log(document.getElementById('datetime-picker'), event.target)
    //                 setIsToggle(false);
    //             }
                    
    //         };

    //         document.addEventListener("click", handleClickOutside);
    
    //         return () => {
    //             document.removeEventListener("click", handleClickOutside);
    //         };
    //     }
       
    // }, [isToggle]);
    

    return (
        <div className={`${className} position-relative d-flex`}>
            <LayoutInputDate
                ref={buttonRef}
                className={dateChange ? `${className} active` : `${className}`}
                onClick={(e) => {
                    setIsToggle(!isToggle);
                    var rect = e.target.getBoundingClientRect();
                    if(rect.bottom > 500)
                        setPointerDrop(false)
                    else
                        setPointerDrop(true)

                    if(rect.left < 500)
                        setPointerDropLeft(true)
                    else
                        setPointerDropLeft(false)
                }}
            >
                <TextInput>
                   { dateChange ? moment(dateChange).format('DD/MM/YYYY') : " DD/MM/YYYY" }
                </TextInput>
                <i className="fal fa-calendar-alt"></i>
            </LayoutInputDate>
            <InputDropDowns
                pointerDrop={pointerDrop}
                pointerDropLeft={pointerDropLeft}
                style={isToggle ? {display: 'block'} : {display: 'none'}}
            >
                <InputDate 
                    setIsToggle={setIsToggle}
                    onChange={(date) => {
                        setDateChange(date);
                        onChange && onChange(date);
                    }}
                />
            </InputDropDowns>
        </div>
    );
};


export default ComboboxDate;
