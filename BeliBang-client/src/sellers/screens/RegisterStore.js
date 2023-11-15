import { View, Text, StyleSheet, TouchableOpacity, Platform, Button, Image } from 'react-native';
import * as React from 'react';
import { TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
// import stylesLib from '../../assets/styles/styles-lib';

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
      <View style={{ justifyContent: 'center', height: '50%' }}>
        <Text>Nama Dagangan</Text>
        <TextInput value={name} onChangeText={(text) => setName(text)} />
        <Text>Deskripsi</Text>
        <TextInput value={description} onChangeText={(text) => setDescription(text)} />
        <Text>Foto Dagangan</Text>
        <View>
          <Button title="Pilih Gambar" onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
        <Button
          onPress={(e) => {
            clickRegister();
          }}
          title="Register"
          color="#841584"
        />
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
