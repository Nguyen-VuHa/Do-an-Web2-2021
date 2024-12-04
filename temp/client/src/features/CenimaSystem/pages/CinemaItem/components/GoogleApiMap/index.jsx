import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import React, { useState } from 'react';

const GoogleMapApi = ({ pointLat, pointLng, data }) => {

    const [isToggleInfo, setIsToggleInfo] = useState(true);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAwa7RXh7UTAVDd7SaA_pzHT3liJAhNVhc"
    });
      
    const containerStyle = {
        width: '100%',
        height: '100%'
    };

    return isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{
              lat: pointLat ?  parseFloat(pointLat) : 10.876886615931449,
              lng: pointLng ?  parseFloat(pointLng) : 106.63375008882647,
          }}
          zoom={15}
        >
           <Marker key="market-1"
                position={{
                    lat: pointLat ?  parseFloat(pointLat) : 10.876886615931449,
                    lng: pointLng ?  parseFloat(pointLng) : 106.63375008882647,
                }}
                onClick={() => setIsToggleInfo(!isToggleInfo)}
                onMouseOver={() => setIsToggleInfo(true)}
            >
                {
                    isToggleInfo ? <InfoWindow
                                         position={{
                                            lat: pointLat ?  parseFloat(pointLat) : 10.876886615931449,
                                            lng: pointLng ?  parseFloat(pointLng) : 106.63375008882647,
                                        }}
                                    >
                                        <span>
                                            <ul className="maps__info">
                                                <li style={{fontWeight: 'bold'}}>Cụm Rạp: {data.nameCinema}</li>
                                                <li><strong>Địa chỉ: </strong>  { `${data.wards}, ${data.district}, ${data.city}`}</li>
                                                <li><strong>Liên hệ: </strong> 1900 2099 (bấm phím 6)</li>
                                            </ul>
                                        </span>
                                    </InfoWindow>
                                : null
                }
            </Marker>
        </GoogleMap>
    ) : <></>
};

export default React.memo(GoogleMapApi)