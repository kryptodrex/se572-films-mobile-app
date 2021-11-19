import React, { useState, useContext } from 'react';
import { StyleSheet, Image, Text, TextInput, View, Button, Alert } from 'react-native';
import CryptoJS from 'crypto-js';

// import { API_ENDPOINT } from '@env';
import CustomButton from '../components/CustomButton';
import AppContext from "../components/AppContext";

const LoginPage = ( props ) => {

  const context = useContext(AppContext);

  const [password, setPassword] = useState('');
  // if (props.route.params.pw !== undefined) {
  //   setPassword('');
  // }

  const handleLogin = (option) => {
    var isNew;
    if (option == 2) {
        isNew = '?isNew=true';
    } else {
        isNew = '';
    }

    if (context.username.trim() != "" && password.trim() != "") {
      var pw = CryptoJS.SHA256(password.trim()).toString();
      try { // try to login and get data
        fetch(context.apiEndpoint + "/login" + isNew, { // get the token for the user
          method: 'POST',
          body: JSON.stringify({
            username: context.username,
            password: pw
          }),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }).then(resp => resp.json())
          .then(data => {
            if (data.status == 200 || data.status == 201) { // if the response is successful
              
              context.setToken(data.token);

              // Alert.alert(data.token);

              if (data.status == 200) { // if the user is returning
                Alert.alert("Welcome back " + context.username + "!");
              }
              if (data.status == 201) { // if the user is new
                Alert.alert("Welcome to the site, " + context.username + "!");
              }

              props.navigation.navigate('Film Library'); // navigate to the home page

            } else { // if there is some error, like user is not found in DB
              Alert.alert(data.status + " error: " + data.message);
            }
          })
      } catch (e) {
        // console.log(e);
        // console.log("--------------");
        Alert.alert("Error: " + e.message);
      }
    } else {
      context.setUsername('');
      setPassword('');
      Alert.alert('Username and/or password field cannot be blank!');
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.logoContainer}>
        <Image style={styles.image} source={require('../assets/clapboard-icon.png')} />
        <Text style={styles.title}>Film Library</Text>
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="#003f5c"
          name="username"
          type="text"
          value={context.username}
          onChangeText={context.setUsername}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          name="password"
          type="text"
          value={password}
          onChangeText={password => setPassword(password)}
        />
      </View>

      <Button title="LOGIN" onPress={() => handleLogin(1)} />

      <View>
        <Text
          style={styles.textView}
          name="newUserText"
          type="text"
          onPress={() => handleLogin(2)}
        >
          Create new user instead?
        </Text>
      </View>


    </View>
  );
}

// }


// Stylesheet
const styles = StyleSheet.create({
  container: {
    // display: 'flex',
    flex: 1,
    padding: 20,
    // width: '80%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 50
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  inputView: {
    borderWidth: 2,
    borderColor: "#4487D6",
    borderRadius: 10,
    width: "100%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  textView: {
    marginTop: 10,
    color: 'black',
    fontWeight: 'bold'
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    // marginLeft: 10,
  },

  image: {
    width: 95,
    height: 100,
    marginBottom: 20
  },

  // button: {
  //   width: "80%",
  //   borderRadius: 10,
  //   height: 50,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   marginTop: 40,
  //   color: "#fff",
  //   backgroundColor: "#4487D6"
  // }
});


export default LoginPage;