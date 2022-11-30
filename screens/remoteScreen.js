
//currently working on api requests


import React, { useState, setState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios';
import IpContext from '../state/IpContext';
import Spinner from 'react-native-loading-spinner-overlay';

export default function RemoteScreen({navigation}){

    const buttons = [
        {id:'3', button:'LR', motion:'turn_left', motionID: 3, icon: "return-up-back", iconType: "ion"},
        {id:'4', button:'U', motion:'walk_forward_short', motionID: 4, icon: "arrow-up", iconType: "ion"},
        {id:'5', button:'RR', motion:'turn_right', motionID: 5, icon: "return-up-forward", iconType: "ion"},
        {id:'6', button:'L', motion:'walk_left', motionID: 6, icon: "arrow-back", iconType: "ion"},
        {id:'7', button:'stop', motion:'stop', motionID: 7, icon: "controller-stop", iconType: "entypo"},
        {id:'8', button:'R', motion:'walk_right', motionID: 8, icon: "arrow-forward", iconType: "ion"},
        {id:'9', button:'LA', motion:'walk_forward_4step', motionID: 9, icon: null, iconType: "text"},
        {id:'10', button:'D', motion:'basic_motion', motionID: 1, icon: "arrow-down", iconType: "ion"},
        {id:'11', button:'RA', motion:'walk_forward_6step', motionID: 11, icon: null, iconType: "text"},
        //{id:'1', button: 'A', motion:'basic_motion'},
        //{id:'2', button:'B', motion:'kick_right'},
        
        //need to figure out how to add multiple styles for A and B buttons in flatlist
        
        
    ]

    const { ipAddress, setIpAddress } = React.useContext(IpContext)

    const [visible, setVisible] = React.useState(false);
    
    //prints motion for button press to console 
    const handlePress = (motion) =>{
        console.log(motion);
    }
   
    //api call
    const buttonPress= (motionID) => {
        setVisible(true);
        const visibleTimeout = setTimeout(() => {
            setVisible(false);
        }, 3000)
        console.log("Calling motion: " + motionID)
        fetch(`http://${ipAddress}:50000/motion/${motionID}`)
        .then(res => {
            console.log(res.status);
            // console.log(res.headers);
            if (res.status !== 200) {
                clearTimeout(visibleTimeout);
                setVisible(false);
                alert(`API returned invalid/error response. Status code: ${response.status}`)
            }
            return res.json();
        })
        .then((result) => {
            console.log(result);
        }).catch((error) => {
            setVisible(false);
            clearTimeout(visibleTimeout);
            console.error(error);
            alert("Error. Motion request timed out.")
        })
    }

    return(
        <View style={styles.container}>
            <Spinner
                textContent='Sending Motion...'
                visible={visible}
                overlayColor="#000000AA"
                color='white'
                textStyle={{color: 'white'}}
            />
            <View style={styles.controller}>
                <FlatList
                    contentContainerStyle={{flexGrow: 1, justifyContent:'center'}}
                    keyExtractor={(item) => item.id}
                    data={buttons}
                    numColumns={3}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.controllerButtons} onPress={() => {
                           buttonPress(item.motionID)
                           //handlePress(item.motion)
                        }}>
                            { item.iconType === "ion" &&
                                <Ionicons name={item.icon} size={40} color="white"/>
                            }
                            { item.iconType === "text" &&
                                <Text style={styles.funcButtons}>{item.button}</Text>
                            }
                            { item.iconType === "entypo" &&
                                <Entypo name={ item.icon } size={40} color="white" />
                            }
                            
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