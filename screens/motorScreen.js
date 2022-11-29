//need to get slider to work

import React, {useState} from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Slider from '@react-native-community/slider';
import { useFocusEffect } from '@react-navigation/native';
import IpContext from '../state/IpContext';


export default function MotorScreen({navigation}){

   const [value, setValue] = useState(null);
   //need to grab current position from api 
   const [pos, setPos] = useState(1);

   const [motors, setMotors] = useState([]);

   const { ipAddress, setIpAddress } = React.useContext(IpContext)

   useFocusEffect(React.useCallback(() => {
        const controller = new AbortController();

        const id = setTimeout(() => {
            controller.abort()
        }, 500)
        fetch(`http://${ipAddress}:50000/motor`, { signal: controller.signal })
        .then(async (response) => {
            clearTimeout(id);
            try {
                const json = await response.json();
                for (let obj of json.data) {
                    obj.label = `${obj.id}: ${obj.name.toUpperCase()}`
                }
                console.log(json.data);
                setMotors(json.data);
            } catch(err) {
                console.error(err);
                setMotors([]);
                alert("Error loading motors. Invalid IP address?");
            }
        }).catch(err => {
            console.error(err);
            setMotors([]);
            alert("Error loading motors. Invalid IP address?");
        });
    }, [ipAddress]))

    function sendCall() {
        if (value === null) {
            alert("Please select a motor.")
            return;
        }
        const controller = new AbortController();
        const roundedPosition = Math.round(pos);
        console.log(`Calling motor ${value} with position ${ roundedPosition }`);
        const id = setTimeout(() => {
            controller.abort()
        }, 2000)
        fetch(`http://${ipAddress}:50000/motor/${value}/${roundedPosition}`, { signal: controller.signal })
        .then(async (response) => {
            clearTimeout(id);
            if (response.status === 200) {
                console.log(await response.json());
            } else {
                console.log(await response.json());
                alert(`API returned invalid/error response. Status code: ${response.status}`)
            }
        }).catch(err => {
            console.error(err);
            if (err.name === "AbortError") {
                alert("Error. Motor request timed out.")
            } else {
                alert(`Failed to call motor: ${value}, position: ${ roundedPosition }. Invalid IP Address?`);
            }
        });
    }

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
                valueField='id'
                placeholder="Select a Motor"
                searchPlaceholder='Search...'
                value={value}
                onChange={item => {
                    setValue(item.id);
                    setPos(item.default);
                }}>
                </Dropdown>
                <Text>SAM ID Map</Text>
                <Image style={styles.image} source={ require('../assets/samID.png') }/>

    
                <Text style={{fontSize:20}}> Change Motor Position:</Text>
                <Slider
                style={{width:250, height:10}}
                minimumValue={1}
                maximumValue={254}
                onValueChange={pos => setPos(pos)}
                value={pos}
                />
                <TouchableOpacity style={styles.button} onPress={ sendCall }>
                        <Text style={styles.inputText}>SEND REQUEST</Text>
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
    button:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1063DE',
        margin: 10,
        borderRadius: 10,
        width: 250,
        height: 50,
    },
})
