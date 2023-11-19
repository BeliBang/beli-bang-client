import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import stylesLib from '../../../assets/styles/styles-lib';
import * as React from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import { TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { createFood, registerStore } from '../../../store/actions/actionCreator';

export default function EditFoodScreen({ navigation, route }) {
  const id = route.params.id;
  const dispatch = useDispatch();
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [image, setImage] = React.useState('');
  const [description, setDescription] = React.useState('');
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

  function updateFood() {
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('imageUrl', formDataImage);

    dispatch(createFood(formData, access_token))
      .then(() => {
        // setName('');
        // setPrice('');
        // setDescription('');
        // setImage(null);
        // setAccess_Token(null);
        // navigation.navigate('SellerTab');
        console.log('SUCCESS UPDATE FOOD!');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <View style={[stylesLib.bgColGr, { flex: 1 }]}>
      <View style={[stylesLib.pad20, { paddingTop: 20 }]}>
        <View>
          <Text style={[{ fontSize: 25, fontWeight: '800', textDecorationLine: 'underline' }, stylesLib.colCr]}>UPDATE FOOD</Text>
        </View>
        <View style={[{ marginTop: 20 }]}>
          <Text style={[stylesLib.colCr, stylesLib.inputLabel, { paddingLeft: 20 }]}>name</Text>
          <TextInput value={name} onChangeText={(text) => setName(text)} style={[stylesLib.inputField, stylesLib.bgColCr]} />
        </View>
        <View style={[{ marginTop: 20 }]}>
          <Text style={[stylesLib.colCr, stylesLib.inputLabel, { paddingLeft: 20 }]}>price</Text>
          <TextInput value={price} onChangeText={(text) => setPrice(text)} style={[stylesLib.inputField, stylesLib.bgColCr]} />
        </View>
        <View style={[{ marginTop: 20 }]}>
          <Text style={[stylesLib.colCr, stylesLib.inputLabel, { paddingLeft: 20 }]}>description</Text>
          <TextInput value={description} onChangeText={(text) => setDescription(text)} style={[stylesLib.inputField, stylesLib.bgColCr]} />
        </View>
        <View style={[{ marginTop: 20 }]}>
          <TouchableOpacity onPress={pickImage} style={[]}>
            <Text style={[stylesLib.colGrBold, stylesLib.bgColCr, stylesLib.pad10, { fontSize: 20, borderRadius: 20, textAlign: 'center' }]}>Pick Image</Text>
          </TouchableOpacity>
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
        <View style={[{ marginTop: 60, alignSelf: 'center' }]}>
          <TouchableOpacity onPress={updateFood} style={[]}>
            <Text style={[stylesLib.colGrBold, stylesLib.bgColCr, stylesLib.pad10, { fontSize: 25, borderRadius: 20, textAlign: 'center' }]}>SUBMIT</Text>
          </TouchableOpacity>
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemTitle: {
    textDecorationLine: 'underline',
    fontWeight: '900',
    fontSize: 20,
  },
  item: {
    fontSize: 20,
  },
});
