import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Button, SafeAreaView, FlatList, TouchableWithoutFeedback, StatusBar,   ActivityIndicator, Image} from 'react-native'
import {Colors} from '../components/colors'
import axios from 'axios';
import Toast from 'react-native-root-toast';
import { loginUser } from '../requests/userRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ImagesExample from '../assets/mike.jpg'

const {maroon, black} = Colors;
const Tab = createBottomTabNavigator();

const SocialExplore = ({navigation}) =>{
    const [loggedIn, setLoggedIn] = useState(true);
    const [AllUsers, setAllUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const isFocused = useIsFocused();

    const data = [
        { id: '1', title: 'First item' },
        { id: '2', title: 'Second item' },
        { id: '3', title: 'Third item' },
        { id: '4', title: 'Fourth item' }
      ];

    useEffect(()=>{
    async function getAllUsers(){
        const Users = await axios.get("http://localhost:5001/user/getAllUser");
        setAllUsers(Users.data);
    }
    getAllUsers();
    }, [isFocused])

    console.log(AllUsers);

    useEffect(()=>{
        const handleLogout = async() =>{
            await AsyncStorage.removeItem('userData');
            navigation.navigate("Login");
        }

        if(!loggedIn){
            handleLogout();
        }
    }, [loggedIn]);


    return (
        <View style={[styles.root, {paddingLeft: 20}, {flex:1}]}>
            <View style={{flexDirection:'row', justifyContent:'left', paddingBottom: 5}}>
                <View style = {{paddingRight: 50}}>
                    <TouchableOpacity onPress={()=> setLoggedIn(false)}>
                        <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 30, fontWeight:"800",color:maroon, textAlign:'center', marginBottom:10}}>
                    Social
                </Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom:20, textAlign:'center', paddingHorizontal:30, justifyContent:'space-between'}}>
                <TouchableOpacity onPress={()=> navigation.navigate('SocialHome')}>
                    <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                       Home
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('SocialExplore')}>
                    <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16, color:maroon}}>
                       Explore
                    </Text>
                </TouchableOpacity> 
                <TouchableOpacity onPress={()=> navigation.navigate('SocialCreate')}>
                    <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                        Create
                    </Text>
                </TouchableOpacity> 
            </View>

            <View style={styles.container}>
                <Text style={styles.text}>User's</Text>
                <FlatList
                    data={AllUsers}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Image
                        source={{ uri: ImagesExample }}
                        style={styles.coverImage}
                        />
                        <View style={styles.metaInfo}>
                        <Text style={styles.title}>{`${item.username}`}</Text>
                        <Text style={styles.subtitle}>{`${item.firstName} ${item.lastName}`}</Text>
                        </View>
                    </View>
                    )}
                />
            </View> 

    </View>
    );
}

const styles = StyleSheet.create({
    root:{
        padding: 30,
    },
    inputView:{
        height: 60,
        backgroundColor: "#F6F6F6",
        borderColor: "#e8e8e8",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10
    },
    inputText:{
        height: 30,
        marginRight: 30,
        padding: 10,
        fontFamily: "Inter-Medium",
        fontWeight: "500",
        fontSize: 18,
        alignContent: 'center',
        textAlign: 'left',
        borderRadius: 8,
        width: 300
    },
    TouchableOpacity:{
        height:40,
        width:'50%',
        borderRadius: 15,
        backgroundColor: '#8D0A0A',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        alignItems: 'center'
      },
      text: {
        fontSize: 20,
        color: '#101010',
        marginTop: 60,
        fontWeight: '700'
      },
      listItem: {
        marginTop: 10,
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        flexDirection: 'row'
      },
      coverImage: {
        width: 100,
        height: 100,
        borderRadius: 8
      },
      metaInfo: {
        marginLeft: 10
      },
      title: {
        fontSize: 18,
        width: 200,
        padding: 10
      },
      subtitle: {
        fontSize: 14,
        width: 200,
        padding: 10
      }
});

export default SocialExplore;