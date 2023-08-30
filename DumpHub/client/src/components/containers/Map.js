import React, { Component, useEffect, useRef } from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import Geolocation from '@react-native-community/geolocation';

import config from "../../config/index"

class Map extends Component {
    constructor() {
        super();
        this.state = {
            markers: [
            {
                coordinate: {
                    latitude: 47.61809949516797,
                    longitude: -122.34437917371241
                },
                title: "City University of Seattle",
                description:  "521 Wall St #100, Seattle, WA 98121"
            },
            {
                coordinate: {
                    latitude: 47.61263875299939,
                    longitude: -122.17969764246408
                },
                title: "City University of Seattle",
                description: "150 120th Ave NE, Bellevue, WA 98005" 
            }
            ]
        };
    }

    getRestrooms() {
        fetch('${config.url}api/restrooms')
    }
    
    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <MapView
                onRegionChangeComplete={region => {
                    this.setState({currentView: region})
                }}
                style={styles.mapStyle}
                initialRegion={{
                    latitude: 47.61809949516797,
                    longitude: -122.34437917371241,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                customMapStyle={mapStyle}>
                { this.state.markers.map((marker, i) => {
                    return(
                        <Marker
                            draggable
                            coordinate={marker.coordinate}
                            onDragEnd={
                            (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
                            }
                            title={marker.title}
                            description={marker.description}
                        />
                    );
                })}
                {/* <Marker
                    draggable
                    coordinate={{
                    latitude: 47.61809949516797,
                    longitude: -122.34437917371241,
                    }}
                    onDragEnd={
                    (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
                    }
                    title={'Test Marker'}
                    description={'This is a description of the marker'}
                /> */}
                <GooglePlacesAutocomplete
                placeholder="Search"
                onPress={(data, details = null) => console.log(data, details)}
                query={{key: 'AIzaSyAFEDZC2XNZPGRH04T9nMN4Zq9bGwIxF3o',
                        components: 'country:us',
                        language: 'en'}}
                fetchDetails={true}
                onFail={error => console.log(error)}
                onNotFound={() => console.log('no results')}
                currentLocation={true}
                currentLocationLabel='Current Location'
                minLength={2}
                autoFocus={false}
                returnKeyType={'default'}
                styles = {{
                    textInputContainerontainer: {
                        // marginTop: 75,
                        // marginLeft: 10,
                        // marginRight: 10,
                        backgroundColor: 'rgba(0,0,0,0)',
                        borderTopWidth: 0,
                        borderBottomWidth:0,
                        zIndex: 999,
                        width: '90%',
                    },
                    textInput: {
                        marginTop: 75,
                        marginLeft: 10,
                        marginRight: 10,
                        height: 45,
                        color: '#5d5d5d',
                        fontSize: 16,
                        borderWidth: 0.1,
                        zIndex: 999,
                    },
                    description: {
                        color: '#000',
                        fontSize: 16,
                    }
                }}
                />
                </MapView>
            </View>
            </SafeAreaView>
        );
    }
}

const mapStyle = [
    {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
    {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
    {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}],
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}],
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#263c3f'}],
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#6b9a76'}],
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#38414e'}],
    },
    {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}],
    },
    {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#746855'}],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}],
    },
    {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}],
    },
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#2f3948'}],
    },
    {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}],
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}],
    },
];

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    mapStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

export default Map;
