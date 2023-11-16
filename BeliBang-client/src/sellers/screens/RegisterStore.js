import { View, Text, StyleSheet, TouchableOpacity, Platform, Button, Image } from 'react-native';
import * as React from 'react';
import { TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import stylesLib from '../../../assets/styles/styles-lib'
export default function RegisterStore({ navigation }) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [image, setImage] = React.useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  function clickRegister() {
    console.log({ name, description, image });
    setName('');
    setDescription('');
    setImage(null);
    navigation.navigate('SellerTab');
  }

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: 'center' }}>
        <View style={[stylesLib.pad30, {marginBottom: 30, marginTop: 40}]}>
          <Text style={[stylesLib.inputLabel]}>Nama Dagangan</Text>
          <TextInput value={name} onChangeText={(text) => setName(text)} style={[stylesLib.inputField]} />
        </View>
        <View style={[stylesLib.pad30, {marginBottom: 30}]}>
          <Text style={[stylesLib.inputLabel]}>Deskripsi</Text>
          <TextInput value={description} onChangeText={(text) => setDescription(text)} style={[stylesLib.inputField]} />
        </View>
        <View style={[{alignItems: 'center'}]}>
          <View style={[{marginBottom: 10}]}>
            <Text style={[{fontSize: 25}]}>Foto Dagangan</Text>
          </View>
          <View style={[{marginBottom: 20}]}>
            <TouchableOpacity onPress={() => pickImage()} style={[]}>
              <Text style={[stylesLib.colGrBold, stylesLib.bgColCr,stylesLib.pad10, {fontSize: 20, borderRadius: 20}]}>PILIH GAMBAR</Text>
            </TouchableOpacity>
          </View>
          <View style={[{marginBottom: 20}]}>
            <TouchableOpacity onPress={() => pickImage()} style={[]}>
              <Text style={[stylesLib.colGrBold, stylesLib.bgColCr,stylesLib.pad10, {fontSize: 20, borderRadius: 20}]}>DAFTAR</Text>
            </TouchableOpacity>
          </View>
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
});
