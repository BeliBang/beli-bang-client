import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import stylesLib from '../../../assets/styles/styles-lib';
import iconBB from '../../../assets/belibang-CB.png'

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    console.log(result);
  } else {
    console.log('No values stored under that key.');
  }
}

export default function UserHomeScreen({ navigation }) {
  return (
    <View style={[stylesLib.flex1, stylesLib.bgColGrLight, stylesLib.pad20]}>
      <View style={[{ marginTop: 20, marginBottom:50 }]}>
        <Image source={iconBB} style={[stylesLib.logo]} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('MapScreen')} 
      style={[
        stylesLib.bgColCr, 
        {
          marginBottom:30, 
          padding:30, 
          height:150, 
          justifyContent:'center',
          borderRadius: 30,
          borderWidth: 5,
          borderColor: 'white'
        }]}>
        <Text style={[{fontSize:30, textAlign:'center', fontWeight:'900'}, stylesLib.colGr]}>SELLERS NEAR ME</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ListStores')} 
      style={[
        stylesLib.bgColCr, 
        {
          marginBottom:20, 
          padding:30, 
          height:150, 
          justifyContent:'center',
          borderRadius: 30,
          borderWidth: 5,
          borderColor: 'white'
        }]}>
        <Text style={[{fontSize:30, textAlign:'center', fontWeight:'900'}, stylesLib.colGr]}>Explore Street Sellers</Text>
      </TouchableOpacity> 
    </View>
  );
}
