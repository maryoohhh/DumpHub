// import React from "react";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

// class MapInput extends React.Component {
//     render() {
//         return (
//             <GooglePlacesAutocomplete
//                 placeholder="Search"
//                 minLength={2}
//                 autoFocus={true}
//                 returnKeyType={'search'}
//                 listViewDisplayed={false}
//                 fetchDetails={true}
//                 onPress={(data, details = null) => {
//                     this.props.notifyChange(details.geometry.location);
//                 }}
//                 query={{
//                     key: 'AIzaSyCSsTnZJBdxPUDr5uY60J7UaYE6zKsFEvs',
//                     language: 'en'
//                 }}
//                 nearbyPlacesAPI="GooglePlacesSearch"
//                 debounce={300}
//             />
//         );
//     }
// }

// export default MapInput;

import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// navigator.geolocation = require('@react-native-community/geolocation');
// navigator.geolocation = require('react-native-geolocation-service');

const MapInput = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'AIzaSyAFEDZC2XNZPGRH04T9nMN4Zq9bGwIxF3o',
        language: 'en',
      }}
      currentLocation={true}
      currentLocationLabel='Current location'
    />
  );
};

export default MapInput;
