import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Image, Text, TextInput, View, Alert, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import AppContext from "../../components/AppContext";

const AddFilmPage = ( {navigation} ) => {

    const context = useContext(AppContext);

    const [filmName, setFilmName] = useState('');
    const [rating, setRating] = useState('*****');
    const [releaseYear, setReleaseYear] = useState();
    const [posterUrl, setPosterUrl] = useState();

    const addFilm = () => {
        if (filmName.trim() != '') {

            let filmData = { // create an object for the film's data elements
                name: filmName,
                rating: rating,
                releaseYear: releaseYear,
                posterUrl: posterUrl
            }

            try {
                fetch(context.apiEndpoint + "/films", {
                    method: "POST",
                    body: JSON.stringify(filmData),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + context.token
                    }
                }).then(resp => resp.json())
                    .then(resp => {
                        if (resp.status == 201) {
                            setFilmName(''); // clear input
                            setRating('*****');
                            setReleaseYear();
                            setPosterUrl();
                            Alert.alert("Your film was added!" ); // show alert for the film added
                            
                            navigation.navigate('Film Library'); // navigate back to the film library
                        } else {
                            Alert.alert(resp.status + " error: " + resp.message);
                        }
                });
            } catch (e) {
                console.log(e);
                console.log("--------------");
                alert("Error: " + e.message);
            }
        } else {
            if (filmName.trim() == "") {
                setFilmName(''); // clear the blank input
                Alert.alert("Enter a film title first!"); // alert user if no film was entered
            } else {
                Alert.alert("Something is wrong with your input. Please check it out.");
            }
        }
    }

    return (

        <View style={styles.container}>

            <TextInput 
                style={styles.textInput}
                placeholder="Film Title"
                name="filmName"
                type="text"
                value={filmName}
                onChangeText={(filmName) => setFilmName(filmName)}
            />

            <Picker
                selectedValue={rating}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) => setRating(itemValue)}
                prompt="Select the rating to give the film"
            >
                <Picker.Item label="*****" value="*****" />
                <Picker.Item label="****" value="****" />
                <Picker.Item label="***" value="***" />
                <Picker.Item label="**" value="**" />
                <Picker.Item label="*" value="*" />
            </Picker>

            <TextInput 
                style={styles.textInput}
                placeholder="Release Year"
                name="releaseYear"
                type="number"
                min="1800"
                max="9999"
                value={releaseYear}
                onChangeText={(releaseYear) => setReleaseYear(releaseYear)}
            />

            {/* <TextInput 
                style={styles.textInput}
                placeholder="URL to Poster"
                name="posterUrl"
                type="text"
                value={posterUrl}
                onChangeText={(posterUrl) => setPosterUrl(posterUrl)}
            /> */}

            <Button title="Add to Library" onPress={addFilm} />


        </View>

    );

}

// Stylesheet
const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      padding: 20,
    //   height: '100%',
      backgroundColor: '#fff'
    //   alignItems: 'center',
    //   justifyContent: 'center',
    },

    textInput: {
        height: 50,
        flex: 1,
        padding: 10,
        borderWidth: 2,
        borderColor: "#4487D6",
        borderRadius: 10,
        width: "100%",
        marginBottom: 20,
        alignItems: "center",
    },

});

export default AddFilmPage;