import React, { useState } from 'react';
import { StyleSheet, Image, Text, TextInput, View, Button } from 'react-native';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <View style={styles.container}>
      {/* <Image style={styles.image} source={require('../assets/clapboard-icon.png')} /> */}
      <Text>Login to see your films</Text>

      <View style={styles.inputView}>
        <TextInput 
          style={styles.TextInput}
          placeholder="Username" 
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput 
          style={styles.TextInput}
          secureTextEntry={true}
          placeholder="Password" 
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      
      
      <Button title="Login" />
    </View>
  );
}


// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
   },
   
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  }

  // image: {
  //   width: 19
  // }
});


export default Login;