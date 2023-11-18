import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../../store/actions/actionCreator';
import * as React from 'react';
import { Avatar } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import stylesLib from '../../../assets/styles/styles-lib';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state) => {
    return state.user;
  });
  const [showPassword, setShowPassword] = React.useState(false)
  console.log(user);
  // sementara di hardcode, nanti didapet dari localStorage
  const UserId = 1;

  useEffect(() => {
    dispatch(fetchUser(UserId))
      .then(() => {
        console.log('fetch detail user berhasil!');
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const passAsterix = (length) => {
    return '*'.repeat(length);
  };

  const clickSignOut = async () => {
    await SecureStore.deleteItemAsync('access_token');
    return navigation.navigate('LoginScreen');
  };

  return (
    <View style={[styles.container]}>
      <View style={[stylesLib.pad30, {flexDirection:'row' ,justifyContent:'space-between', marginTop:20, marginBottom:10}]}>
        <TouchableOpacity onPress={() => clickSignOut()}>
          <Text style={[stylesLib.colGrBold, stylesLib.bgColCr,stylesLib.pad10, {fontSize: 20, borderRadius: 20}]}>EDIT</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => clickSignOut()}>
          <Text style={[stylesLib.colGrBold, stylesLib.bgColCr,stylesLib.pad10, {fontSize: 20, borderRadius: 20}]}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
      <View style={[{flexDirection:'row', alignItems:'center', justifyContent:'center', marginBottom:20}]}>
        <View style={[{alignItems:'center', borderWidth:5, borderColor:'rgb(236, 227, 206)', borderRadius: 70, overflow:'hidden'}]}>
          <Avatar.Image 
            size={120} 
            source={{ uri: user.profilePicture }} 
          />
        </View>
      </View>
      <View style={[stylesLib.padL20]}>
        <View style={[{marginBottom:10}]}>
          <Text style={[{marginBottom:5}, stylesLib.colCr, styles.itemTitle]}>username</Text>
          <Text style={[styles.item, stylesLib.colCr]}>{user.username}</Text>
        </View>
        <View style={[{marginBottom:10}]}>
          <Text style={[{marginBottom:5}, stylesLib.colCr, styles.itemTitle]}>email</Text>
          <Text style={[styles.item, stylesLib.colCr]}>{user.email}</Text>
        </View>
        <View  style={[{marginBottom:10}]}>
          <View style={[{flexDirection:'row'}]}>
            <Text style={[{marginBottom:5, marginRight: 10}, stylesLib.colCr, styles.itemTitle]}>password</Text>
            {!showPassword ? (
              <Entypo 
                name="eye" 
                size={24} 
                color='rgb(236, 227, 206)' 
                onPress={() => setShowPassword(!showPassword)}
                />
              ) : (
              <Entypo
                name="eye-with-line" 
                size={24} 
                color='rgb(236, 227, 206)'
                onPress={() => setShowPassword(!showPassword)}
                />
              )
            }
          </View>
          <Text style={[styles.item, stylesLib.colCr]}>
            {showPassword ? user.password : passAsterix(user.password.length)}
          </Text>
        </View>
        <View style={[{marginBottom:10}]}>
          <Text style={[{marginBottom:5}, stylesLib.colCr, styles.itemTitle]}>phone number</Text>
          <Text style={[styles.item, stylesLib.colCr]}>{user.phoneNumber}</Text>
        </View>
        <View style={[{marginBottom:10}]}>
          <Text style={[{marginBottom:5}, stylesLib.colCr, styles.itemTitle]}>address</Text>
          <Text style={[styles.item, stylesLib.colCr]}>{user.address}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#739072',
  },
  itemTitle: {
    textDecorationLine: 'underline',
    fontWeight: '900',
    fontSize: 20
  },
  item: {
    fontSize: 20
  },
});