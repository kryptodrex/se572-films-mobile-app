import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Rating from './Rating';

const FilmCard = (props) => {
    // constructor(props) {
    //     super(props);
    // }

    // const handlePress = () => {
    //     console.log('FilmCard pressed');
    //     // Need to check to prevent null exception. 
    //     props.onPress?.(); // Same as this.props.onPress && this.props.onPress();
    // }

    // render() {

    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.filmCard} onPress={props.onPress}>
                {/* <Image source={{uri: props.film.Poster}} style={{width: 400, height: 400}} /> */}
                <Text style={styles.textItem}>{props.film.name}</Text>
                <Text style={styles.textItem}>{
                        props.film.releaseYear ? 
                            "(" + props.film.releaseYear + ")"
                            : ""
                    }
                </Text>
                <Rating 
                    style={styles.textItem} 
                    number={props.film.rating.split('*').length - 1} 
                />
            </TouchableOpacity>

        </View>
    );

    // }

}


// Stylesheet
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: "#4487D6",
        borderRadius: 10,
    },
    filmCard: {
        borderWidth: 2,
        borderColor: "#4487D6",
        borderRadius: 10,
        width: "100%",
        padding: 10,
        marginBottom: 20,
        alignItems: "center",
    },
    textItem: {
        marginBottom: 10
    },
});


export default FilmCard;