import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// Screens
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
// import Home from "./screens/Home";
import { AuthContext } from "../context/auth";
import HeaderTabs from './header/HeaderTabs';
import Account from "./screens/Account";
// import Collections from "./screens/Collections";
// import More from "./screens/More";
import Search from "./containers/Search";
import ForgotPassword from './screens/ForgotPassword';
import HomeNavigation from "./screens/HomeNavigation";
import PlaceDetail from "./screens/PlaceDetail";

const Stack = createNativeStackNavigator();

const NavigationScreen = () => {
    const [state, setState] = useContext(AuthContext);
    const authenticated = state && state.token !== "" && state.user !== null;

    console.log('NAVIGATION SCREEN', state)
    return (
        <Stack.Navigator initialRouteName="HomeNavigation"
        >
            {authenticated ?
                (
                    <>
                        <Stack.Screen name = "Home" component = {HomeNavigation} options={{
                headerShown: false
            }} />
                        <Stack.Screen name = "Search" component = {Search} options={{
                headerShown: false
            }} />
                        <Stack.Screen name = "Account" component={Account} options={{ headerRight: () => <HeaderTabs />}} />
                        <Stack.Screen name = "Places" 
                            component={PlaceDetail} screenOptions = {{ presentation: 'modal' }} options={{
                                headerShown: false }} />
                        {/* <Stack.Screen name = "Collections" component={Collections} />
                        <Stack.Screen name = "More" component={More} /> */}
                    </>
                ) : (
                <>
                    <Stack.Screen name = "SignUp" component = {SignUp} />
                    <Stack.Screen name = "SignIn" component = {SignIn} />
                    <Stack.Screen name = "ForgotPassword" component = {ForgotPassword} />
                </>
            )}
        </Stack.Navigator>
    )
}

export default NavigationScreen
