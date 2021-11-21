import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppContext from './components/AppContext';
import LoginPage from './views/LoginPage';
// import HomePage from './views/HomePage';
import UserFilmsPage from './views/UserFilmsPage';
import FilmPage from './views/filmPages/FilmPage';
import AddFilmPage from './views/filmPages/AddFilmPage';
import UpdateFilmPage from './views/filmPages/UpdateFilmPage';
import SearchFilmsPage from './views/SearchFilmsPage';
import AddFilmFromSearchPage from './views/filmPages/AddFilmFromSearchPage';

export default function App() {

  const Stack = createNativeStackNavigator();

  const [jwtToken, setToken] = useState('');
  const [username, setUsername] = useState('');

  const setLogoutButton = (nav) => {
    nav.setOptions({
      headerRight: () => (
          <Button
              onPress={() => nav.navigate('Login')}
              title="Logout"
              color="#C70808"
          />
      ),
    });
  }

  const globalProps = {
    token: jwtToken,
    setToken,
    username: username,
    setUsername,
    setLogoutButton,
    apiEndpoint: 'http://10.0.0.38:3001/api/v1', // Endpoint of the local service
    omdbEndpoint: 'https://www.omdbapi.com/?apikey=aa3381be&type=movie' // Endpoint of the OMDb API
  };

  return (
    <AppContext.Provider value={globalProps}>

      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Film Library" component={UserFilmsPage} />
          <Stack.Screen name="Search Films" component={SearchFilmsPage} />
          <Stack.Screen name="Film Details" component={FilmPage} />
          <Stack.Screen name="Add Film" component={AddFilmPage} />
          <Stack.Screen name="Add Film from Search" component={AddFilmFromSearchPage} />
          <Stack.Screen name="Update Film Details" component={UpdateFilmPage} />
        </Stack.Navigator>
      </NavigationContainer>

    </AppContext.Provider>
   
  );
}

// const styles = StyleSheet.create({
//   container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       color: 'black',
//       alignItems: 'center',
//       justifyContent: 'center',
//   },
// });

