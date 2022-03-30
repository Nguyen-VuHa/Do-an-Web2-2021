import React, { useEffect, useRef, useState } from 'react';
import { GrayWhite, White, YellowGray } from 'src/contants/cssContants';
import { ButtonIcon } from 'src/style-common/Button.Style';
import { Col } from 'src/style-common/Layout.Style';
import { Text } from 'src/style-common/Text.Style';
import styled from 'styled-components';
import ScreenMonth from './ScreenMonth';
import ScreenYear from './ScreenYear';

const ContainerCalendar = styled.div`
    position: relative;
    width: 400px;
    min-height: 400px;
    background: rgba(255,255,255,0.1);
    box-shadow: 0 25px 45px rgba(0,0,0,0.1);
    border: 1px solid rgba(255,255,255,0.5);
    border-radius: 10px;
    padding: 8px;

    backdrop-filter: blur(25px);
`;

const ContentDay = styled.div`
    width: 100%;
    height: 100%;
`;

const TitleDay = styled.div`
    width: 100%;
    height: 30px;
    color: ${White};
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    background: rgba(212, 221, 41, 0.2);
`;

const ButtonDay = styled.div`
    width: 100%;
    height: 50px;

    color: ${White};
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
        color: #f2ff00;
        font-weight: bold;
    }

    &.disabled:hover {
        background: transparent;
        border: 1px solid  rgba(212, 221, 41, 0.2);
    }
`;

const MonthToVE = [
    {
        numberMonth: 0,
        name: 'Tháng 1',
    },
    {
        numberMonth: 1,
        name: 'Tháng 2',
    },
    {
        numberMonth: 2,
        name: 'Tháng 3',
    },
    {
        numberMonth: 3,
        name: 'Tháng 4',
    },
    {
        numberMonth: 4,
        name: 'Tháng 5',
    },
    {
        numberMonth: 5,
        name: 'Tháng 6',
    },
    {
        numberMonth: 6,
        name: 'Tháng 7',
    },
    {
        numberMonth: 7,
        name: 'Tháng 8',
    },
    {
        numberMonth: 8,
        name: 'Tháng 9',
    },
    {
        numberMonth: 9,
        name: 'Tháng 10',
    },
    {
        numberMonth: 10,
        name: 'Tháng 11',
    },
    {
        numberMonth: 11,
        name: 'Tháng 12',
    },
]

const InputDate = ({ onChange, setIsToggle }) => {
    const [statusChange, setStatusChange] = useState(0);

    const [dateActive, setDateActive] = useState('');

    const [spaceYear, setSpaceYear] = useState('');
    const [totalYear, setTotalYear] = useState(0);
    const [yearSize, setYearSize] = useState(16);
    const [sizeCurrent, setsizeCurrent] = useState(1);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(16);

    const [monthCurrent, setMonthCurrent] = useState(null);
    const [yearCurrent, setYearCurrent] = useState(null);

    const [listDaytoMonth, setListDaytoMonth] = useState([]);
    const [startDay, setStartDay] = useState([]);
    const [endDay, setEndDay] = useState([]);

    function getDaysInMonth(currentMonth, currentYear) {
        return new Date(currentYear, currentMonth + 1, 0).getDate();
    }

    function getStartDayInMonth(currentMonth, currentYear) {
        return new Date(currentYear, currentMonth, 1).getDay();
    }


    useEffect(() => {
        let currentMonth = new Date().getMonth();
        let currentYear = new Date().getFullYear();

        setMonthCurrent(currentMonth);
        setYearCurrent(currentYear);
    }, []);

    useEffect(() => {
        function renderCountDate() {
            let daysInMonth = getDaysInMonth(monthCurrent, yearCurrent);
            
            let arrDay = [];
            for(let i = 0; i < daysInMonth; i++) {
                arrDay.push(i);
            }

            setListDaytoMonth(arrDay);
        }

        function renderDate() {
            let startDay = getStartDayInMonth(monthCurrent, yearCurrent);

            let daysInMonth = getDaysInMonth(monthCurrent, yearCurrent);

            let arrDay = [];
            for(let i = 0; i < startDay; i++) {
                arrDay.push(i);
            }

            setStartDay(arrDay);
            
            let arrEndDay = [];
            let lenght = 0;
            if(startDay + daysInMonth > 35) 
                lenght = 42 - (startDay + daysInMonth);
            else
                lenght = 35 - (startDay + daysInMonth);

            for(let i = 0; i < lenght; i++) {
                arrEndDay.push(i);
            }

            setEndDay(arrEndDay);
        }

        renderDate();
        renderCountDate();
    }, [monthCurrent, yearCurrent]);

    const checkDayActive = (day) => {
        let day1 = new Date().toDateString();
        let day2 = new Date(yearCurrent, monthCurrent, day).toDateString();
        
        return day1 == day2 ? 'today' : '';
    }

    return (
        <div className="position-relative" id="datetime-picker">
            <ContainerCalendar>
                <div className="d-flex justify-content-between align-items-center w-100 p-3">
                    <div className="d-flex align-items-center">
                        <ButtonIcon
                            onClick={() => {
                                if(statusChange !== 2) {
                                    if(monthCurrent === 0) {
                                        setMonthCurrent(11);
                                        if(statusChange === 0)
                                            setYearCurrent(yearCurrent - 1);
                                    }
                                    else {
                                        setMonthCurrent(monthCurrent - 1);
                                    }
                                }
                                else {
                                    if(sizeCurrent > 1) {
                                        setsizeCurrent(sizeCurrent - 1);
                                        setStart((sizeCurrent - 2) * yearSize);
                                        setEnd((sizeCurrent - 1) * yearSize);
                                    }
                                }
                            }}
                        >
                            <i className="fas fa-angle-left"></i>
                        </ButtonIcon>
                    </div>
                    <div className='d-flex align-items-center'>
                        {
                            statusChange === 2 ? <Text className="mr-2 font-params txt-green" fontSize={35}>{ spaceYear }</Text> : 
                            <>
                            <ButtonIcon 
                                style={{width: 'auto'}} 
                                onClick={() => {
                                    if(statusChange === 0)
                                        setStatusChange(2)
                                    if(statusChange === 1)
                                        setStatusChange(2)
                                }}
                            >
                                <Text className="ml-2 font-params" fontSize={20}>{ MonthToVE.filter(m => m.numberMonth === monthCurrent)[0]?.name }</Text>
                                <Text className="mr-2 font-params" fontSize={20}> - { yearCurrent }</Text>
                            </ButtonIcon>
                            </>
                        }
                      
                    </div>
                    <div className="d-flex align-items-center">
                        <ButtonIcon
                            onClick={() => {
                                if(statusChange !== 2) { 
                                    if (monthCurrent == 11) {
                                        setMonthCurrent(0);
                                        if(statusChange === 0)
                                            setYearCurrent(yearCurrent + 1);
                                    } else {
                                        setMonthCurrent(monthCurrent + 1);
                                    }
                                }
                                else {
                                    if(sizeCurrent < totalYear)
                                    {
                                        setsizeCurrent(sizeCurrent + 1);
                                        setStart(sizeCurrent * yearSize);
                                        setEnd((sizeCurrent + 1) * yearSize);
                                    }
                                }
                               
                            }}          
                        >
                            <i className="fas fa-angle-right"></i>
                        </ButtonIcon>
                    </div>
                </div>
                {
                    statusChange === 2 && <ScreenYear 
                        yearSize={yearSize}
                        sizeCurrent={sizeCurrent}
                        start={start}
                        end={end}
                        setTotalYear={setTotalYear}
                        setStatusChange={setStatusChange}
                        setYearCurrent={setYearCurrent}
                        yearCurrent={yearCurrent}
                        setSpaceYear={setSpaceYear}
                    />
                }
                {
                    statusChange === 1 &&  <ScreenMonth 
                        listMonth={MonthToVE} monthCurrent={monthCurrent} 
                        setMonthCurrent={setMonthCurrent}
                        setStatusChange={setStatusChange}
                    />
                }
                {
                    statusChange === 0 
                    &&  <ContentDay>
                            <Col className='column-7'>
                                <TitleDay>T2</TitleDay>
                                <TitleDay>T3</TitleDay>
                                <TitleDay>T4</TitleDay>
                                <TitleDay>T5</TitleDay>
                                <TitleDay>T6</TitleDay>
                                <TitleDay>T7</TitleDay>
                                <TitleDay>CN</TitleDay>
                            </Col>
                            <Col className='column-7 mt-3'>
                                {
                                    startDay && startDay.length > 0 
                                    && startDay.map((d, idx) => {
                                        return <ButtonDay key={idx} className="disabled">
                                        </ButtonDay>
                                    })
                                }
                                {
                                    listDaytoMonth && listDaytoMonth.length > 0
                                    && listDaytoMonth.map((d, idx) => {
                                        return  <ButtonDay 
                                            key={idx} className={dateActive === new Date(yearCurrent, monthCurrent, d).toDateString() ? `${checkDayActive(d + 1)} active` : `${checkDayActive(d + 1)}`}
                                            onClick={() => {
                                                onChange && onChange(new Date(yearCurrent, monthCurrent, d + 1).toDateString());
                                                setIsToggle(false);
                                                setDateActive(new Date(yearCurrent, monthCurrent, d).toDateString())
                                            }}
                                        >
                                            {d + 1}
                                        </ButtonDay>
                                    })
                                }
                                {
                                    endDay && endDay.length > 0 
                                    && endDay.map((d, idx) => {
                                        return <ButtonDay key={idx} className="disabled"></ButtonDay>
                                    })
                                }
                            </Col>
                        </ContentDay>
                }
              
            </ContainerCalendar>
        </div>
    );
};

export default InputDate;