import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import React from 'react';

const GoogleMapApi = ({ pointLat, pointLng }) => {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAwa7RXh7UTAVDd7SaA_pzHT3liJAhNVhc"
    });
      
    const containerStyle = {
        width: '400px',
        height: '300px'
    };

    return isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{
              lat: pointLat ? pointLat : 10.876886615931449,
              lng: pointLng ?  pointLng : 106.63375008882647,
          }}
          zoom={8}
        >
          <></>
        </GoogleMap>
    ) : <></>
};


export default React.memo(GoogleMapApi)
