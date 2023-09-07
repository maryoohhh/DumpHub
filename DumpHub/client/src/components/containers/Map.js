// import React, { Component } from 'react';;
// import { View, Text, StyleSheet } from 'react-native';
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// import { Marker, Callout } from 'react-native-maps';

// export default class Map extends Component {
//     mapSection = () => {
//         <View style = {{ height: "75%" }} >
//             <MapView style = {{ ...StyleSheet.absoluteFillObject }}
//                 provider='google'
//                 ref={(ref) => { this.mapRef = ref }}
//                 initialRegion={{
//                     latitude: 47.61809949516797,
//                     longitude: -122.34437917371241,
//                     latitudeDelta: 0.0922,
//                     longitudeDelta: 0.0421,
//                 }}>

//             </MapView>
//         </View>
//     }
    
//     render() {
//         return (
//             <View style = {{ flexDirection: "column" }}>
//                 <View style = {{ height: "25%", flexDirection: "column" }}>
//                     <Text>

//                     </Text>
//                 </View>
//                 {this.mapSection()}
//             </View>
//         );
//     }
// }

import React, { Component, useEffect, useRef } from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location'
import axios from 'axios';
// import Geolocation from '@react-native-community/geolocation';

// const latitudeDelta = 0.0922;
// const longitudeDelta = 0.0421;
// const initialLat = 47.61809949516797;
// const initialLong = -122.34437917371241;

// const initialPosition = {
//     latitude: initialLat,
//     longitude: initialLong,
//     latitudeDelta: latitudeDelta,
//     longitudeDelta: longitudeDelta,
// };

class Map extends Component {
    constructor() {
        super();
        this.state = {
            // markers: [
            // {
            //     coordinate: {
            //         latitude: 47.61809949516797,
            //         longitude: -122.34437917371241
            //     },
            //     title: "City University of Seattle",
            //     description:  "521 Wall St #100, Seattle, WA 98121"
            // },
            // {
            //     coordinate: {
            //         latitude: 47.61263875299939,
            //         longitude: -122.17969764246408
            //     },
            //     title: "City University of Seattle",
            //     description: "150 120th Ave NE, Bellevue, WA 98005" 
            // }
            // ],
            markers: [],
            initialPosition: null
        };
    }

    async componentDidMount() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        // setLocation(location);

        this.setState({initialPosition: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }})

        await axios.get('https://urban-xylophone-4q6pqg49j7pf7xv6-8000.preview.app.github.dev/api/restrooms').then(res => {
            console.log('MARKERS', res)
        });
        // console.log('MARKERS', markers)
        // this.setState({markers: markers})
    }


    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                {this.state.initialPosition ? <View style={styles.container}>
                <MapView
                onRegionChangeComplete={region => {
                    this.setState({currentView: region})
                }}
                style={styles.mapStyle}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                // initialRegion={initialPosition}
                region={this.state.initialPosition}
                customMapStyle={mapStyle}
                >
                {/* { this.state.markers.length > 0 ? this.state.markers.map((marker, i) => {
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
                }) : null} */}
                <GooglePlacesAutocomplete
                placeholder="Search"
                onPress={(data, details = null) => {
                    console.log(JSON.stringify(details?.geometry?.location));
                    this.setState({currentView: [details.geometry.location.lat, details.geometry.location.lng]})
                    // moveToLocation(details?.geometry?.location.lat, details?.geometry?.location.lng);
                }}
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
            </View> : null}
            </SafeAreaView>
        );
    };
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
