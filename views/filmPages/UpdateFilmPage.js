import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Image, Text, TextInput, View, TouchableOpacity, Alert, Button } from 'react-native';

import AppContext from "../../components/AppContext";

const UpdateFilmPage = (props) => {

    const context = useContext(AppContext);

    const [film, setFilm] = useState(null);

    return (

        <View style={styles.container}>

            

        </View>

    );

}

// Stylesheet
const styles = StyleSheet.create({
    container: {
      display: 'flex',
    //   flex: 1,
      padding: 20,
      height: '100%',
      backgroundColor: '#fff'
    //   alignItems: 'center',
    //   justifyContent: 'center',
    },

});

export default UpdateFilmPage;