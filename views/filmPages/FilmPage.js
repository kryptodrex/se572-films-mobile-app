import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Alert, Button, Modal } from 'react-native';

import AppContext from "../../components/AppContext";
import Rating from '../../components/Rating';
import FilmPoster from '../../components/FilmPoster';

const FilmPage = ({ navigation, route }) => {

    const context = useContext(AppContext);

    const [film, setFilm] = useState({});
    const [error, setError] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    useLayoutEffect(() => {
        context.setLogoutButton(navigation);
    }, [navigation]);

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

                        var releaseYear =
                            result.releaseYear ?
                                result.releaseYear.toString()
                                : '';

                        setFilm({
                            id: result._id,
                            title: result.name,
                            rating: result.rating,
                            ratingNum: result.rating.split('*').length - 1,
                            releaseYear: releaseYear,
                            posterUrl: result.posterUrl,
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
            Alert.alert("Error: " + e.message);
        }
    }

    return (

        <View style={{ flex: 1 }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Are you sure you want to delete this film?</Text>
                        <View style={styles.modalButtons}>
                            <Button title="Yes" color="#C70808" onPress={() => {
                                deleteFilm();
                                setModalVisible(!modalVisible);
                            }} />
                            <Button title="No" onPress={() => setModalVisible(!modalVisible)} />
                        </View>
                    </View>
                </View>
            </Modal>

            <ScrollView style={styles.container}>

                <View style={styles.filmPoster}>
                    <FilmPoster url={film.posterUrl} />
                </View>

                <Text style={[styles.title, styles.bold]}>{film.title}</Text>
                <Text style={[styles.textItem]}>{film.releaseYear ? film.releaseYear : ''}</Text>

                <View style={styles.ratingBox}>
                    <Text style={styles.bold}>Your rating:  </Text>
                    <Rating style={styles.textItem} number={film.ratingNum} />
                </View>

                <View style={styles.textItem}>
                    <Text style={styles.bold}>Your notes:</Text>
                    <Text>{film.notes ? film.notes : "No notes yet!"}</Text>
                </View>

                <View style={styles.textItem}>
                    <Text style={[styles.bold]}>Last updated:</Text>
                    <Text>{film.updatedOn}</Text>
                </View>

                <View style={styles.textItem}>
                    <Text style={[styles.bold]}>Added on:</Text>
                    <Text>{film.insertedOn}</Text>
                </View>

                <View style={styles.textItem}></View>

            </ScrollView>
            <View style={styles.footer}>
                <Button title="Edit" onPress={() =>
                    navigation.navigate('Update Film Details', {
                        filmName: film.title,
                        rating: film.rating,
                        releaseYear: film.releaseYear,
                        posterUrl: film.posterUrl,
                        notes: film.notes,
                        filmId: film.id
                    })
                }
                />
                <Button color="#C70808" title="Delete"
                    // onPress={() => deleteFilm()} 
                    onPress={() => setModalVisible(true)}
                />
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
    },
    footer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#fff',
    },
    filmPoster: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 20
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: 'bold'
    },
    modalButtons: {
        display: 'flex',
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'space-evenly',
    }
});

export default FilmPage;