import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppContext from './components/AppContext';
import LoginPage from './views/LoginPage';
// import HomePage from './views/HomePage';
import UserFilmsPage from './views/UserFilmsPage';
import FilmPage from './views/filmPages/FilmPage';
import AddFilmPage from './views/filmPages/AddFilmPage';
import UpdateFilmPage from './views/filmPages/UpdateFilmPage';

export default function App() {

  const Stack = createNativeStackNavigator();

  const [jwtToken, setToken] = useState('');
  const [username, setUsername] = useState('');

  const globalProps = {
    token: jwtToken,
    setToken,
    username: username,
    setUsername,
    apiEndpoint: 'http://10.0.0.38:3001/api/v1',
    omdbEndpoint: 'https://www.omdbapi.com/?apikey=aa3381be&type=movie'
  };

  return (
    <AppContext.Provider value={globalProps}>

      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginPage} />
          {/* <Stack.Screen name="Film Search" component={HomePage} /> */}
          <Stack.Screen name="Film Library" component={UserFilmsPage} />
          <Stack.Screen name="Film Details" component={FilmPage} />
          <Stack.Screen name="Add a Film" component={AddFilmPage} />
          <Stack.Screen name="Update Film" component={UpdateFilmPage} />
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

