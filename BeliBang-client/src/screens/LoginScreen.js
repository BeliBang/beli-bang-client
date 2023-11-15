import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as React from 'react';
import { TextInput, Button } from 'react-native-paper';
import stylesLib from '../../assets/styles/styles-lib';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const dispatch = useDispatch();
  const users = useSelector((state) => {
    console.log(state, '<<<<<<<<');
    return state.users;
  });

  console.log(users, '<<<<<<<<');
  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then((res) => {
        if (!res.ok) throw new Error('Something wrong!');
        return res.json();
      })
      .then((users) => {
        dispatch({
          type: 'users/fetch',
          payload: users,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function Login() {
    console.log({ email, password });

    navigation.navigate('CustomerTab');
  }

  function clickHere() {
    console.log('here <------------');
    navigation.navigate('RegisterScreen');
  }

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: 'center', height: '50%' }}>
        <View style={[styles.containerEmail, styles.pad90]}>
          <Text style={[stylesLib.colCr, { fontSize: 25, paddingLeft: 20, marginBottom: 10 }]}>email</Text>
          <TextInput value={email} onChangeText={(text) => setEmail(text)} style={[styles.inputField]} />
        </View>
        <View style={[styles.containerPassword, styles.pad90, { marginTop: 20 }]}>
          <Text style={[stylesLib.colCr, styles.inputLabel, { paddingLeft: 20 }]}>password</Text>
          <TextInput value={password} onChangeText={(text) => setPassword(text)} style={[styles.inputField]} />
        </View>
      </View>
      <View>
        <Text style={[{ textAlign: 'center', fontSize: 25 }, stylesLib.colCr]}>Don't have an account ?</Text>
      </View>
      <View style={[{ flexDirection: 'row', justifyContent: 'center' }]}>
        <Text style={[{ textAlign: 'center', fontSize: 25, marginBottom: 20 }, stylesLib.colCr]}>Sign up</Text>
        <TouchableOpacity onPress={() => clickHere()} style={[styles.textHere, { marginLeft: 9 }]}>
          <Text style={[styles.textHere]}>here</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.pad30]}>
        <Button mode="contained" onPress={() => Login()} style={[styles.buttonLogin]} labelStyle={[stylesLib.colGrLight, { fontSize: 22 }]}>
          Login
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
    paddingRight: 50,
    paddingLeft: 50,
  },
  pad30: {
    alignItems: 'center',
  },
  containerEmail: {
    justifyContent: 'center',
  },
  containerPassword: {
    justifyContent: 'center',
  },
  buttonLogin: {
    backgroundColor: '#FEF5ED',
  },
  textLogin: {
    color: '#739072',
    fontSize: 25,
    padding: 0,
    fontWeight: '800',
    backgroundColor: 'red',
    height: 30,
  },
  textHere: {
    fontSize: 25,
    color: '#FEF5ED',
    textDecorationLine: 'underline',
    fontWeight: '900',
  },
  inputField: {
    height: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderRadius: 20,
  },
  inputLabel: {
    fontSize: 25,
    marginBottom: 10,
  },
});
