import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import Map from '../containers/Map';
import FooterList from '../footer/FooterList';
// import Header from '../containers/Header';
// import GoogleMapView from '../containers/GoogleMapView';
// import { UserLocationContext } from '../containers/UserLocationContext';
// import MapScreen from '../MapInput';

class Home extends Component {
    render() {
        return (
            <>
                {/* <UserLocationContext.Provider value = {{location, setLocation}}> */}
                {/* <Header /> */}
                {/* <GoogleMapView /> */}
                <Map />
                <FooterList />
                {/* </UserLocationContext.Provider> */}
            </>
        );
    }
}

export default Home;
