import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './Home';
import PlaceDetail from './PlaceDetail';

export default function HomeNavigation() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
        screenOptions={{headerShown: false, gestureEnabled: true }}>
            <Stack.Screen name = 'home' component = {Home} />
            <Stack.Screen name = "place-detail" component={PlaceDetail} 
                screenOptions = {{
                    presentation: 'modal' }} />
        </Stack.Navigator>
    )
}