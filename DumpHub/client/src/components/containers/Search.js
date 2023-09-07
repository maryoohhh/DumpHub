import { View, Text } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import GoogleMapViewFull from './GoogleMapViewFull'
import SearchBar from './SearchBar'
import GlobalApi from '../../config/GlobalApi';
import List from './List';

export default function Search() {
    const [placeList, setPlaceList] = useState([]);
    
    useEffect(()=>{
        GetNearBySearchPlace('restaurant'); 
   },[])

    const GetNearBySearchPlace=(value)=>{
        GlobalApi.searchByText(value).then(resp=>{
            setPlaceList(resp.data.results);
        })
    }

    return (
        <View>
            <View style={{position:'absolute',zIndex:20}}>
                <SearchBar setSearchText={(value)=>GetNearBySearchPlace(value)} />
            </View>
        
            <GoogleMapViewFull placeList={placeList}/>
            <View style={{position:'absolute',zIndex:20,bottom:0}}>
                <List placeList={placeList} />
            </View>
      </View>
  
    )
}