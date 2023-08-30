import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Map from '../containers/Map';
import FooterList from '../footer/FooterList';

class Home extends Component {
    render() {
        return (
            <>
                <Map />
                <FooterList />
            </>
        );
    }
}

export default Home;
