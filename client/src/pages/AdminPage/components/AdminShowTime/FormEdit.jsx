import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ComboboxDate from 'src/custom-fields/ComboboxDate';
import InputNumber from 'src/custom-fields/InputNumber';
import InputSelect from 'src/custom-fields/InputSelect';
import { Col, FormGroup } from 'src/style-common/Layout.Style';
import { Text } from 'src/style-common/Text.Style';
import { EditShowTimeContext } from '../../contexts/EditShowTimeContext';

const FormEdit = () => {
    const { systemCinema } = useSelector(state => state.systemCinemaState);
    const { movieArr } = useSelector(state => state.movieState);

    const { stateShowtime, dispatchShowtime } = useContext(EditShowTimeContext);
    const { idCinema , idMovie, fare } = stateShowtime;

    const [listHours, setListHours] = useState([]);
    const [listMinute, setListMinute] = useState([]);

    const [hours, setHours] = useState('');
    const [minute, setMinute] = useState('');

    useEffect(() => {
        if(minute && hours) {
            dispatchShowtime({
                type: 'SET_SHOW_TIME',
                payload: `${hours}:${minute}`,
            })
        }
    }, [hours, minute]);

    useEffect(() => {
        let arrHours = [];
        let arrMinute = [];
        for(let i = 0; i < 24; i++) {
            if(i < 10) 
                arrHours.push({
                    name: `0${i}`,
                    id: `0${i}`,
                })
            else
                arrHours.push({
                    name: `${i}`,
                    id: `${i}`,
                })
        }

        setListHours(arrHours);

        for(let i = 0; i < 60; i++) {
            if(i < 10) 
                arrMinute.push({
                    name: `0${i}`,
                    id: `0${i}`,
                })
            else
                arrMinute.push({
                    name: `${i}`,
                    id: `${i}`,
                })
        }

        setListMinute(arrMinute);

    }, []);

    return (
        <>
            <Col className='column-2' gapSize={30}>
                <FormGroup className='w-100'>
                    <Text className="min-width-params txt-yellow-gray" minWidth={180}>Ngày công chiếu <span>*</span></Text>
                    <ComboboxDate 
                        className="w-100"
                        onChange={(date) => {
                            dispatchShowtime({
                                type: 'SET_PREMIERE_DATE',
                                payload: date,
                            })
                        }}
                    />
                </FormGroup>
                <FormGroup className='w-100'>
                    <Text className="min-width-params txt-yellow-gray" minWidth={180}>Phim công chiếu <span>*</span></Text>
                    <InputSelect 
                        placeholder="-- Chọn phim công chiếu --"
                        active={idMovie ? true : false}
                        dataMap={movieArr.map(sc => { return {name: sc.movieName, id: sc.movieId }})}
                        onChange={(value) => {
                            dispatchShowtime({
                                type: 'SET_ID_MOVIE',
                                payload: value,
                            })
                        }}
                    />
                </FormGroup>
            </Col>   
            <Col className='column-2 mt-3' gapSize={30}>
                <FormGroup className='w-100'>
                    <Text className="min-width-params txt-yellow-gray" minWidth={180}>Rạp công chiếu <span>*</span></Text>
                    <InputSelect 
                        placeholder="-- Chọn Rạp phim công chiếu --"
                        active={idCinema ? true : false}
                        dataMap={systemCinema.map(sc => { return {name: sc.nameCinema, id: sc.id }})}
                        onChange={(value) => {
                            dispatchShowtime({
                                type: 'SET_ID_CINEMA',
                                payload: value,
                            })
                        }}
                    />
                </FormGroup>
                <FormGroup className='w-100'>
                    <Text className="min-width-params txt-yellow-gray" minWidth={180}>Giá vé <span>*</span></Text>
                    <InputNumber 
                        className="i-border "
                        placeholder="Nhập giá vé phim"
                        onChangeText={(number) => {
                            dispatchShowtime({
                                type: 'SET_FARE_SHOW_TIME',
                                payload: number,
                            })
                        }}
                        setValue={fare && fare}
                    />
                </FormGroup>
            </Col>   
            <FormGroup className='w-100 mt-3'>
                <Text className="min-width-params txt-yellow-gray" minWidth={180}>Thời gian chiếu <span>*</span></Text>
                <div className='d-flex align-items-center'>
                    <InputSelect 
                        style={{width: '200px!important'}}
                        placeholder="-- Chọn giờ --"
                        dataMap={listHours}
                        onChange={(value) => { 
                            setHours(value);
                        }}
                    />
                    <Text className="txt-yellow-gray mx-3">Giờ</Text>
                    <InputSelect 
                        style={{width: '200px!important'}}
                        placeholder="-- Chọn phút --"
                        dataMap={listMinute}
                        onChange={(value) => { 
                            setMinute(value);
                        }}
                    />
                    <Text className="txt-yellow-gray mx-3">Phút</Text>
                </div>
            </FormGroup>
        </>
    );
};



export default FormEdit;
