import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, ScrollView, TextInput, Alert, Button, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import AppContext from "../../components/AppContext";

const AddFilmPage = ( props ) => {

    const context = useContext(AppContext);

    const [filmName, setFilmName] = useState('');
    const [rating, setRating] = useState('*****');
    const [releaseYear, setReleaseYear] = useState('');
    // const [posterUrl, setPosterUrl] = useState();
    const [notes, setNotes] = useState('');

    const addFilm = () => {
        if (filmName.trim() != '' && releaseYear.trim() != '') {

            let filmData = { // create an object for the film's data elements
                name: filmName,
                rating: rating,
                releaseYear: parseInt(releaseYear),
                // posterUrl: posterUrl,
                notes: notes
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
                            // setPosterUrl();
                            setNotes('');
                            Alert.alert("Your film was added!" ); // show alert for the film added
                            
                            props.navigation.navigate('Film Library'); // navigate back to the film library
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
            } else if (releaseYear.trim() == "") {
                setReleaseYear(''); // clear the blank input
                Alert.alert("Enter a release year first!"); // alert user if no release year was entered
            } else {
                Alert.alert("Something is wrong with your input. Please check it out.");
            }
        }
    }

    return (

        <ScrollView style={styles.container}>

            <Text>Enter the film title: *</Text>
            <TextInput 
                style={styles.textInput}
                placeholder="Ex: Hocus Pocus"
                name="filmName"
                type="text"
                value={filmName}
                required="true"
                onChangeText={(filmName) => setFilmName(filmName)}
            />

            <Text>Rate it from 1 to 5 stars: *</Text>
            <Picker
                selectedValue={rating}
                // style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) => setRating(itemValue)}
                prompt="Select the rating to give the film"
            >
                <Picker.Item label="*****" value="*****" />
                <Picker.Item label="****" value="****" />
                <Picker.Item label="***" value="***" />
                <Picker.Item label="**" value="**" />
                <Picker.Item label="*" value="*" />
            </Picker>

            <Text>Enter the year it was released: *</Text>
            <TextInput 
                style={styles.textInput}
                placeholder="Ex: 1993"
                name="releaseYear"
                type="text"
                maxLength={4}
                value={releaseYear}
                onChangeText={(releaseYear) => setReleaseYear(releaseYear)}
            />

            <Text>Add some notes about the film:</Text>
            <TextInput 
                style={styles.textInput}
                placeholder="Ex: It's a good movie!"
                name="notes"
                type="text"
                multiline={true}
                numberOfLines={10}
                value={notes}
                onChangeText={(notes) => setNotes(notes)}
            />

            <Text style={styles.warningText}>(* = Required)</Text>

            <Button title="Add to Library" onPress={addFilm} />


        </ScrollView>

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
        // height: 50,
        flex: 1,
        padding: 10,
        borderWidth: 2,
        borderColor: "#4487D6",
        borderRadius: 10,
        width: "100%",
        marginBottom: 20,
        alignItems: "center",
    },

    warningText: {
        color: "#C70808",
        marginBottom: 20
    }

});

export default AddFilmPage;