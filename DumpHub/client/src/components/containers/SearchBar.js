import { View, Text, Dimensions, Image, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from "@expo/vector-icons";

export default function SearchBar({setSearchText}) {
    const [searchInput, setSearchInput] = useState();
    
    return (
        <View>
            <LinearGradient
                colors = {[ 'white', 'transparent' ]}
                style = {{ padding: 20, paddingTop: 50, width: Dimensions.get("screen").width }}>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                    >
                    <Text style={{ fontWeight: "bold", fontSize: 35 }}>
                        Discover
                    </Text>
                    <Image
                        source={require("./../../../assets/icon.png")}
                        style={{ width: 50, height: 50, borderRadius: 100 }}
                    />
                    </View>
                    <View
                    style={{
                        display: "flex",
                        marginTop: 5,
                        flexDirection: "row",
                        padding: 10,
                        gap: 5,
                        elevation: 0.7,
                        alignItems: "center",
                        backgroundColor: "white",
                        borderRadius: 5,
                    }}
                    >
                    <Ionicons name="search" size={24} color={"dark gray"} />
                    <TextInput
                        placeholder="Search"
                        style={{ backgroundColor: "white", width: "80%" }}
                        onChangeText={(value) => setSearchInput(value)}
                        onSubmitEditing={() => setSearchText(searchInput)}
                    />
                    </View>
            </LinearGradient>
        </View>
    )
}
