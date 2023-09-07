import { View, Text, TouchableOpacity, Platform, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import PlaceDetailItem from './PlaceDetailItem';
import GoogleMapView from '../containers/GoogleMapView';
// import { platformSpecificSpaceUnits } from 'native-base/lib/typescript/theme/tools';

export default function PlaceDetail() {
    const param=useRoute().params;
    const [place, setPlace] = useState([]);

    useEffect(()=>{
        setPlace(param.place)
    }, [])

    const onDirectionClick=()=>{
        const url=Platform.select({
            ios: "maps" + place.geometry.lat + "," + place.geometry.lng + "?q=" + place.vicinity,
            android: "geo:" + place.geometry.lat + "," + place.geometry.lng + "+?q=" + place.vicinity,
        });
        Linking.openURL(url)
    }   

    return (
        <View style = {{ padding: 20, paddingTop: 80, backgroundColor: 'white', flex: 1}}>
            <PlaceDetailItem place ={place} />
            <GoogleMapView placeList={[place]}/>
            <TouchableOpacity style={{ padding: 15, alignContent: 'center', alignItem: 'center', margin: 8, borderRadius: 50, backgroundColor: 'green' }}
                onPress={() =>onDirectionClick()}>
                    <Text style={{textAlign:'center', color: 'white'}}>
                        Get direction on Google Map
                    </Text>
                </TouchableOpacity>
        </View>
  )
}