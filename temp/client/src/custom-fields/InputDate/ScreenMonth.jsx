import React from 'react';
import { GrayWhite, White } from 'src/contants/cssContants';
import styled from 'styled-components';


const LayoutMonth = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 12px;
    width: 100%;
    height: 60px;

    padding: 0 15px;
    padding-top: 15px;
`;

const ButtonMonth = styled.div`
    width: 100%;
    height: 80px;

    color: ${GrayWhite};
    cursor: pointer;
    user-select: none;

    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid  rgba(212, 221, 41, 0.2);

    transition: all .5s ease;

    &:hover, &.active {
        border: 1px solid  rgba(212, 221, 41, 1);
        background: rgba(212, 221, 41, 0.8);
        color: ${White};
    }

    &.today {
        border: 1px solid  rgba(212, 221, 41, 1);
        color: ${White};
    }

    &.disabled:hover {
        background: transparent;
        border: 1px solid  rgba(212, 221, 41, 0.2);
    }
`;

const ScreenMonth = ({ listMonth, monthCurrent, setMonthCurrent, setStatusChange }) => {
    return (
        <div className="d-flex justify-content-center align-items-center w-100 h-100">
            <LayoutMonth>
                {
                    listMonth && listMonth.map((d) => {
                        return <ButtonMonth 
                            key={d.numberMonth} 
                            className={monthCurrent === d.numberMonth ? 'active' : ''}
                            onClick={() => {
                                setStatusChange(0);
                                setMonthCurrent(d.numberMonth)
                            }}
                        >
                            { d.name }
                        </ButtonMonth>
                    })
                }
            </LayoutMonth>
        </div>
    );
};

export default ScreenMonth;
