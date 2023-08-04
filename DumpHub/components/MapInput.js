import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

class MapInput extends React.Component {
    render() {
        return (
            <GooglePlacesAutocomplete
                placeholder="Search"
                minLength={2}
                autoFocus={true}
                returnKeyType={'search'}
                listViewDisplayed={false}
                fetchDetails={true}
                onPress={(data, details = null) => {
                    this.props.notifyChange(details.geometry.location);
                }}
                query={{
                    key: 'AIzaSyCSsTnZJBdxPUDr5uY60J7UaYE6zKsFEvs',
                    language: 'en'
                }}
                nearbyPlacesAPI="GooglePlacesSearch"
                debounce={300}
            />
        );
    }
}

export default MapInput;
