import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as React from 'react';
import { TextInput, Button } from 'react-native-paper';
import stylesLib from '../../assets/styles/styles-lib';
import { useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import iconBB from '../../assets/belibang-CB.png';
import { login } from '../../store/actions/actionCreator';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [hidePass, setHidePass] = React.useState(true);
  const dispatch = useDispatch();

  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result === 'Customer') {
      navigation.navigate('CustomerTab');
    } else if (result === 'Seller') {
      navigation.navigate('SellerTab');
    } else {
      console.log('No values stored under that key.');
    }
  }

  getValueFor('role');

  async function saveAccessToken(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  async function saveRole(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  async function saveUserId(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  const inputForm = {
    email,
    password,
  };

  function clickLogin() {
    dispatch(login(inputForm))
      .then((payload) => {
        saveAccessToken('access_token', payload.access_token);
        saveRole('role', payload.role);
        saveUserId('userId', payload.id.toString());
        if (payload.role === 'Customer') {
          navigation.navigate('CustomerTab');
        } else {
          navigation.navigate('SellerTab');
        }
        setEmail('');
        setPassword('');
        console.log('LOGIN SUCCESS!');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <View style={[styles.container]}>
      <View style={[{ marginTop: 40 }]}>
        <Image source={iconBB} style={[stylesLib.logo]} />
      </View>
      <View style={{ justifyContent: 'center', height: '50%' }}>
        <View style={[styles.containerEmail, styles.pad90]}>
          <Text style={[stylesLib.colSec, stylesLib.inputLabel, { paddingLeft: 20 }]}>email</Text>
          <TextInput 
            onChangeText={setEmail} 
            style = {[
              stylesLib.bgColPri, 
              stylesLib.inputField
              ]}
            underlineColor={stylesLib.colSec.color} 
          />
          <View style={{ borderBottomWidth: 2, borderBottomColor: stylesLib.colSec.color }} />
        </View>
        <View style={[styles.containerPassword, styles.pad90, { marginTop: 20 }]}>
          <Text style={[stylesLib.colSec, stylesLib.inputLabel, { paddingLeft: 20 }]}>password</Text>
          <TextInput
            style={[stylesLib.inputField, stylesLib.bgColPri, {color:stylesLib.colPri.color}]}
            onChangeText={setPassword}
            secureTextEntry={hidePass ? true : false}
            blurOnSubmit={false}
            autoCapitalize="none"
            returnKeyType="next"
            right={<TextInput.Icon icon="eye" onPress={() => setHidePass(!hidePass)} />}
          />
          <View style={{ borderBottomWidth: 2, borderBottomColor: stylesLib.colSec.color }} />
        </View>
      </View>
      <View>
        <Text style={[{ textAlign: 'center', fontSize: 25 }, stylesLib.colSec]}>Don't have an account ?</Text>
      </View>
      <View style={[{ flexDirection: 'row', justifyContent: 'center' }]}>
        <Text style={[{ textAlign: 'center', fontSize: 25, marginBottom: 20 }, stylesLib.colSec]}>Sign up</Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')} style={[styles.textHere, { marginLeft: 9 }]}>
          <Text style={[styles.textHere]}>here</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.pad30]}>
        <Button mode="contained" onPress={clickLogin} style={[styles.buttonLogin]} labelStyle={[stylesLib.colGrLight, { fontSize: 22 }]}>
          Login
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: stylesLib.bgColPri.backgroundColor,
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
    backgroundColor: stylesLib.bgColTer.backgroundColor,
  },
  textLogin: {
    color: stylesLib.colSec.color,
    fontSize: 25,
    padding: 0,
    fontWeight: '800',
    backgroundColor: 'red',
    height: 30,
  },
  textHere: {
    fontSize: 25,
    color: stylesLib.colSec.color,
    textDecorationLine: 'underline',
    fontWeight: '900',
  },
});
