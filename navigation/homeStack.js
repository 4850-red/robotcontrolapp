//sets up nav bar for app

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'

//screens
import HomeScreen from '../screens/homeScreen'
import RemoteScreen from '../screens/remoteScreen'
import MotionScreen from '../screens/motionScreen'
import MotorScreen from '../screens/motorScreen'

//screen names
const homeName = 'Home';
const remoteName = 'Remote';
const motionName = 'Motions';
const motorName = 'Motors';

const Tab = createBottomTabNavigator();


export default function MainContainer(){
    return(
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({route}) => ({ //maybe get rid of header 
                    headerStyle:{
                        height: 67
                    },
                    headerTitleStyle:{
                        fontSize: 15
                    },
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        let routeName = route.name;

                        if (routeName === homeName){
                            iconName = focused ? 'home' : 'home-outline'
                        } else if (routeName === remoteName){
                            iconName = focused ? 'game-controller' : 'game-controller-outline'
                        } else if (routeName === motionName){
                            iconName = focused ? 'list-circle' : 'list-outline'
                        } else if (routeName === motorName){
                            iconName = focused ? 'ios-body' : 'ios-body-outline'
                        }

                        return <Ionicons name={iconName} size={size} color={color}/>
                    },

                    tabBarActiveTintColor: '#011471',
                    tabBarInactiveTintColor: '#5C6074',
                    tabBarLabelStyle: {paddingBottom: 5, paddingTop:5, fontSize: 10}

                })}>
    
                <Tab.Screen name={homeName} component={HomeScreen} options={{tabBarStyle: {display: 'none'}}}/> 
                <Tab.Screen name={remoteName} component={RemoteScreen}/>
                <Tab.Screen name={motionName} component={MotionScreen}/>
                <Tab.Screen name={motorName} component={MotorScreen}/>

                
            </Tab.Navigator>
        </NavigationContainer>
    );
}