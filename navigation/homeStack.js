//sets up nav bar for app

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'

//screens
import HomeScreen from './screens/homeScreen'
import RemoteScreen from './screens/remoteScreen'
import MotionScreen from './screens/motionScreen'
import CameraScreen from './screens/cameraScreen'

//screen names
const homeName = 'Home';
const remoteName = 'Remote';
const motionName = 'Motion';
const cameraName = 'Camera';

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
                        } else if (routeName === cameraName){
                            iconName = focused ? 'camera' : 'camera-outline'
                        }

                        return <Ionicons name={iconName} size={size} color={color}/>
                    },

                    tabBarActiveTintColor: '#011471',
                    tabBarInactiveTintColor: '#5C6074',
                    tabBarLabelStyle: {paddingBottom: 10, fontSize: 10}

                })}>
    
                <Tab.Screen name={homeName} component={HomeScreen} options={{tabBarStyle: {display: 'none'}}}/> 
                <Tab.Screen name={remoteName} component={RemoteScreen}/>
                <Tab.Screen name={motionName} component={MotionScreen}/>
                <Tab.Screen name={cameraName} component={CameraScreen}/>

                
            </Tab.Navigator>
        </NavigationContainer>
    );
}