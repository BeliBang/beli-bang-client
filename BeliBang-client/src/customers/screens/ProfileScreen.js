import { View, Text } from 'react-native';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUsers } from '../../store/actions/actionCreator';

export default function ProfileScreen() {
  // const dispatch = useDispatch();
  // const users = useSelector((state) => {
  //   console.log(state, '<<<<<<<<');
  //   return state.users;
  // });

  // useEffect(() => {
  //   dispatch(fetchUsers(users))
  //     .then(() => {
  //       console.log('fetch users berhasil!');
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <View>
      <Text>INI PROFILE SCREEN</Text>
    </View>
  );
}
