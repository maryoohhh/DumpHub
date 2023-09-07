import { View, Text, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import PlaceMarker from './PlaceMarker'
import * as Location from 'expo-location'

export default function GoogleMapViewFull({placeList}) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    // const [mapRegion, setMapRegion] = useState([]);

    useEffect(() => {
        (async () => {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        console.log(location);
        })();
    }, []);

    const [mapRegion, setMapRegion] = useState(null);

    useEffect(() => {
        if (location) {
            setMapRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            })
        }
    }, [location])

    return (
        <View>
            {mapRegion ? <MapView 
                    style = {{ 
                        width: Dimensions.get('screen').width,
                        height: Dimensions.get('screen').height,
                    }}
                    provider = {PROVIDER_GOOGLE}
                    showsUserLocation={true}
                    region={mapRegion}
                >
                    <Marker
                        title="You"
                        coordinate={mapRegion}
                    />
                    {placeList.map((item, index)=>index<=5&&(
                        <PlaceMarker item={item} />
                    ))}
                </MapView> : <></>}
        </View>
    )
}