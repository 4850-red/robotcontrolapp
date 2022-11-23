import * as React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import axios from 'axios';
import IpContext from '../../state/IpContext';


//need to add connection to port as well

export default function HomeScreen({navigation}){

    const { ipAddress, setIpAddress } = React.useContext(IpContext)

    function onChange(event) {
        setIpAddress(event);
    }

    const connectPressed = () => {
        navigation.navigate('Remote');
    }

    return(
        <View style={styles.container}>
            <View style={styles.loginContainer}>
                <FontAwesome5 name='robot' size={100} color='black'/>
                <TextInput
                    style={styles.input}
                    placeholder='IP Address'
                    onChangeText={onChange}
                    >
                </TextInput>
                <TouchableOpacity style={styles.connectButton} onPress={connectPressed}>
                    <Text style={styles.inputText}>CONNECT</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#0E1950',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        width:350,
        height: 650,
        margin: 10,
        borderRadius: 10 
    },
    input:{
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding:5,
        margin: 30,
        width: 200,
        height: 50
    },
    connectButton:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1063DE',
        borderRadius: 10,
        width: 250,
        height: 50,
    },
    inputText:{
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    }
})