import React from 'react';
import { BlueGray, FontBalooTammudu2, Green } from 'src/contants/cssContants';
import styled from 'styled-components';

const LayoutInput = styled.input`
    background: ${BlueGray};
    color: ${Green};

    width: 100%;
    height: auto;
    border: none; 

    &:focus {
        outline: none;
        padding: 8px; 
    }

    &::placeholder {
        color: ${props => props.color ? props.color : Green};
    }

    &.disable {
        pointer-events: none;
    }

    &.edit {
        padding: 8px;
        border-radius: 8px;
        border: 1px solid ${props => props.color ? props.color : Green};
    }
`;

const InputText = ({placeholder, className, onChangeText, setValue, disabled = false}) => {
    return (
        <LayoutInput
            disabled={disabled}
            className={className}
            placeholder={placeholder ? placeholder : 'Nhập input text...'}
            onChange={(e) => {
                onChangeText && onChangeText(e.target.value);
            }}
            value={setValue && setValue}
        />
    );
};

export default InputText;
