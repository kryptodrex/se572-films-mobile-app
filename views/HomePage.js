import React, { useState, useContext } from 'react';
import { StyleSheet, Image, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';

import CustomButton from '../components/CustomButton';
import FilmCard from '../components/FilmCard';

import AppContext from "../components/AppContext";

const HomePage = ({ navigation }) => {

    const context = useContext(AppContext);

    // const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = (search) => {
        // setSearch(search);
        console.log(search);
        if (search.length > 3) {
            try {
                fetch(context.omdbEndpoint + "&s=" + search, {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then(resp => resp.json())
                    .then(results => {
                        if (results.Search.length > 0) { // if there are any films, continue
                            console.log(results.Search);
                            setResults(results.Search);
                        } else { // if no films, show error
                            setResults([]);
                            Alert.alert("No results found");
                        }
                    });
            } catch (e) {
                console.log(e);
                console.log("--------------");
                alert("Error: " + e.message);
            }
        }
    }

    return (

        <View style={styles.container}>

            {/* <CustomButton title="Login" onPress={() => navigation.navigate('Login')} /> */}
            <CustomButton title="Login" onPress={() => navigation.navigate('Login')} />

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Search for films..."
                    placeholderTextColor="#003f5c"
                    name="search"
                    type="text"
                    // value={search}
                    onChangeText={search => handleSearch(search)}
                />
            </View>

            <View>
                {results.map((item, index) => {
                    return (
                        // <Text key={index}>{item.Title}</Text>
                        <FilmCard key={index} film={item} />
                    );
                })}
            </View>

            {/* <Text>
                Welcome {context.username}!
            </Text> */}

        </View>

    );

}

// Stylesheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    inputView: {
        borderWidth: 2,
        borderColor: "#4487D6",
        borderRadius: 10,
        width: "100%",
        height: 45,
        marginBottom: 20
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10
    },

});

export default HomePage;