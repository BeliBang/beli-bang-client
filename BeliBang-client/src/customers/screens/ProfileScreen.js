import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../../store/actions/actionCreator';
import * as React from 'react';
import { Avatar } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import ProfilePictureModal from './ProfilePictureModal';
import stylesLib from '../../../assets/styles/styles-lib';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state) => {
    return state.user;
  });

  console.log(user.username);

  const [username, setUsername] = React.useState (user.username)
  const [phoneNumber, setPhoneNumber] = React.useState (user.phoneNumber)
  const [address, setAdress] = React.useState (user.address)
  const [isModalVisible, setModalVisible] = React.useState(false);

  const [editableFields, setEditableFields] = React.useState({
    username: false,
    email: false,
    phoneNumber: false,
    address: false,
  });

  const handleEdit = (field) => {
    // cuma handle field nya aja
    setEditableFields({ ...editableFields, [field]: true });
  };

  const handleSave = async (field) => {
    console.log(field);
    console.log(username);
    // hit API untuk edit
    setEditableFields({ ...editableFields, [field]: false });
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    (async () => {
      try {
        let userId = await SecureStore.getItemAsync('userId');
        let access_token = await SecureStore.getItemAsync('access_token');
        await dispatch(fetchUser(userId, access_token));
        console.log('fetch detail user berhasil!');
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  

  const clickSignOut = async () => {
    await SecureStore.deleteItemAsync('access_token');
    await SecureStore.deleteItemAsync('role');
    await SecureStore.deleteItemAsync('userId');
    return navigation.navigate('LoginScreen');
  };

  const handleUsername = (value) => {
    setUsername(value)
  }

  const handlePhoneNumber = (value) => {
    setPhoneNumber(value)
  }

  const handleAddress = (value) => {
    setAdress(value)
  }

  const renderEditSaveButtons = (field) => {
    return (
      <>
        {!editableFields[field] && (
          <TouchableOpacity onPress={() => handleEdit(field)}>
            <FontAwesome name="edit" size={25} color="white" />
          </TouchableOpacity>
        )}
        {editableFields[field] && (
          <TouchableOpacity onPress={() => handleSave(field)}>
            <FontAwesome name="save" size={25} color="white" />
          </TouchableOpacity>
        )}
      </>
    );
  };

  return (
    <ScrollView style={[stylesLib.pad30, styles.container]}>
      <View style={[{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20, marginBottom: 10 }]}>
        <TouchableOpacity onPress={() => clickSignOut()}>
          <Text style={[stylesLib.colCr, stylesLib.pad10, { fontSize: 20, borderRadius: 20, backgroundColor:'#DB5856' }]}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
      <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 50 }]}>
        <TouchableOpacity onPress={toggleModal}>
          <View style={[{ alignItems: 'center', borderWidth: 5, borderColor: 'rgb(236, 227, 206)', borderRadius: 70, overflow: 'hidden' }]}>
            <Avatar.Image size={120} source={{ uri: user.profilePicture }} />
          </View>
        </TouchableOpacity>
      </View>
      <ProfilePictureModal isVisible={isModalVisible} toggleModal={toggleModal} profilePictureUri={user.profilePicture} />
      <View style={[stylesLib.padL20]}>
        <View style={[{ marginBottom: 20 }]}>
            <Text style={[{ marginBottom: 5 }, stylesLib.colCr, styles.itemTitle]}>email</Text>
            <Text style={[styles.item, stylesLib.colCr]}>{user.email}</Text>
        </View>
        <View style={[{ marginBottom: 20 }]}>
          <Text style={[{ marginBottom: 5 }, stylesLib.colCr, styles.itemTitle]}>username</Text>
          <View style={[{ flexDirection:'row'}]}>
            <View style={[stylesLib.flex9, {marginRight:20}]}>
              {editableFields.username ? (
                <TextInput
                  style={[styles.item, stylesLib.colGrLight, stylesLib.bgColCr, {borderRadius: 10}]}
                  value={username}
                  onChangeText={(value) => {handleUsername(value)}}
                />
              ) : (
                <Text style={[styles.item, stylesLib.colCr]}>{user.username}</Text>
              )}
            </View>
            <View style={[stylesLib.flex1]}>
              {renderEditSaveButtons('username')}
            </View>
          </View>
        </View>
        <View style={[{ marginBottom: 20 }]}>
          <Text style={[{ marginBottom: 5 }, stylesLib.colCr, styles.itemTitle]}>phone number</Text>
          <View style={[{ flexDirection:'row' }]}>
            <View style={[stylesLib.flex9, {marginRight:20}]}>
              {editableFields.phoneNumber ? (
                <TextInput
                  style={[styles.item, stylesLib.colGrLight, stylesLib.bgColCr, {borderRadius: 10}]}
                  value={phoneNumber}
                  onChangeText={(value) => {handlePhoneNumber(value)}}
                />
              ) : (
                <Text style={[styles.item, stylesLib.colCr]}>{user.phoneNumber}</Text>
              )}
            </View>
            <View style={[stylesLib.flex1]}>
              {renderEditSaveButtons('phoneNumber')}
            </View>
          </View>
        </View>
        <View style={[{ marginBottom: 20 }]}>
          <Text style={[{ marginBottom: 5 }, stylesLib.colCr, styles.itemTitle]}>address</Text>
          <View style={[{ flexDirection:'row', justifyContent:'space-between' }]}>
            <View style={[stylesLib.flex9, {marginRight:20}]}>
              {editableFields.address ? (
                <TextInput
                  style={[styles.item, stylesLib.colGrLight, stylesLib.bgColCr, {borderRadius: 10}]}
                  value={address}
                  onChangeText={(value) => {handleAddress(value)}}
                />
              ) : (
                <Text style={[styles.item, stylesLib.colCr]}>{user.address}</Text>
              )}
            </View>
            <View style={[stylesLib.flex1]}>
              {renderEditSaveButtons('address')}
            </View>
          </View>
        <View style={[{marginTop: 50, alignSelf:'center', paddingBottom:80}]}>
          <TouchableOpacity onPress={() => clickSignOut()}>
            <Text style={[stylesLib.colGrBold, stylesLib.bgColCr, stylesLib.pad10, { fontSize: 20, borderRadius: 20, textAlign: 'center' }]}>CHANGE PASSWORD</Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: stylesLib.bgColGrLight.backgroundColor,
  },
  itemTitle: {
    textDecorationLine: 'underline',
    fontWeight: '900',
    fontSize: 20,
  },
  item: {
    fontSize: 20,
  },
});
