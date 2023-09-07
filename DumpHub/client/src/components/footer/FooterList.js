import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import FooterItem from './FooterItem';

const FooterList = () => {
    const navigation = useNavigation();
    const route = useRoute();

    return (
        <View style = {styles.container}>
            <FooterItem text = "Home" name = "home" screenName = "Home" handlePress = {() => navigation.navigate("Home")} routeName = {route.name} />
            <FooterItem text = "Search" name = "search" screenName = "Search" handlePress = {() => navigation.navigate("Search")} routeName = {route.name} />
            <FooterItem text = "Account" name = "user" screenName = "Account" handlePress = {() => navigation.navigate("Account")} routeName = {route.name} />
            {/* <FooterItem text = "Collections" name = "bookmark" screenName = "Collections" handlePress = {() => navigation.navigate("Collections")} routeName = {route.name} />
            <FooterItem text = "More" name = "bars" screenName = "More" handlePress = {() => navigation.navigate("More")} routeName = {route.name} /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flex: 0.1,
        left: 0,
        right: 0,
        bottom: -50,
        flexDirection: "row",
        margin: 10,
        marginHorizontal: 30,
        height: 80,
        alignItems: 'center',
        justifyContent: "space-between",
    }
})

export default FooterList
