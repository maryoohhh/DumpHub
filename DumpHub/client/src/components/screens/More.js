import { StyleSheet, Text, SafeAreaView } from "react-native";
import React from "react";
import FooterList from "../footer/FooterList";

const More = () => {
    return (
        <SafeAreaView style = {styles.container}>
            <Text style = {styles.mainText}>More Component</Text>
            <FooterList />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between"
    },
    mainText: {
        fontSize: 30,
        textAlign: 'center'
    }
})

export default More
