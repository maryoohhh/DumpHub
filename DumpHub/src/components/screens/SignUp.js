import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = async () => {
        if (name === '' || email === '' || password === '') {
            allert("All fields are required");
            return;
        }
        await axios.post("http://localhost:8001/api/signup", { name, email, password });
        alert("Sign Up Successful");
    }

    const logo = require("/workspaces/DumpHub/DumpHub/assets/logo.png"); 

    return (
        <KeyboardAwareScrollView contentContainerStyle = {styles.container}>
            <View style = {{ marginVertical: 100 }}>
                <View style = {styles.imageContainer}>
                    <Image source = {logo} style = {styles.imageStyles} />
                </View>
                <Text style = {styles.signupText}>SignUp</Text>
                <View style = {{ marginHorizontal: 24}}>
                    <Text style = {{ fontSize: 16, color: "gray" }}>Name</Text>
                    <TextInput style = {styles.signupInput} value = {name} onChangeText = {text => setName(text)} autoCapitalize = 'words' autoCorrect = {false} />
                </View>

                <View style = {{ marginHorizontal: 24 }}>
                    <Text style = {{ fontSize: 16, color: "gray" }}>Email</Text>
                    <TextInput style = {styles.signupInput} value = {email} onChangeText = {text => setEmail(text)} autoComplete = 'email' keyboardType = 'email-address' />
                </View>

                <View style = {{ marginHorizontal: 24 }}>
                    <Text style = {{ fontSize: 16, color: "gray" }}>Password</Text>
                    <TextInput style = {styles.signupInput} value = {password} onChangeText = {text => setPassword(text)} secureTextEntry = {true} autoCompleteType = 'password' />
                </View>
                <TouchableOpacity onPress = {handleSubmit} style = {styles.buttonStyle}>
                    <Text style = {styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <Text  style = {{ fontSize: 12, textAlign: 'center' }}>
                    Already Joined? Sign In
                </Text>
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    signupText: {
        fontSize: 30,
        textAlign: 'center'
    },
    signupInput: {
        borderBottomWidth: 0.5,
        height: 48,
        borderBottomColor: "#8e93a1",
        marginBottom: 30,
    },
    buttonStyle: {
        backgroundColor: "darkmagenta",
        height: 50,
        marginBottom: 20,
        justifyContent: 'center',
        marginHorizontal: 15,
        borderRadius: 15,
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

export default SignUp;
