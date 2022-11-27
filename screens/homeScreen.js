import * as React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import axios from 'axios';
import IpContext from '../../state/IpContext';
import { BarCodeScanner } from 'expo-barcode-scanner'

const reg = /http:\/\/(?<ip>\d+.\d+.\d+.\d+):50000/;

//need to add connection to port as well

export default function HomeScreen({navigation}){

    const { ipAddress, setIpAddress } = React.useContext(IpContext)

    const [hasPermission, setHasPermission] = React.useState(null);

    const [scanned, setScanned] = React.useState(false);

    const [success, setSuccess] = React.useState(false);

    React.useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    });

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        if (type !== 256) {
            alert("Invalid QR Code. Scan again.");
            return;
        }

        const match = reg.exec(data)
        if (match !== null && match !== undefined && match.groups !== null) {
            setIpAddress(match.groups["ip"])
            setSuccess(true);
        } else {
            alert("Invalid QR Code. Scan again.")
        }
    }

    function onChange(event) {
        setIpAddress(event);
    }

    function onRescan() {
        setSuccess(false);
        setScanned(false);
    }

    const connectPressed = () => {
        navigation.navigate('Remote');
    }

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return(
        <View style={styles.container}>
            <View style={styles.loginContainer}>
                <FontAwesome5 name='robot' size={100} color='black'/>
                {hasPermission === true && scanned === false &&
                    <BarCodeScanner 
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFill}
                    />
                }
                { hasPermission === null &&
                    <Text>Requesting for camera permission</Text>
                }

                { hasPermission === false &&
                    <Text>No access to camera</Text>
                }

                { scanned == true && success == true &&
                    <>
                        <Text>Detected IP: { ipAddress }</Text>
                        <TouchableOpacity style={styles.connectButton} onPress={connectPressed}>
                            <Text style={styles.inputText}>CONNECT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.connectButton} onPress={onRescan}>
                            <Text style={styles.inputText}>RESCAN</Text>
                        </TouchableOpacity>
                    </>
                }
                {
                    scanned == true && success == false &&

                    <TouchableOpacity style={styles.connectButton} onPress={onRescan}>
                        <Text style={styles.inputText}>RESCAN</Text>
                    </TouchableOpacity>
                 }
                
                <TextInput
                    style={styles.input}
                    placeholder='IP Address'
                    onChangeText={onChange}
                    >
                </TextInput>
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
        margin: 10,
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