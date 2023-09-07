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
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location'
import axios from 'axios';

class Map extends Component {
    constructor() {
        super();
        this.state = {
            markers: [],
            initialPosition: null
        };
        this.gpaRef = React.createRef()
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

        await axios.get('https://urban-xylophone-4q6pqg49j7pf7xv6-8000.preview.app.github.dev/api/restrooms', {timeout: 10000}).then(res => {
            
            this.setState({markers: res.data.map(m => {
                return {
                    id: m._id,
                    coordinate: {
                        latitude: m.Y,
                        longitude: m.X,
         
                    },
                    title: m.name ?? "",
                    description: m.description ?? ""
                }
            })})
        });
        // console.log('MARKERS', markers)
        // this.setState({markers: markers})
    }

    search = async (value) => {
        console.log('EVENT', value)
        await axios.get('https://urban-xylophone-4q6pqg49j7pf7xv6-8000.preview.app.github.dev/api/restrooms', {timeout: 10000}).then(res => {
            
            this.setState({markers: res.data.map(m => {
                return {
                    id: m._id,
                    coordinate: {
                        latitude: m.Y,
                        longitude: m.X,
         
                    },
                    title: m.name ?? "",
                    description: m.description ?? ""
                }
            })})
        });
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <Text style={{position: 'absolute', color: '#FFFFFF'}}>HELLO</Text>
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
                { this.state.markers.length > 0 ? this.state.markers.map((marker, i) => {
                    return(
                        <Marker
                            key={marker.id}
                            draggable
                            coordinate={marker.coordinate}
                            onDragEnd={
                            (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
                            }
                            title={marker.title}
                            description={marker.description}
                        />
                    );
                }) : null}
                <GooglePlacesAutocomplete
                placeholder="Search"
                ref={this.gpaRef}
                textInputProps={{
                    // onChangeText: (e) => { this.setState({search: e}) },
                    onSubmitEditing: (e) =>{ 
                        const text = e.nativeEvent.text;
                        this.search(text)
                    }
                }}
             
                onPress={(data, details = null) => {
                    // console.log('enter pressed', this.state.search)
                    // console.log('data,details', data, details, this.state.search)
                    // console.log(JSON.stringify(details?.geometry?.location));
                    // this.setState({currentView: [details.geometry.location.lat, details.geometry.location.lng]})
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
