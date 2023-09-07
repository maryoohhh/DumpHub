import React, { Component, useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
// import Map from '../containers/Map';
import FooterList from '../footer/FooterList';
import Header from '../containers/Header';
import GoogleMapView from '../containers/GoogleMapView';
// import List from '../containers/List';
import GlobalApi from '../../config/GlobalApi';
import PlaceList from '../containers/PlaceList';
// import { UserLocationContext } from '../containers/UserLocationContext';

import * as Location from 'expo-location'

// class Home extends Component {
export default function Home() {
    const [placeList, setPlaceList] = useState([]);
    // const { location, setLocation } = useContext(UserLocationContext);

    useEffect(()=>{
        GetNearBySearchPlace()
    },[])
    
    const GetNearBySearchPlace=()=>{
        GlobalApi.nearByPlace().then(resp=>{
            setPlaceList(resp.data.results)
        })
    }
    
    // render() {
    return (
        <View style = {{padding: 20, paddingTop: 60}}>
            {/* <Header /> */}
            <GoogleMapView placeList={placeList} />
            {/* <Map /> */}
            {/* <List /> */}
            {placeList ? <PlaceList placeList={placeList} /> : null }
            <FooterList />
        </View>
    );
}
// }
