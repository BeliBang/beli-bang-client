import * as React from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Button, Image, SafeAreaView } from 'react-native';
import { TextInput } from 'react-native-paper';
import stylesLib from '../../../assets/styles/styles-lib';
import { useDispatch } from 'react-redux';
import { registerStore } from '../../../store/actions/actionCreator';

export default function RegisterStore({ navigation }) {
  const dispatch = useDispatch();
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [image, setImage] = React.useState(null);
  const [formDataImage, setFormDataImage] = React.useState({});
  const [access_token, setAccess_Token] = React.useState(null);
  let formData = new FormData();

  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    setAccess_Token(result);
  }

  getValueFor('access_token');

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      let localUri = result.assets[0].uri;
      let filename = localUri.split('/').pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      setFormDataImage({ uri: localUri, name: filename, type });
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (e) {
      console.log(e);
    }
  };

  function clickRegister() {
    formData.append('name', name);
    formData.append('description', description);
    formData.append('imageUrl', JSON.stringify(formDataImage));
    // formData.append('access_token', access_token);
    dispatch(registerStore(formData, access_token))
      .then(() => {
        setName('');
        setDescription('');
        setImage(null);
        setAccess_Token(null);
        // navigation.navigate('SellerTab');
        console.log('SUCCESS CREATE STORE!');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ justifyContent: 'center' }}>
        <View style={[stylesLib.pad30, { marginBottom: 30, marginTop: 40 }]}>
          <Text style={[stylesLib.inputLabel]}>Name Store :</Text>
          <TextInput value={name} onChangeText={setName} style={[stylesLib.inputField]} />
        </View>
        <View style={[stylesLib.pad30, { marginBottom: 30 }]}>
          <Text style={[stylesLib.inputLabel]}>Description :</Text>
          <TextInput value={description} onChangeText={setDescription} style={[stylesLib.inputField]} />
        </View>
        <View style={[{ alignItems: 'center' }]}>
          <View style={[{ marginBottom: 10 }]}>
            <Text style={[{ fontSize: 25 }]}>Store photo :</Text>
          </View>
          <View style={[{ marginBottom: 20 }]}>
            <TouchableOpacity onPress={pickImage} style={[]}>
              <Text style={[stylesLib.colGrBold, stylesLib.bgColCr, stylesLib.pad10, { fontSize: 20, borderRadius: 20 }]}>Choose image</Text>
            </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
          </View>
          <View style={[{ marginBottom: 20 }]}>
            <TouchableOpacity onPress={clickRegister} style={[]}>
              <Text style={[stylesLib.colGrBold, stylesLib.bgColCr, stylesLib.pad10, { fontSize: 20, borderRadius: 20 }]}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#739072',
  },
});
