import React, { useState, Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default class CustomButton extends Component {

    constructor(props) {
        super(props);
    }

    handlePress = () => {
        // Need to check to prevent null exception. 
        this.props.onPress?.(); // Same as this.props.onPress && this.props.onPress();
    }

    render() {
        return (
            <TouchableOpacity onPress={this.handlePress} style={styles.button}>
                <Text style={styles.buttonText}>{this.props.title}</Text>
            </TouchableOpacity>
        );
    }

}


// Stylesheet
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        // flex: 1,
        width: '80%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: "80%",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        color: "#fff",
        backgroundColor: "#4487D6"
    },
    buttonText: {
        color: "#fff"
    }
});


// export default CustomButton;