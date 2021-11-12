import React, { useState, Component } from 'react';
import { StyleSheet, Image, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';

export default class LoginPage extends Component {

  constructor(props) {

    super(props);
    this.state = {
      isLoggedIn: false
    };

    this.onInputChange = this.onInputChange.bind(this);
    // const[username, setUsername] = useState();
    // const[password, setPassword] = useState();
  }

  onInputChange(event) {
    Alert.alert(event);
    // this.setState({
    //   [name]: event
    // });
  }

  handleLogin = () => {
    if (this.state.username === 'admin' && this.state.password === 'admin') {
      this.setState({ isLoggedIn: true });
      Alert.alert('Logged in!');
    } else {
      Alert.alert('Invalid Credentials');
    }
  }

  render() {
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
            value={this.state.username}
            // onChange={this.onInputChange}
            onChangeText={this.onInputChange}
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
            value={this.state.password}
            // onChange={this.onInputChange}
            onChangeText={this.onInputChange}
          />
        </View>

        <CustomButton title="LOGIN" onPress={this.handleLogin}/>


      </View>
    );
  }

}


// Stylesheet
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    // flex: 1,
    width: '80%',
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

  button: {
    width: "80%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    color: "#fff",
    backgroundColor: "#4487D6"
  }
});


// export default Login;