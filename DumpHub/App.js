// import * as React from 'react';
// import { Text, View, StyleSheet } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Ionicons from '@expo/vector-icons/Ionicons';

// // Screens
// import Map from './src/components/containers/Map';
// import Main from './src/components/screens/Main';
// // import Tabs from './src/components/containers/BottomTab';
// // import MapInput from './components/MapInput';

// const Tab = createBottomTabNavigator();

// export default class App extends React.Component {
//   render() {
//     return (
//       <>
//         <Map />
//         <NavigationContainer>
//           <Tab.Navigator
//             screenOptions={({ route }) => ({
//               tabBarIcon: ({ focused, color, size }) => {
//                 let iconName;
    
//                 if (route.name === 'Home') {
//                   iconName = focused
//                     ? 'ios-information-circle'
//                     : 'ios-information-circle-outline';
//                 } else if (route.name === 'Settings') {
//                   iconName = focused ? 'ios-list' : 'ios-list-outline';
//                 }
    
//                 // You can return any component that you like here!
//                 return <Ionicons name={iconName} size={size} color={color} />;
//               },
//               tabBarActiveTintColor: 'tomato',
//               tabBarInactiveTintColor: 'gray',
//             })}
//           >
//             <Tab.Screen name="Home" component = {Main} />
//             <Tab.Screen name="Settings" component = {Main} />
//           </Tab.Navigator>
//         </NavigationContainer>
//       </>
//       // <MapInput />
//     );
//   }
// }

import SignUp from "./src/components/screens/SignUp";

export default function App() {
  return (
    <SignUp />
  )
}
