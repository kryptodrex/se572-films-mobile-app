import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, TextInput, Text, View, Alert, ScrollView } from 'react-native';

import AppContext from "../components/AppContext";
import FilmCard from '../components/FilmCard';

const SearchFilmsPage = (props) => {

    const context = useContext(AppContext);

    const [results, setResults] = useState([]);
    const [search, setSearch] = useState('');

    const [searchWarning, setSearchWarning] = useState('');

    useLayoutEffect(() => {
        context.setLogoutButton(props.navigation);
    }, [props.navigation]);

    const handleOnChange = (value) => { // handle search input
        setSearch(value);
      };
    
    useEffect(() => { // set a timeout to wait until the user stops typing
        const timeoutId = setTimeout(() => {
            if (search.length >= 3) {
                console.log(`Searching for: "${search}"`);
                getFilms();
            } else if (search.length > 0 && search.length < 3) {
                setSearchWarning('Search term must be at least 3 characters long');
                setResults([]);
            } else {
                setSearchWarning('');
                setResults([]);
            }
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, [search]);

    const getFilms = () => { // get films from API
        try {
            fetch(context.omdbEndpoint + "&s=" + search, { // fetch films from the OMDB API
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(resp => resp.json())
                .then(results => {
                    if (results.Response == 'True' && results.totalResults > 0) { // if there are any films, continue
                        var resultArray = results.Search.sort((a, b) => a.Year - b.Year);
                        setResults(resultArray);
                    } else { // if no films, show error
                        setResults([]); // clear results
                        setSearchWarning('No films found for search.');
                    }
                });
        } catch (e) {
            Alert.alert("Error: " + e.message);
        }
    }

    return (

        <View style={{flex: 1}}>
            <ScrollView style={styles.container}>

                <View style={styles.container}>
                    {
                        results.length > 0 ?
                            results.reverse().map((item, index) => {
                                return (
                                    <View style={styles.filmItem} key={'view_' + index}>
                                        <FilmCard
                                            key={'film_' + index}
                                            title={item.Title}
                                            releaseYear={item.Year}
                                            posterUrl={item.Poster == "N/A" ? null : item.Poster}
                                            rating={''}
                                            onPress={() => 
                                                props.navigation.navigate('Add Film from Search', {
                                                    filmName: item.Title,
                                                    releaseYear: item.Year,
                                                    posterUrl: item.Poster == "N/A" ? null : item.Poster
                                                })
                                            }
                                        />
                                    </View>
                                );
                            })
                            :
                            <Text style={styles.warningText}>{searchWarning}</Text>
                    }
                </View>

            </ScrollView>
            <View style={styles.footer}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search for a film..."
                    value={search}
                    onChangeText={(value) => 
                        handleOnChange(value)
                    }
                />
            </View>
        </View>

    );

}

// Stylesheet
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        //   flex: 1,
        padding: 20,
        height: '100%',
        backgroundColor: '#fff'
        //   alignItems: 'center',
        //   justifyContent: 'center',
    },
    buttonHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#fff',
    },
    searchBar: {
        // height: 50,
        flex: 1,
        padding: 10,
        borderWidth: 2,
        borderColor: "#4487D6",
        borderRadius: 10,
        width: "100%",
        // marginBottom: 10,
        alignItems: "center",
    },
    warningText: {
        color: "#C70808",
        marginBottom: 20,
        textAlign: "center",
        fontWeight: "bold",
    },
    filmItem: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 20,
    }
});

export default SearchFilmsPage;