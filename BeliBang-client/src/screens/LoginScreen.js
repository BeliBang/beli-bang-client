import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as React from 'react';
import { TextInput, Button } from 'react-native-paper';
import stylesLib from '../../assets/styles/styles-lib';
import * as SecureStore from 'expo-secure-store';
import iconBB from '../../assets/belibang-CB.png'

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      navigation.navigate('CustomerTab');
    } else {
      console.log('No values stored under that key.');
    }
  }

  getValueFor('access_token');

  function Login() {
    console.log({ email, password });
    // hit login endpoint, jika berhasil akan mengembalikan rolenya, sementara di harcode
    let role = 'Seller';
    if (role === 'Customer') {
      save('access_token', 'abcdasfasdafafdf');
      navigation.navigate('CustomerTab');
    } else {
      navigation.navigate('SellerTab');
      // navigation.navigate('RegisterStore');
    }
  }

  function clickHere() {
    navigation.navigate('RegisterScreen');
  }

  return (
    <View style={styles.container}>
      <View style={[{ marginTop:20 }]}>
        <Image source={iconBB} style={[stylesLib.logo]} />
      </View>
      <View style={{ justifyContent: 'center', height: '50%' }}>
        <View style={[styles.containerEmail, styles.pad90]}>
          <Text style={[stylesLib.colCr, stylesLib.inputLabel, { paddingLeft: 20 }]}>email</Text>
          <TextInput value={email} onChangeText={(text) => setEmail(text)} style={[stylesLib.inputField]} />
        </View>
        <View style={[styles.containerPassword, styles.pad90, {marginTop: 20}]}>
          <Text style={[stylesLib.colCr, stylesLib.inputLabel, { paddingLeft: 20 }]}>password</Text>
          <TextInput value={password} onChangeText={(text) => setPassword(text)} style={[stylesLib.inputField]} />
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
    fontWeight: '900'
  }
});
