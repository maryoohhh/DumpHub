import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// Screens
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import Home from "./screens/Home";
import { AuthContext } from "../context/auth";
import HeaderTabs from './header/HeaderTabs';
import Account from "./screens/Account";
import Collections from "./screens/Collections";
import More from "./screens/More";

const Stack = createNativeStackNavigator();

const NavigationScreen = () => {
    const [state, setState] = useContext(AuthContext);
    const authenticated = state && state.token !== "" && state.user !== null;

    return (
        <Stack.Navigator initialRouteName="Home">
            {authenticated ?
                (
                    <>
                        <Stack.Screen name = "Home" component = {Home} options={{ headerRight: () => <HeaderTabs />}} />
                        <Stack.Screen name = "Account" component={Account} />
                        <Stack.Screen name = "Collections" component={Collections} />
                        <Stack.Screen name = "More" component={More} />
                    </>
                ) : (
                <>
                    <Stack.Screen name = "SignUp" component = {SignUp} />
                    <Stack.Screen name = "SignIn" component = {SignIn} />
                </>
            )}
        </Stack.Navigator>
    )
}

export default NavigationScreen
