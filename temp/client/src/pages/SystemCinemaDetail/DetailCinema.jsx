import React from 'react';
import {
    DetailContent, NameCinema, 
    Light, LightEffect, LightLeft, LightTop,
    SpanTitle, DetailText
} from './SystemCinemaDetail.Style';

const DetailCinema = ({data}) => {
    
    return (
        <DetailContent>
            <NameCinema>☞ Cụm Rạp: {data && data[0].nameCinema }</NameCinema>
            <Light>
                <LightEffect>
                    <LightLeft />
                    <LightTop />
                </LightEffect>
                <SpanTitle>Địa điểm</SpanTitle>
                <DetailText>
                    <SpanTitle>{ data && `${data[0].wards}, ${data[0].district}, ${data[0].city}` }</SpanTitle>
                </DetailText>
            </Light>
            <Light>
                <LightEffect>
                    <LightLeft />
                    <LightTop />
                </LightEffect>
                <SpanTitle>Loại Phòng Chiếu</SpanTitle>
                <DetailText>
                    <SpanTitle>{ data && data[0].typeCinema }</SpanTitle>
                </DetailText>
            </Light>
            <Light>
                <LightEffect>
                    <LightLeft />
                    <LightTop />
                </LightEffect>
                <SpanTitle>Liên Hệ Với Chúng Tôi</SpanTitle>
                <DetailText>
                    <SpanTitle>1900 2099 bấm phím 6 hoặc gọi 028 3736 7070</SpanTitle>
                </DetailText>
            </Light>
            <Light>
                <LightEffect>
                    <LightLeft />
                    <LightTop />
                </LightEffect>
                <SpanTitle>Email Trợ Giúp</SpanTitle>
                <DetailText>
                    <SpanTitle>cskh@bhdstar.vn</SpanTitle>
                </DetailText>
            </Light>
        </DetailContent>
    );
};


export default DetailCinema;
