import React, { useEffect, useState } from 'react';
import { GrayWhite, White } from 'src/contants/cssContants';
import styled from 'styled-components';

const LayoutYear = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 12px;
    width: 100%;
    height: 60px;

    padding: 0 15px;
    padding-top: 15px;
`;

const ButtonYear = styled.div`
    width: 100%;
    height: 60px;

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

const ScreenYear = ({ start, end, setTotalYear, yearSize, yearCurrent, setStatusChange, setYearCurrent, setSpaceYear }) => {
    const [dataYear, setDataYear] = useState([]);

    useEffect(() => {
        let minYear = 1900;
        let arrYear = [];
        for(let i = minYear; i <= new Date().getFullYear(); i++) {
            arrYear.push(i);
        }

        setTotalYear(Math.ceil(arrYear.length/yearSize));
        setDataYear(arrYear.reverse());
    }, []);

    useEffect(() => {
        if(dataYear && dataYear.length > 0) 
            setSpaceYear(`${dataYear[end - 1] ? dataYear[end - 1] : 1900} - ${dataYear[start]}`)
    }, [start, end, dataYear]);


    return (
        <div className="d-flex justify-content-center align-items-center w-100 h-100">
            <LayoutYear>
                {
                    dataYear
                    && dataYear.map((y, idx) => {
                        if(idx >= start && idx < end) {
                            return <ButtonYear 
                                key={y} className={yearCurrent === y ? "active" : ""}
                                onClick={() => {
                                    setYearCurrent(y)
                                    setStatusChange(1);
                                }}
                            >
                                { y }
                            </ButtonYear>
                        }
                    })
                }
            </LayoutYear>
        </div>
    );
};


export default ScreenYear;
