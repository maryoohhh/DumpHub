import { View, Text, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location'
// import { UserLocationContext } from './UserLocationContext';

export default function GoogleMapView() {
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
    
    // const [mapRegion, setMapRegion] = useState({
    //     latitude: 47.61809949516797,
    //     longitude: -122.34437917371241,
    //     latitudeDelta: 0.0922,
    //     longitudeDelta: 0.0421,
    // });

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
    
    // useEffect(() => {
    //     if(location)
    //     {
    //         setMapRegion({
    //             latitude: location.coords.latitude,
    //             longitude: location.coords.longitude,
    //             latitudeDelta: 0.0922,
    //             longitudeDelta: 0.0421,
    //         })
    //     }
    // })

    return (
        <View style = {{ marginTop: 20, borderRadius: 20, overflow: 'hidden' }}>
            {mapRegion ? <MapView 
                style = {{ 
                    width: Dimensions.get('screen').width*0.9,
                    height: Dimensions.get('screen').height*0.5,
                }}
                provider = {PROVIDER_GOOGLE}
                showsUserLocation={true}
                region={mapRegion}
            /> : <></>}

        
        </View>
    )
}