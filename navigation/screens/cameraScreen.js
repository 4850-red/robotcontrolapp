
//phase 2

import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function CameraScreen({navigation}){

    return(
        <View style={styles.container}>
            <View style={styles.camContainer}>
                <Text> CAMERASCREEN </Text>
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
    camContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        width:350,
        height:650 
    }
})