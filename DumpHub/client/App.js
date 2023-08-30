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

// import SignUp from "./src/components/screens/SignUp";

// export default function App() {
//   return (
//     <SignUp />
//   )
// }

// import React from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { NavigationContainer } from "@react-navigation/native";

// Screens
// import SignIn from './src/components/screens/SignIn';
// import SignUp from "./src/components/screens/SignUp";
// import { AuthProvider } from "./src/context/auth";
// import Home from "./src/components/screens/Home";
// import Navigation from "./src/components/Navigation";

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <AuthProvider>
//         <Stack.Navigator initialRouteName="Home">
//           <Navigation />
//           {/* <Stack.Screen name = "SignUp" component = {SignUp} />
//           <Stack.Screen name = "SignIn" component = {SignIn} />
//           <Stack.Screen name = "Home" component = {Home} /> */}
//         </Stack.Navigator>
//       </AuthProvider>
//     </NavigationContainer>
//   )
// }

import React from "react";
import Navigation from "./src/components/Navigation";

export default function App() {
  return (
    <Navigation />
  )
}
