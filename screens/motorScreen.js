//need to get slider to work

import React, {useState} from 'react';
import { StyleSheet, View, Text, Image, Picker } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Slider from '@react-native-community/slider';


export default function MotorScreen({navigation}){

   const [value, setValue] = useState(null);
   //need to grab current position from api 
   const [pos, getPos] = useState(0);

   //i just put random positions in to test
   const motors = [
    {id: 0, label: 'Motor 0', value:'0', position:'3'},
    {id: 1, label: 'Motor 1', value:'1', position:'43'},
    {id: 2, label: 'Motor 2', value:'2', position:'99'},
    {id: 3, label: 'Motor 3', value:'3', position:'24'},
    {id: 4, label: 'Motor 4', value:'4', position:'3'},
    {id: 5, label: 'Motor 5', value:'5', position:'19'},
    {id: 6, label: 'Motor 6', value:'6', position:'50'},
    {id: 7, label: 'Motor 7', value:'7', position:'23'},
    {id: 8, label: 'Motor 8', value:'8', position:'16'},
    {id: 9, label: 'Motor 9', value:'9', position:'75'},
    {id: 10, label: 'Motor 10', value:'10', position:'89'},
    {id: 11, label: 'Motor 11', value:'11', position:'4'},
    {id: 12, label: 'Motor 12', value:'12', position:'32'},
    {id: 13, label: 'Motor 13', value:'13', position:'54'},
    {id: 14, label: 'Motor 14', value:'14', position:'85'},
    {id: 15, label: 'Motor 15', value:'15', position:'36'},
    {id: 16, label: 'Motor 16', value:'16', position:'2'},
    {id: 17, label: 'Motor 17', value:'17', position:'68'},
    {id: 18, label: 'Motor 18', value:'18', position:'85'},
    {id: 19, label: 'Motor 19', value:'19', position:'99'},
    {id: 20, label: 'Motor 20', value:'20', position:'100'},
    {id: 21, label: 'Motor 21', value:'21', position:'13'},
    {id: 22, label: 'Motor 22', value:'22', position:'74'},
    {id: 23, label: 'Motor 23', value:'23', position:'23'},
    {id: 24, label: 'Motor 24', value:'24', position:'75'},

    ]   

    return(
        <View style={styles.container}>
            <View style={styles.camContainer}>
                <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={motors}
                search
                maxHeight={300}
                labelField="label"
                valueField='value'
                placeholder="Select a Motor"
                searchPlaceholder='Search...'
                value={value}
                onChange={item => {
                    setValue(item.value);
                    // alert for testing purposes
                    alert(item.position);
                    getPos(item.position);
                }}>
                </Dropdown>
                <Text>SAM ID Map</Text>
                <Image style={styles.image} source={ require('../assets/samID.png')}/>

    
                <Text style={{fontSize:20}}> Change Motor Position:</Text>
                <Slider
                style={{width:250, height:10}}
                minimumValue={1}
                maximumValue={100}
                onValueChange={pos => getPos(pos)}>
                </Slider>
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
    },
    image:{
        width:'60%',
        height:'65%'
    },
    dropdown:{
        margin: 16,
        height: 50,
        width:'95%',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
})
