import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppContext from './components/AppContext';
import LoginPage from './views/LoginPage';
import HomePage from './views/HomePage';
import UserFilmsPage from './views/UserFilmsPage';

export default function App() {

  const Stack = createNativeStackNavigator();

  const [jwtToken, setToken] = useState('');
  const [username, setUsername] = useState('');

  const globalProps = {
    token: jwtToken,
    setToken,
    username: username,
    setUsername
  };

  return (
    <AppContext.Provider value={globalProps}>

      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Films" component={UserFilmsPage} />
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

