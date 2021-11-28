import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

const Rating = (props) => {

    return (
        <View style={[props.style, styles.container]}>
            {[...Array(props.number)].map(
                (value, index) => (
                    <Image style={styles.icon} key={index} source={require('../assets/star.png')} />
                )
            )}
        </View>
        
    );
}


// Stylesheet
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row'
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 5
    },
});


export default Rating;