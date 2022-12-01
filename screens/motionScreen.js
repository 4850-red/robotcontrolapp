
//will work on this after demo

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import IpContext from '../state/IpContext';
import Spinner from 'react-native-loading-spinner-overlay';

export default function MotionScreen({navigation}){

    const [motions, setMotions] = React.useState([]);

    const [visible, setVisible] = React.useState(false);

    const { ipAddress, setIpAddress } = React.useContext(IpContext);

    useFocusEffect(
        React.useCallback(() => {
            const controller = new AbortController();

            const id = setTimeout(() => {
                controller.abort()
            }, 2000)
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
        setVisible(true);

        console.log(`Calling motion: ${name}`);
        const id = setTimeout(() => {
            controller.abort()
        }, 2000)
        const visibleTimeout = setTimeout(() => {
            setVisible(false);
        }, 3000)
        fetch(`http://${ipAddress}:50000/motion/${name}`, { signal: controller.signal })
        .then(async (response) => {
            clearTimeout(id);
            if (response.status === 200) {
                console.log(await response.json());
            } else {
                clearTimeout(visibleTimeout);
                setVisible(false);
                console.log(await response.json());
                alert(`API returned invalid/error response. Status code: ${response.status}`)
            }
        }).catch(err => {
            clearTimeout(visibleTimeout);
            setVisible(false);
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
                <Text style={styles.itemText}>{item.id}{'. '}{item.name.toUpperCase()}</Text>
            </TouchableOpacity>
        )
    }

    
    //as of rn i have it set up to test using the buttons list but it needs to call api to recieve list of motions
    return(
        <View style={styles.container}>
            <Spinner
                textContent='Sending Motion...'
                visible={visible}
                overlayColor="#000000AA"
                color='white'
                textStyle={{color: 'white'}}
            />
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
        borderRadius: 10,
        flex: .8
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