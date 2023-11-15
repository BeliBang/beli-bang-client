import { View, Text, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../../store/actions/actionCreator';
import * as React from 'react';
import { Avatar } from 'react-native-paper';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });

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

  return (
    <View style={[styles.container]}>
      <Text>INI PROFILE SCREEN</Text>
      <Avatar.Image size={50} source={{ uri: user.profilePicture }} />
      <Text>{user.username}</Text>
      <Text>{user.email}</Text>
      <Text>{user.password}</Text>
      <Text>{user.phoneNumber}</Text>
      <Text>{user.address}</Text>
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
