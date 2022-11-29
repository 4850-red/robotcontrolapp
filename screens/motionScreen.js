
//will work on this after demo

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import IpContext from '../state/IpContext';

export default function MotionScreen({navigation}){

    const [motions, setMotions] = React.useState([]);

    const { ipAddress, setIpAddress } = React.useContext(IpContext);

    useFocusEffect(
        React.useCallback(() => {
            const controller = new AbortController();

            const id = setTimeout(() => {
                controller.abort()
            }, 500)
            fetch(`http://${ipAddress}:50000/motion`, { signal: controller.signal })
            .then(async (response) => {
                clearTimeout(id);
                try {
                    const json = await response.json();
                    console.log(json.data);
                    setMotions(json.data);
                } catch(err) {
                    console.error(err);
                    setMotions([]);
                    alert("Error loading motions. Invalid IP address?");
                }
            }).catch(err => {
                console.error(err);
                setMotions([]);
                alert("Error loading motions. Invalid IP address?");
            });
        }, [ipAddress])
    );

    function callMotion(name) {
        const controller = new AbortController();

        console.log(`Calling motion: ${name}`);
        const id = setTimeout(() => {
            controller.abort()
        }, 2000)
        fetch(`http://${ipAddress}:50000/motion/${name}`, { signal: controller.signal })
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
                alert("Error. Motion request timed out.")
            } else {
                alert(`Failed to call motion: ${name}. Invalid IP Address?`);
            }
        });
        
    }

    const ItemView = ({item}) =>{
        return(
            <TouchableOpacity style={styles.itemStyle} onPress={() => callMotion(item.name)}>
                <Text style={styles.itemText}>{item.id + 1}{'. '}{item.name.toUpperCase()}</Text>
            </TouchableOpacity>
        )
    }

    
    //as of rn i have it set up to test using the buttons list but it needs to call api to recieve list of motions
    return(
        <View style={styles.container}>
            <View style={styles.motionList}>
                { motions.length === 0 &&
                    <View style={styles.textLabel}>    
                        <Text>Failed to load motions list.</Text>
                    </View>
                }
                { motions.length > 0 &&
                    <FlatList
                    data={motions}
                    keyExtractor={(item) => item.id}
                    renderItem={ItemView}
                    showsVerticalScrollIndicator={false}
                    />
                }
                
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
    },
    textLabel: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row'
    }
})