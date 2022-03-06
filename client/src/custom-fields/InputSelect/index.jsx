import React, { useEffect, useRef, useState } from 'react';
import { BlueGray, GrayWhite, Green } from 'src/contants/cssContants';
import styled from 'styled-components';

const SelectInput = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    padding: 0.5rem .75rem;

    cursor: pointer;
    user-select: none;

    background: #FFFFFF;

    height: 2.4rem;
    border: 1px solid ${GrayWhite};
    background: ${BlueGray};
    box-sizing: border-box;
    border-radius: .375rem;

    &.active.disable {
        border: none;
        padding: 0.5rem 0;

        .icon-drop {
            i {
                color: transparent;
            }
        }
    }

    &.active, &:hover {
        border: 1px solid ${Green};
    }

    .select-text {
        display: flex;
        justify-content: start;
        align-items: center;
        
        span {
            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            line-height: 1.5rem;

            letter-spacing: 0.002em;

            display: -webkit-box;
            word-wrap: break-word;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;

            color: ${Green};
        }
    }
    
    div {
        margin: 0px 4px;
        transform: rotate(0deg);
        transition: transform .4s ease;
    }

    &.drop-active {
        i {
            transform: rotate(180deg);
        }
    }

    & .icon-drop {
        i {
            color: ${Green}
        }
    }
`;

const DropDownSelect = styled.div`
    position: absolute;
    left: 0;

    display: none;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    padding: 12px 0;
    z-index: 10;


    width: 100%;
    max-height: 300px;

    overflow: auto;
    ${props => props.pointerDrop ? 'top: 110%;': 'bottom: 110%;'}

    
    &.active {
        display: flex;
    }

    background: ${BlueGray};
    border: 1px solid ${Green};

    box-sizing: border-box;
     : -2px 4px 15px rgba(160, 58, 250, 0.2);
    border-radius: 8px;
`;

const Options = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;

    padding: 8px 16px;
    
    width: 100%;
    height: 40px;
    
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.002em;
    cursor: pointer;
    user-select: none;
    color:  ${Green};

    span {
        display: -webkit-box;
        word-wrap: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
    }

    &:hover {
        background: rgba(39, 223, 45, 0.2);
        color: ${GrayWhite};
    }
`;

const InputSelect = ({ placeholder, active, dataMap, onChange, disabled = true, className }) => {
    const dropRef = useRef(null);
    const buttonRef = useRef(null);

    const [isActive, setisActive] = useState(false);
    const [pointerDrop, setPointerDrop] = useState(false);
    const [valueSelected, setValueSelected] = useState("");

    const handleClickOutside = (event) => {
        if (buttonRef && !buttonRef.current?.contains(event.target)) {
            if (dropRef && !dropRef.current?.contains(event.target));
                setisActive(false);
        }
    };

    useEffect(() => {
        window.addEventListener("click", handleClickOutside);
    
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className="position-relative w-100 h-auto">
            <SelectInput
                ref={buttonRef}
                className={ active ? isActive ? `active drop-active ${className}` : `active ${className}` : isActive ? `drop-active ${className}` : className }
                onClick={(e) => {
                    if(disabled) {
                        var rect = e.target.getBoundingClientRect();
                    
                        if (rect.bottom > 500) setPointerDrop(false);
                        else setPointerDrop(true);

                        setisActive(!isActive);
                    }
                }}
            >
                <div className="select-text">
                    <span>
                        { valueSelected ? valueSelected : placeholder ? placeholder : ""}
                    </span>
                </div>
                <div className="icon-drop">
                    <i className="far fa-angle-down"></i>
                </div>
            </SelectInput>
            <DropDownSelect
                ref={dropRef}
                pointerDrop={pointerDrop}
                className={isActive ? "active" : ""}
            >
                {
                    dataMap && dataMap.length > 0 ? 
                    dataMap.map((item, index) => { 
                        return  <Options
                            key={index}
                            onClick={() => {
                                setValueSelected(item.name);
                                onChange &&
                                onChange(item.id);
                            }}
                        >
                            <span>{item.name}</span>
                        </Options>
                    })
                    : <Options>No Item</Options>
                }
            </DropDownSelect>
        </div>
    );
};

export default InputSelect;
