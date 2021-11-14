import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Image, Text, TextInput, View, TouchableOpacity, Alert, Button } from 'react-native';
import CustomButton from '../components/CustomButton';

import AppContext from "../components/AppContext";
import FilmCard from '../components/FilmCard';

const UserFilmsPage = (props) => {

    const context = useContext(AppContext);

    const [results, setResults] = useState([]);

    useEffect(() => {
        getUserFilms();
    }, [])

    const getUserFilms = () => {
        try {
            fetch(context.apiEndpoint + "/films", {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + context.token
                }
            }).then(resp => resp.json())
                .then(results => {
                    if (results.total > 0) { // if there are any films, continue
                        console.log(results);
                        setResults(results.data);
                    } else { // if no films, show error
                        setResults([]);
                        // Alert.alert("No films found! Try adding some to your list.");
                    }
                });
        } catch (e) {
            console.log(e);
            console.log("--------------");
            alert("Error: " + e.message);
        }
    }

    return (

        <View style={styles.container}>

            <Button title="Add Film" onPress={() => props.navigation.navigate('Add a Film')} />

                {
                    results.length > 0 ?
                        results.map((item) => {
                            return (
                                // <Text key={index}>{item.Title}</Text>
                                <FilmCard key={item._id} film={item} onPress={
                                    () => {
                                        props.navigation.navigate('Film Details', { filmId: item._id });
                                    }
                                }/>
                            );
                        })
                        :
                        <Text>Looks like you haven't added any films yet. Try adding some!</Text>
                }

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

export default UserFilmsPage;