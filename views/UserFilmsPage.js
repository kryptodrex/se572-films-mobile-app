import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Image, Text, View, Button, ScrollView } from 'react-native';

import AppContext from "../components/AppContext";
import FilmCard from '../components/FilmCard';

const UserFilmsPage = (props) => {

    const context = useContext(AppContext);

    const [results, setResults] = useState([]);

    useEffect(() => {
        getUserFilms();
        const willFocusSubscription = props.navigation.addListener('focus', () => {
            getUserFilms();
        });
        return willFocusSubscription;
    }, [])

    const getUserFilms = () => {
        try {
            fetch(context.apiEndpoint + "/films?limit=100", {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + context.token
                }
            }).then(resp => resp.json())
                .then(results => {
                    if (results.total > 0) { // if there are any films, continue
                        // console.log(results);
                        setResults(results.data);
                    } else { // if no films, show error
                        setResults([]);
                        // Alert.alert("No films found! Try adding some to your list.");
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
                <Button title="Logout" onPress={() => context.logoutUser(props.navigation)} />
                <Button title="Reload" onPress={() => getUserFilms()} />
                <Button title="Add Film" onPress={() => props.navigation.navigate('Add Film')} />
            </View>

            <View style={styles.container}>
                {
                    results.length > 0 ?
                        results.reverse().map((item) => {
                            return (
                                <FilmCard
                                    key={item._id}
                                    film={item} onPress={() => {
                                        props.navigation.navigate('Film Details', { id: item._id });
                                    }
                                    } />
                            );
                        })
                        :
                        <Text style={styles.warningText}>Looks like you haven't added any films yet. Try adding some!</Text>
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
    warningText: {
        color: "#C70808",
        marginBottom: 20
    }
});

export default UserFilmsPage;