import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const FilmCard = (props) => {
    // constructor(props) {
    //     super(props);
    // }

    // handlePress = () => {
    //     // Need to check to prevent null exception. 
    //     this.props.onPress?.(); // Same as this.props.onPress && this.props.onPress();
    // }

    // render() {

    return (
        <View style={styles.container}>

            {/* <Image source={{uri: props.film.Poster}} style={{width: 400, height: 400}} /> */}
            <Text>
                {
                    props.film.releaseYear ?
                        props.film.name + " (" + props.film.releaseYear + ")"
                        :
                        props.film.name
                }
            </Text>

        </View>
    );

    // }

}


// Stylesheet
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        
        borderColor: "#4487D6",
        borderRadius: 10,
    },
    filmCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }
});


export default FilmCard;