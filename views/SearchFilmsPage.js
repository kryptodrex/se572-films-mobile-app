import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, TextInput, Text, View, Button, ScrollView } from 'react-native';

import AppContext from "../components/AppContext";
import FilmCard from '../components/FilmCard';

const SearchFilmsPage = (props) => {

    const context = useContext(AppContext);

    const [results, setResults] = useState([]);
    const [search, setSearch] = useState('');

    const [searchWarning, setSearchWarning] = useState('');

    const handleOnChange = (value) => {
        setSearch(value);
      };
    
    useEffect(() => {
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

    const getFilms = () => {
        try {
            fetch(context.omdbEndpoint + "&s=" + search, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(resp => resp.json())
                .then(results => {
                    // console.log(results);
                    if (results.Response == 'True' && results.totalResults > 0) { // if there are any films, continue
                        // console.log(results);
                        var resultArray = results.Search.sort((a, b) => a.Year - b.Year);
                        setResults(resultArray);
                    } else { // if no films, show error
                        setResults([]);
                        setSearchWarning('No films found for search.');
                    }
                });
        } catch (e) {
            console.log(e);
            console.log("--------------");
            alert("Error: " + e.message);
        }
    }

    return (

        <ScrollView style={styles.container}>

            <View style={styles.buttonHeader}>
                <Button title="Logout" color="#C70808"
                    onPress={() => context.logoutUser(props.navigation)}
                />
            </View>

            <TextInput
                style={styles.searchBar}
                placeholder="Search for a film..."
                value={search}
                onChangeText={(value) => 
                    handleOnChange(value)
                }
                // onChange={handleOnChange} value={search}
            />

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
                                        posterUrl={item.Poster}
                                        rating={''}
                                    />
                                    <Button 
                                        title="Add to Library" 
                                        onPress={() => 
                                            props.navigation.navigate('Add Film from Search', {
                                                filmName: item.Title,
                                                releaseYear: item.Year,
                                                posterUrl: item.Poster
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
    searchBar: {
        // height: 50,
        flex: 1,
        padding: 10,
        borderWidth: 2,
        borderColor: "#4487D6",
        borderRadius: 10,
        width: "100%",
        marginBottom: 10,
        marginTop: 20,
        alignItems: "center",
    },
    warningText: {
        color: "#C70808",
        marginBottom: 20
    },
    filmItem: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 40,
    }
});

export default SearchFilmsPage;