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
        // console.log("Film Id clicked: " + route.params.id);
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
                        var updatedOn = 
                            result.updatedOn ? 
                                result.updatedOn.split('T')[0]
                                : 'Not updated yet';

                        setFilm({
                            id: result._id,
                            title: result.name,
                            rating: result.rating,
                            ratingNum: result.rating.split('*').length - 1,
                            releaseYear: result.releaseYear.toString(),
                            notes: result.notes,
                            updatedOn: updatedOn,
                            insertedOn: result.insertedOn.split('T')[0]
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

    const deleteFilm = () => { 
        try {
            fetch(context.apiEndpoint + "/films/" + film.id, {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + context.token
                }
            }).then(resp => resp.json())
                .then(result => {
                    if (result.status == 200) {
                        Alert.alert(result.message);
                        navigation.goBack();
                    } else {
                        Alert.alert("Error: " + result.message);
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

            <View style={styles.buttonHeader}>
                <Button title="Edit" onPress={() => 
                    navigation.navigate('Update Film Details', { 
                            filmName: film.title,
                            rating: film.rating,
                            releaseYear: film.releaseYear,
                            notes: film.notes,
                            filmId: film.id
                        })
                    } 
                />
                <Button color="#C70808" title="Delete" onPress={() => deleteFilm()} />
            </View>

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

            <Text style={[styles.bold]}>Last updated:</Text>
            <Text style={[styles.textItem]}>{film.updatedOn}</Text>

            <Text style={[styles.bold]}>Added on:</Text>
            <Text style={[styles.textItem]}>{film.insertedOn}</Text> 

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
    },
    buttonHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

export default FilmPage;