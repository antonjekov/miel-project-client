import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
export const MapContainer = () => {

    const mapStyles = {
        height: "60vh",
        width: "100%"
    };

    const defaultCenter = {
        lat: 42.425632, lng: 25.6346989
    }

    const locations = [

        {
            name: "Miel Store 1",
            location: { lat: 42.425632, lng: 25.6346989 }
        },
        {
            name: "Miel Store 2",
            location: { lat: 42.42262, lng: 25.624926 }
        }
    ];

    const [selected, setSelected] = useState({});

    const onSelect = item => {
        setSelected(item);
    }

    

    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY} language='en'>
            <GoogleMap mapContainerStyle={mapStyles} zoom={14} center={defaultCenter}>
                {
                    locations.map(item => {
                        return (
                            <Marker key={item.name}
                                position={item.location}
                                onClick={() => onSelect(item)}
                            />
                        )
                    })
                }
                {
                    selected.location &&
                    (
                        <InfoWindow
                            position={selected.location}
                            clickable={true}
                            onCloseClick={() => setSelected({})}
                        >
                            <p>{selected.name}</p>
                        </InfoWindow>
                    )
                }
            </GoogleMap>
        </LoadScript>
    )
}

export default React.memo(MapContainer);