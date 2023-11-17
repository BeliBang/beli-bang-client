import { View, Text, StyleSheet, Button } from 'react-native';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../../store/actions/actionCreator';
import * as React from 'react';
import { Avatar } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state) => {
    return state.user;
  });

  console.log(user);
  // sementara di hardcode, nanti didapet dari localStorage
  const UserId = 2;

  useEffect(() => {
    dispatch(fetchUser(UserId))
      .then(() => {
        console.log('fetch detail user berhasil!');
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const clickSignOut = async () => {
    await SecureStore.deleteItemAsync('access_token');
    await SecureStore.deleteItemAsync('role');
    return navigation.navigate('LoginScreen');
  };

  return (
    <View style={[styles.container]}>
      <Text>INI PROFILE SELLER SCREEN</Text>
      <Avatar.Image size={50} source={{ uri: user.profilePicture }} />
      <Text>{user.username}</Text>
      <Text>{user.email}</Text>
      <Text>{user.password}</Text>
      <Text>{user.phoneNumber}</Text>
      <Text>{user.address}</Text>
      <Button title="Logout" onPress={() => clickSignOut()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#739072',
    textAlign: 'center',
    alignItems: 'center',
  },
});
