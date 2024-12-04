import React from 'react';
import GoogleMapAPI from './GoogleMapAPI';
import { GoogleMapLayout, MapContent } from './SystemCinemaDetail.Style';

const GoogleMap = ({ data }) => {
    return (
        <GoogleMapLayout>
            <MapContent>
                <GoogleMapAPI pointLat={data && data[0].pointLat} pointLng={data && data[0].pointLng} data={data}/>
            </MapContent>
        </GoogleMapLayout>
    );
};

export default GoogleMap;
