import React, { useState } from 'react';
import { BlueGray, Green } from 'src/contants/cssContants';
import styled from 'styled-components';

const LayoutInput = styled.input`
    
    background: ${BlueGray};
    color: ${Green};
    
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
`;

const InputText = ({placeholder, className, onChangeText}) => {
    const [textInput, setTextInput] = useState('');
    
    return (
        <LayoutInput
            className={className}
            placeholder={placeholder ? placeholder : 'Nhập input text...'}
            onChange={(e) => {
                setTextInput(e.target.value);
                onChangeText && onChangeText(e.target.value);
            }}
            value={textInput}
        />
    );
};

export default InputText;
