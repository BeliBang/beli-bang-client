import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as React from 'react';
import { TextInput, Button } from 'react-native-paper';

export default function LoginScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function Login() {
    console.log({ email, password });
  }

  function clickHere() {
    console.log('here <------------');
  }

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: 'center', height: '50%' }}>
        <View style={[styles.containerEmail, styles.pad90]}>
          <Text style={[{ color: '#FEF5ED' }]}>Email</Text>
          <TextInput value={email} onChangeText={(text) => setEmail(text)} />
        </View>
        <View style={[styles.containerPassword, styles.pad90]}>
          <Text style={[{ color: '#FEF5ED' }]}>Password</Text>
          <TextInput value={password} onChangeText={(text) => setPassword(text)} />
        </View>
      </View>
      <View>
        <Text style={{ textAlign: 'center', fontSize: 25, color: '#FEF5ED' }}>Don't have an account ?</Text>
        <Text style={{ textAlign: 'center', fontSize: 25, marginBottom: 20, color: '#FEF5ED' }}>
          Sign up
          <TouchableOpacity onPress={() => clickHere()}>
            <Text style={[styles.textHere]}> here</Text>
          </TouchableOpacity>
        </Text>
      </View>
      <View style={[styles.pad30]}>
        <Button mode="contained" onPress={() => Login()} style={[styles.buttonLogin]}>
          <Text style={[styles.textLogin]}>Login</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#739072',
  },
  pad90: {
    paddingRight: 90,
    paddingLeft: 90,
  },
  pad30: {
    paddingRight: 230,
    paddingLeft: 230,
  },
  containerEmail: {
    justifyContent: 'center',
  },
  containerPassword: {
    justifyContent: 'center',
  },
  buttonLogin: {
    backgroundColor: '#FEF5ED',
    height: 50,
  },
  textLogin: {
    color: '#739072',
    fontSize: 20,
  },
  textHere: {
    fontSize: 25,
    color: '#FEF5ED',
  },
});
