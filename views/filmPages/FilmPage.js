import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Image, Text, TextInput, View, TouchableOpacity, Alert, Button } from 'react-native';

import AppContext from "../../components/AppContext";

const FilmPage = (props) => {

    const context = useContext(AppContext);

    const [film, setFilm] = useState();

    useEffect(() => {
        getFilm();
    }, [])

    const getFilm = () => {
        try {
            fetch(context.apiEndpoint + "/films/" + props.filmId, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + context.token
                }
            }).then(resp => resp.json())
                .then(result => {
                    if (result.status == 200) {
                        console.log(result);
                        setFilm(result);
                    } else { // if no films, show error
                        Alert.alert("This film doesn't appear to be in your list!");
                    }
                });
        } catch (e) {
            console.log(e);
            console.log("--------------");
            Alert.alert("Error: " + e.message);
        }
    }

    return (

        <View style={styles.container}>

            <Text>{film.name}</Text>
            <Text>{film.rating}</Text>
            <Text>{film.releaseYear}</Text>

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

export default FilmPage;