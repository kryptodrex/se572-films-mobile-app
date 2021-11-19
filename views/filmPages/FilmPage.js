import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, Button } from 'react-native';

import AppContext from "../../components/AppContext";
import Rating from '../../components/Rating';

const FilmPage = ({navigation, route}) => {

    const context = useContext(AppContext);

    const [film, setFilm] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        getFilm();
    }, [])

    const getFilm = () => {
        console.log("Film Id clicked: " + route.params.id);
        try {
            fetch(context.apiEndpoint + "/films/" + route.params.id, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + context.token
                }
            }).then(resp => resp.json())
                .then(result => {
                    if (result._id) {
                        // console.log(result);
                        setFilm({
                            id: result._id,
                            title: result.name,
                            rating: result.rating,
                            ratingNum: result.rating.split('*').length - 1,
                            releaseYear: result.releaseYear,
                            notes: result.notes
                        });
                    } else { // if no films, show error
                        setError(result.message);
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

            <Button title="Edit" onPress={() => 
                navigation.navigate('Update your Film', { 
                        filmName: film.title,
                        rating: film.rating,
                        releaseYear: film.releaseYear,
                        notes: film.notes,
                        filmId: film.id
                    })
                } 
            />

            <Text style={[styles.title, styles.bold]}>{film.title}</Text>
            <Text style={[styles.textItem]}>{film.releaseYear ? film.releaseYear : ''}</Text>

            <View style={styles.ratingBox}>
                <Text style={styles.bold}>Your rating:  </Text>
                <Rating style={styles.textItem} number={film.ratingNum} />
            </View>
            
            <View>
                <Text style={styles.bold}>Your notes:</Text>
                <Text style={styles.textItem}>{film.notes ? film.notes : "No notes yet!"}</Text>
            </View>
            

            

        </View>

    );

}

// Stylesheet
const styles = StyleSheet.create({
    container: {
      display: 'flex',
      padding: 20,
      height: '100%',
      backgroundColor: '#fff'
    },
    bold: {
        fontWeight: 'bold'
    },
    title: {
        fontSize: 20,
        marginTop: 20
    },
    ratingBox: {
        display: 'flex',
        flexDirection: 'row',
    },
    textItem: {
        marginBottom: 20
    }
});

export default FilmPage;