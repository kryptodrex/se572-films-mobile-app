import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

const FilmPoster = (props) => {
    
    const returnPosterImg = () => {
        if (props.url) {
            return (
                <Image source={{uri: props.url}} style={[styles.poster, props.style]} />
            );
        }
    }

    return (
        <View>
            {
                returnPosterImg()
            }
        </View>
    );

}


// Stylesheet
const styles = StyleSheet.create({
    poster: {
        width: 200,
        height: 300,
        borderWidth: 2,
        borderRadius: 10,
    }
});


export default FilmPoster;