
//will work on this after demo

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';

export default function MotionScreen({navigation}){

    const buttons = [
        //need to add motions for gangnam style, demo, intro, etc
        {id:'1', button: 'A', motion:'basic_motion'},
        {id:'2', button:'B', motion:'kick_right'},
        {id:'3', button:'LR', motion:'turn_left', motionID: 2, icon: "return-up-back", iconType: "ion"},
        {id:'4', button:'U', motion:'walk_forward_short', motionID: 3, icon: "arrow-up", iconType: "ion"},
        {id:'5', button:'RR', motion:'turn_right', motionID: 4, icon: "return-up-forward", iconType: "ion"},
        {id:'6', button:'L', motion:'walk_left', motionID: 5, icon: "arrow-back", iconType: "ion"},
        {id:'7', button:'stop', motion:'stop', motionID: 12, icon: "controller-stop", iconType: "entypo"},
        {id:'8', button:'R', motion:'walk_right', motionID: 6, icon: "arrow-forward", iconType: "ion"},
        {id:'9', button:'LA', motion:'walk_forward_4step', motionID: 7, icon: null, iconType: "text"},
        {id:'10', button:'D', motion:'basic_motion', motionID: 0, icon: "arrow-down", iconType: "ion"},
        {id:'11', button:'RA', motion:'walk_forward_6step', motionID: 9, icon: null, iconType: "text"},
        
    ]

    const ItemView = ({item}) =>{
        return(
            <TouchableOpacity style={styles.itemStyle}>
                <Text style={styles.itemText}>{item.id}{'. '}{item.motion.toUpperCase()}</Text>
            </TouchableOpacity>
        )
    }

    
    //as of rn i have it set up to test using the buttons list but it needs to call api to recieve list of motions
    return(
        <View style={styles.container}>
            <View style={styles.motionList}>
                <FlatList
                 data={buttons}
                 keyExtractor={(item) => item.id}
                 renderItem={ItemView}>
                </FlatList>
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
    },
    itemStyle:{
        width:300,
        margin:5,
        padding: 30,
        borderWidth: 0.5,
        borderRadius: 5,
        backgroundColor: 'rgba(16,99,222,0.7)'
    },
    itemText:{
        fontSize:15,
        fontWeight:'bold',
        color:'white'
    }
})