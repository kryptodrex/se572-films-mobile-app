import React, { useState, useContext, useEffect, useLayoutEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, RefreshControl, Alert } from 'react-native';

import AppContext from "../components/AppContext";
import FilmCard from '../components/FilmCard';

const UserFilmsPage = (props) => {

    const context = useContext(AppContext);

    const [results, setResults] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const wait = (timeout) => { // wait function
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = useCallback(() => { // function to call when user pulls down to refresh
        setRefreshing(true);
        wait(500).then(() => {
            getUserFilms();
            setRefreshing(false);
        });
    }, []);

    useLayoutEffect(() => { // function to call when user navigates to this page
        context.setLogoutButton(props.navigation);
    }, [props.navigation]);

    useEffect(() => { // function to call when user navigates to this page
        getUserFilms();
        const willFocusSubscription = props.navigation.addListener('focus', () => {
            getUserFilms();
        });
        return willFocusSubscription;
    }, [])

    const getUserFilms = () => { // function to get user's films from API
        setResults([]);
        try {
            fetch(context.apiEndpoint + "/films?limit=1000", {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + context.token
                }
            }).then(resp => resp.json())
                .then(results => {
                    if (results.total > 0) { // if there are any films, continue
                        setResults(results.data.reverse());
                    } else { // if no films, show error
                        setResults([]);
                    }
                });
        } catch (e) {
            Alert.alert("Error: " + e.message);
        }
    }

    return (

        <View style={{flex: 1}}>
            <ScrollView
                style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View style={styles.container}>
                    {
                        results.length > 0 ?
                            results.map((item) => {
                                return (
                                    <FilmCard
                                        key={item._id}

                                        title={item.name}
                                        releaseYear={item.releaseYear}
                                        posterUrl={item.posterUrl}
                                        rating={item.rating}

                                        onPress={() => {
                                            props.navigation.navigate('Film Details', { id: item._id });
                                        }
                                        }
                                    />
                                );
                            })
                            :
                            <Text style={styles.warningText}>Looks like you haven't added any films yet. Try adding some!</Text>
                    }
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <Button title="Search Films" onPress={() => props.navigation.navigate('Search Films')} />
                <Button title="Add Film" onPress={() => props.navigation.navigate('Add Film')} />
            </View>
        </View>

    );

}

// Stylesheet
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        padding: 20,
        height: '100%',
        backgroundColor: '#fff'
    },
    footer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#fff',
    },
    warningText: {
        color: "#C70808",
        marginBottom: 20,
        textAlign: "center",
        fontWeight: "bold",
    }
});

export default UserFilmsPage;