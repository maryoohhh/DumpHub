import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from "expo-image-picker";

import { AuthContext } from "../../context/auth";

const Account = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [image, setImage] = useState({ url: "", public_id: "" });
    const [state, setState] = useContext(AuthContext);
    const [uploadImage, setUploadImage] = useState("");

    // useEffect(() => {
    //     if (state) {
    //         const { name, email, role, image } = state.user;
    //         setName(name);
    //         setEmail(email);
    //         setRole(role);
    //         setImage(image);
    //     }
    // }, [state]);

    const handleSubmit = async () => {
        try {
            let storedData = await AsyncStorage.getItem("auth-rn");
            const user = JSON.parse(storedData);
            console.log(user)
            const resp = await axios.post("https://urban-xylophone-4q6pqg49j7pf7xv6-8000.preview.app.github.dev/api/update-password", { password, user })
                                    .then(res => {
                                        const data = res;
                                        console.log(res)
                                        alert("Password updated successfully");
                                        setPassword("");
                                    })
                                    .catch(err => {
                                        console.log(err)
                                    });
        //     const data = resp.data;
        //     if(data.error)
        //         alert(data.error)
        //     else {
        //         alert("Password updated successfully");
        //         setPassword("");
        //     }
        } catch (err) {
            alert("Password update failed");
            console.log(err);
        }
    }

    const handleUpload = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(permissionResult.granted === false) {
            alert("Camera access is required");
            return;
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });
        // let pickerResult = await ImageCropPicker.openPicker({
        //     mediaType: 'photo',
        //     cropping: false
        // })
        if (pickerResult.cancelled === true) {
            return;
        }
        let base64Image = `data:image/jpg;base64, ${pickerResult.base64}`;
        setUploadImage(base64Image);

        let storedData = await AsyncStorage.getItem("auth-rn");
        const parsed = JSON.parse(storedData);
        const { data } = await axios.post("https://urban-xylophone-4q6pqg49j7pf7xv6-8000.preview.app.github.dev/api/upload-image", {
            image: base64Image,
            user: parsed.user
        })
                                    .then(data => {
                                        console.log("UPLOADED RESPONSE => ", data);
                                        // upload async storage
                                        const stored = JSON.parse(AsyncStorage.getItem("auth-rn"));
                                        stored.user = data;
                                        AsyncStorage.setItem("auth-rn", JSON.stringify(stored));
                                        // update context
                                        setState({ ...state, user: data });
                                        setImage(data.image);
                                        alert("Profile image saved");
                                    })
        // console.log("UPLOADED RESPONSE => ", data);
        // // upload async storage
        // const stored = JSON.parse(await AsyncStorage.getItem("auth-rn"));
        // stored.user = data;
        // await AsyncStorage.setItem("auth-rn", JSON.stringify(stored));
        // // update context
        // setState({ ...state, user: data });
        // setImage(data.image);
        // alert("Profile image saved");
    };

    const logo = require("/workspaces/DumpHub/DumpHub/client/assets/logo.png"); 

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
            <View style = {{ marginVertical: 100 }}>
                <View style = {styles.imageContainer}>
                    {image && image.url ? <Image source = {{ uri: image.url }} style = {styles.imageStyles} /> :
                    uploadImage ? <Image source={{ uri: uploadImage }} style={styles.imageStyles} /> : (
                        <TouchableOpacity onPress={() => handleUpload()}>
                            <FontAwesome5 name = "camera" size = {25} color="darkmagenta" />
                        </TouchableOpacity>
                    )}
                </View>
                {image && image.url ? (
                    <TouchableOpacity onPress={() => handleUpload()}>
                        <FontAwesome5 name ="camera" size={25} color="darkmagenta" style={styles.iconStyle} />
                    </TouchableOpacity>
                ): (
                    <></>
                )}
                <Text style = {styles.signupText}>{name}</Text>
                <Text style = {styles.emailText}>{email}</Text>
                <Text style = {styles.roleText}>{role}</Text>
                <View style = {{ marginHorizontal: 24 }}>
                    <Text style = {{ fontSize: 16, color: '#8e93a1' }}>PASSWORD</Text>
                    <TextInput style = {styles.signupInput} value={password} onChangeText={text => setPassword(text)} secureTextEntry={true}
                    autoComplteType = "password" />
                </View>
                <TouchableOpacity onPress={handleSubmit} style={styles.buttonStyle}>
                    <Text style = {styles.buttonText}>Update Password</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    iconStyle: {
        marginTop: -5,
        marginBottom: 10,
        alignSelf: 'center'
    },
    container: {
        flex: 1,
        justifyContent: "space-between"
    },
    signupText: {
        fontSize: 30,
        textAlign: 'center',
        paddingBottom: 10
    },
    emailText: {
        fontSize: 18,
        textAlign: 'center',
        paddingBottom: 10
    },
    roleText: {
        fontSize: 16,
        textAlign: 'center',
        paddingBottom: 10,
        color: 'gray'
    },
    signupInput: {
        borderBottomWidth: 0.5,
        height: 48,
        borderBottomColor: "#8e93a1",
        marginBottom: 30
    },
    buttonStyle: {
        backgroundColor: "darkmagenta",
        height: 50,
        marginBottom: 20,
        justifyContent: 'center',
        marginHorizontal: 15,
        borderRadius: 15
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#fff',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageStyles: {
        width: 100,
        height: 100,
        marginVertical: 20
    }
})

export default Account
