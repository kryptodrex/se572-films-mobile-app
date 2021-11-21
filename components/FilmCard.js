import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Rating from './Rating';
import FilmPoster from './FilmPoster';

const FilmCard = (props) => {
    
    const [title, setTitle] = useState(props.title);
    const [releaseYear, setReleaseYear] = useState(props.releaseYear);
    const [posterUrl, setPosterUrl] = useState(props.posterUrl);
    const [rating, setRating] = useState(props.rating);

    const returnRating = () => { // create the Rating component if the rating is not null
        if (rating) {
            return (
                <Rating 
                    style={styles.textItem} 
                    number={rating.split('*').length - 1} 
                />
            )
        }
    }

    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.filmCard} onPress={props.onPress}>
                <FilmPoster style={styles.poster} url={posterUrl} />
                <Text style={[styles.title]}>{title}</Text>
                <Text style={styles.textItem}>{
                        releaseYear ? 
                            "(" + releaseYear + ")"
                            : ""
                    }
                </Text>
                {
                    returnRating()
                }
            </TouchableOpacity>

        </View>
    );

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
        width: "90%",
        padding: 10,
        marginBottom: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10,
        textAlign: "center",
    },
    textItem: {
        marginBottom: 10
    },
    poster: {
        marginTop: 10,
    }
});


export default FilmCard;