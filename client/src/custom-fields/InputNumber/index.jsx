import React from 'react';
import { BlueGray, FontBalooTammudu2, Green, RedError, White } from 'src/contants/cssContants';
import styled from 'styled-components';

const LayoutInput = styled.input`
    background: ${BlueGray};
    color: ${Green};

    width: 100%;
    height: 40px;
    border: none; 

    &:focus {
        outline: none;
        padding-left: 8px; 
    }

    &::placeholder {
        color: ${props => props.color ? props.color : Green};
    }

    &.disable {
        pointer-events: none;
    }

    &.edit {
        padding-left: 8px;
        border-radius: 8px;
        border: 1px solid ${props => props.color ? props.color : Green};
    }

    &.error {
        padding-left: 8px;
        border-radius: 8px;
        border: 1px solid ${RedError};
        color: ${RedError};
    }

    &.i-border {
        padding-left: 8px;
        border-radius: 8px;
        border: 1px solid ${props => props.color ? props.color : White};

        &:focus, &:hover {
            outline: none;
            padding-left: 8px; 
            border: 1px solid ${props => props.color ? props.color : Green};
        }
    }
`;

const InputNumber = ({placeholder, className, onChangeText, setValue}) => {
    return (
        <LayoutInput
            className={className}
            placeholder={placeholder ? placeholder : 'Nhập input text...'}
            onChange={(e) => {
                const reg = new RegExp('^[0-9]+$');
                if(e.target.value === '' || reg.test(e.target.value))
                    onChangeText && onChangeText(e.target.value);
                
            }}
            value={setValue ? setValue : ''}
        />
    );
};

export default InputNumber;
