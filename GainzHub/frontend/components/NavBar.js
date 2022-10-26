import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Social';
import Profile from '../screens/Profile';
import TempLanding from '../screens/TempLanding';
import { Ionicons } from '@expo/vector-icons';
import Nutrition from '../screens/Nutrition';
import Workout from '../screens/Workout';
import WorkoutLogs from '../screens/WorkoutLogs';
import WorkoutExplore from '../screens/WorkoutExplore';
import Progress from '../screens/Progress';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import NutritionPlans from '../screens/NutritionPlans';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {createStackNavigator} from '@react-navigation/stack'
import NutritionExplore from '../screens/NutritionExplore';

const Tab = createBottomTabNavigator();

const NutritionStack = createStackNavigator();

function NutritionStackScreen(){
    return(
        <NutritionStack.Navigator
            initialRouteName='Daily'
            screenOptions={{headerShown: false}}
        >
            <NutritionStack.Screen name= "Daily" component={Nutrition} initialParams={{routeName: "Daily"}}/>
            <NutritionStack.Screen name="Plan" component={NutritionPlans}/>
            <NutritionStack.Screen name= "Explore" component={NutritionExplore}/>
        </NutritionStack.Navigator>
    )
}

export default function NavBar({ navigation }) {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}   
            tabBarOptions={{activeTintColor: '#FF0000', inactiveTintColor: '#000000'}
        }>
        <Tab.Screen name="Social" component={Home}
            options={{
                tabBarLabel: 'Social',
                tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={size} />
                ),
            }} 
        />
        <Tab.Screen name="Nutrition" component={NutritionStackScreen}
            options={{
                tabBarLabel: 'Nutrition',
                tabBarIcon: ({ color, size }) => (
                <Ionicons name="nutrition" color={color} size={size} />
                ),
            }}
        />
        <Tab.Screen name="Workout" component={Workout}
            options={{
                tabBarLabel: 'Workout',
                tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="weight-lifter" color={color} size={size} />
                ),
            }} 
        />
        <Tab.Screen name="Progress" component={Progress}
            options={{
                tabBarLabel: 'Progress',
                tabBarIcon: ({ color, size }) => (
                <Entypo name="bar-graph" size={size} color={color}/>                ),
            }} 
        />
        <Tab.Screen name="WorkoutLogs" component={WorkoutLogs}
            options={{
                tabBarButton: () => (
                    <View style={{width:0, height:0}}></View>
                ),
            }}
        />
        <Tab.Screen name="WorkoutExplore" component={WorkoutExplore}
            options={{
                tabBarButton: () => (
                    <View style={{width:0, height:0}}></View>
                ),
            }}
        />
        <Tab.Screen name="Profile" component={Profile}
            options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="account-box" color={color} size={size} />
                ),
            }} 
        />
        </Tab.Navigator>
      );
}