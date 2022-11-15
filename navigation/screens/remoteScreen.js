
//currently working on api requests


import React, { useState, setState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios';

export default function RemoteScreen({navigation}){

    const buttons = [
        {id:'3', button:'LR', motion:'turn_left'},
        {id:'4', button:'U', motion:'walk_forward_short'},
        {id:'5', button:'RR', motion:'turn_right'},
        {id:'6', button:'L', motion:'walk_left'},
        {id:'7', button:'stop', motion:'stop'},
        {id:'8', button:'R', motion:'walk_right'},
        {id:'9', button:'LA', motion:'walk_forward_4step'},
        {id:'10', button:'D', motion:'basic_motion'},
        {id:'11', button:'RA', motion:'walk_forward_6step'},
        //{id:'1', button: 'A', motion:'basic_motion'},
        //{id:'2', button:'B', motion:'kick_right'},
        
        //need to figure out how to add multiple styles for A and B buttons in flatlist
        
        
    ]
    //need to add icons to every button
    const icons = [

    ]
    
    //prints motion for button press to console 
    const handlePress = (motion) =>{
        console.log(motion);
    }
   
    //api call
    const buttonPress= () => {
        fetch("http://localhost:3000/api")
        .then(res => {
            console.log(res.status);
            console.log(res.headers);
            return res.json();
        })
        .then((result) => {
            console.log(result);
        }),
        (error) => {
            console.log(error);
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.controller}>
                <FlatList
                    contentContainerStyle={{flexGrow: 1, justifyContent:'center'}}
                    keyExtractor={(item) => item.id}
                    data={buttons}
                    numColumns={3}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.controllerButtons} onPress={() => {
                            buttonPress
                        }}>
                            <Text style={styles.funcButtons}>{item.button}</Text>
                        </TouchableOpacity>
                    )}
                    />
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