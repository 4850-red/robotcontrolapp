
//will work on this after demo

import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function MotionScreen({navigation}){

    // NEED TO ADD A LIST OF MOTIONS FROM API TO SELECT
    return(
        <View style={styles.container}>
            <View style={styles.motionList}>
                <Text>MOTIONSCREEN</Text>
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
    motionList:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        width:350,
        height: 650,
        margin: 10,
        borderRadius: 10
    }
})