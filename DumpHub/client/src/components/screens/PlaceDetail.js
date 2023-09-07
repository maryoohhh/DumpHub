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

    const googleMapOpenUrl =  ({lat, lng}) => {
        const latLng = `${lat},${lng}`;
        return `google.navigation:q=${latLng}`;
    }

    const onDirectionClick=()=>{
  
   
        const address = place.vicinity ? place.vicinity : place.formatted_address;

        const url=Platform.select({
            ios:"maps://0,0"+place.geometry.location.lat + "," + place.geometry.location.lng + "?q=" + address,
            android:"geo:0,0"+place.geometry.location.lat + "," + place.geometry.location.lng + "?q=" + address,
        });


        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('cant process url', url)
            } else {
                return Linking.openURL(url)
            }
        }).catch(err => console.log('error direction', err))


    }   

    return (
        <View style = {{ padding: 20, paddingTop: 80, backgroundColor: 'white', flex: 1}}>
            <PlaceDetailItem place ={place} onDirectionClick={() => onDirectionClick()}/>
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