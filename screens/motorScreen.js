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

   const [torq, setTorq] = useState(0);

   const [motors, setMotors] = useState([]);

   const [motor, setMotor] = useState({ min: 1, max: 254, default: 127 });

   const { ipAddress, setIpAddress } = React.useContext(IpContext)

   useFocusEffect(React.useCallback(() => {
        const controller = new AbortController();

        const id = setTimeout(() => {
            controller.abort()
        }, 2000)
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

    function sendCall(position) {
        if (value === null) {
            alert("Please select a motor.")
            return;
        }
        const controller = new AbortController();
        let mapped
        if (position === null)
            mapped = pos
        else
            mapped = position
        console.log(`Calling motor ${value} with position ${ mapped }`);
        const id = setTimeout(() => {
            controller.abort()
        }, 2000)
        fetch(`http://${ipAddress}:50000/motor?id=${value}&pos=${mapped}&torq=${torq}`, { signal: controller.signal })
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
                alert(`Failed to call motor: ${value}, position: ${ mapped }. Invalid IP Address?`);
            }
        });
    }

    function reset() {
        sendCall(motor.default)
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
                    setMotor(item);
                }}>
                </Dropdown>
                <Text>SAM ID Map</Text>
                <Image style={styles.image} source={ require('../assets/samID.png') }/>

    
                <Text style={{fontSize:20}}> Change Motor Position:</Text>
                <View style={styles.row}>
                    <Text>Position: {pos}</Text>
                    <Slider
                        style={styles.slider}
                        minimumValue={motor.min}
                        step={1}
                        maximumValue={motor.max}
                        onValueChange={pos => setPos(pos)}
                        value={pos}
                    />
                </View>
                <View style={styles.row}>
                    <Text>Torq: {torq}</Text>
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={4}
                        step={1}
                        onValueChange={torq => setTorq(torq)}
                        value={torq}
                    />
                </View>

                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.button} onPress={ () => sendCall(null) }>
                            <Text style={styles.buttonText}>SEND</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={ reset }>
                            <Text style={styles.buttonText}>RESET</Text>
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
    camContainer:{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#fff',
        borderRadius: 10,
        width:350,
        height:650,
        flex: .8,
    },
    image:{
        width:'55%',
        height:'60%'
    },
    dropdown:{
        marginBottom: 16,
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
        borderRadius: 10,
        width: "40%",
        height: 45,
        marginStart: 5,
        marginEnd: 5,
        marginBottom: 10
    },
    row: {
        flex: 1,
        width: "90%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    buttonRow: {
        flex: 1,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    slider: {
        width: "70%", 
        height: 35, 
        transform: [{ scale: 1 }]
    },
    buttonText:{
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    }
})
