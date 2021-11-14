import React, { useState, useContext } from 'react';
import { StyleSheet, Image, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';
import CryptoJS from 'crypto-js';

import AppContext from "../components/AppContext";

const HomePage = (props) => {

    const context = useContext(AppContext);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (

        <View style={styles.container}>

            <Text>
                Welcome {context.username}!
            </Text>

        </View>

    );

}

// Stylesheet
const styles = StyleSheet.create({
    container: {
      // display: 'flex',
      flex: 1,
      padding: 20,
      // width: '80%',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

});

export default HomePage;