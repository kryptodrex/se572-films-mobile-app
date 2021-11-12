import React from 'react';
import { Text, TextInput, View, Button } from 'react-native';

import styles from '../styles/mainStyles';

const Login = () => {
  return (
    <View>
      <Text>Login to see your films</Text>
      <TextInput placeholder="Username" />
      <TextInput placeholder="Password" type="password" />
      <Button title="Login" />
    </View>
  );
}

export default Login;