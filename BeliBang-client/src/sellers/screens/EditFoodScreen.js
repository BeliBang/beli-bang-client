import { StyleSheet, TextInput, View, Text, SafeAreaView } from 'react-native';
import stylesLib from '../../../assets/styles/styles-lib';
import * as React from 'react';

export default function EditFoodScreen() {
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const [description, setDescription] = React.useState('');

  return (
    <View style={[stylesLib.bgColGr, {flex:1}]}>
      <View>

      </View>
      <View style={[{marginTop: 20}]}>
          <Text style={[stylesLib.colCr, stylesLib.inputLabel, { paddingLeft: 20 }]}>name</Text>
          <TextInput value={name} onChangeText={(text) => setName(text)} style={[stylesLib.inputField, stylesLib.bgColCr]} />
      </View>
      <View style={[{marginTop: 20}]}>
          <Text style={[stylesLib.colCr, stylesLib.inputLabel, { paddingLeft: 20 }]}>price</Text>
          <TextInput value={price} onChangeText={(text) => setPrice(text)} style={[stylesLib.inputField, stylesLib.bgColCr]} />
      </View>
      <View style={[{marginTop: 20}]}>
          <Text style={[stylesLib.colCr, stylesLib.inputLabel, { paddingLeft: 20 }]}>imageUrl</Text>
          <TextInput value={imageUrl} onChangeText={(text) => setImageUrl(text)} style={[stylesLib.inputField, stylesLib.bgColCr]} />
      </View>
      <View style={[{marginTop: 20}]}>
          <Text style={[stylesLib.colCr, stylesLib.inputLabel, { paddingLeft: 20 }]}>description</Text>
          <TextInput value={description} onChangeText={(text) => setDescription(text)} style={[stylesLib.inputField, stylesLib.bgColCr]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemTitle: {
    textDecorationLine: 'underline',
    fontWeight: '900',
    fontSize: 20
  },
  item: {
    fontSize: 20
  },
});
