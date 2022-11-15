
//currently working on api requests


import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function RemoteScreen({navigation}){

    return(
        <View style={styles.container}>
            <View style={styles.controller}>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.controllerButtons}>
                        <Ionicons name="return-up-back" size={40} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.controllerButtons}>
                        <Ionicons name="arrow-up" size={40} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.controllerButtons}>
                        <Ionicons name="return-up-forward" size={40} color="white"/>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.controllerButtons}>
                        <Ionicons name="arrow-back" size={40} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.controllerButtons}>
                        <Entypo name="controller-stop" size={40} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.controllerButtons}>
                        <Ionicons name="arrow-forward" size={40} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.controllerButtons}>
                        <Text style={styles.funcButtons}>LFN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.controllerButtons}>
                        <Ionicons name="arrow-down" size={40} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.controllerButtons}>
                        <Text style={styles.funcButtons}>RFN</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.ab}>
                    <TouchableOpacity style={{
                        alignItems:'center',
                        justifyContent:'center',
                        width:75, 
                        height:75, 
                        borderRadius:100, 
                        backgroundColor:'rgba(16,99,222,0.7)',
                    }}>
                        <Text style={styles.funcButtons}>A</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        alignItems:'center',
                        justifyContent:'center',
                        width:75, 
                        height:75, 
                        borderRadius:100, 
                        backgroundColor:'rgba(16,99,222,0.7)',
                    }}>
                        <Text style={styles.funcButtons}>B</Text>
                    </TouchableOpacity>
                </View>
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
    controller:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        width:350,
        height:650,
        borderRadius: 10 
    },
    row:{
        flexDirection: 'row'
    },
    controllerButtons:{
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor:'rgba(16,99,222,0.7)',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white',
        width: 100,
        height: 100,
    },
    funcButtons:{
        color:'white',
        fontWeight: 'bold',
        fontSize:25, 
    },
    ab:{
        backgroundColor: '#fff',
        flexDirection:'row',
        width:350,
        marginTop:10,
        padding:10,
        alignItems:'center',
        justifyContent:'center',
        justifyContent:'space-between' 
    }
})