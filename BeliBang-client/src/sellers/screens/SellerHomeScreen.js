import { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFoods, fetchStore } from '../../../store/actions/actionCreator';
import * as React from 'react';
import { Card } from 'react-native-paper';

export default function SellerHomeScreen() {
  const dispatch = useDispatch();
  const store = useSelector((state) => {
    return state.store;
  });
  const foods = useSelector((state) => {
    return state.foods;
  });

  console.log(store, '<<<<<<<< store');
  console.log(foods, '<<<<<<<< foods');

  // sementara di hardcode, nanti dapet dari localStoragenya
  const storeId = 1;

  useEffect(() => {
    dispatch(fetchStore(storeId))
      .then(() => {
        dispatch(fetchFoods(storeId));
      })
      .then(() => {
        console.log('fetch store & foods success! ');
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ScrollView>
      <View>
        <Text>INI HALAMAN HOME SELLER</Text>

        <Card>
          <Card.Cover source={{ uri: store.imageUrl }} />
        </Card>
        <Button title="TAMBAH MAKANAN +" onPress={() => Alert.alert('Simple Button pressed')} />
        <Text>{store.name}</Text>
        <Text>{store.description}</Text>
        <View>{store.status ? <Text>BUKA</Text> : <Text>TUTUP</Text>}</View>
        <View>
          {foods.map((food, id) => {
            return (
              <View key={id}>
                <Image source={{ uri: food.imageUrl }} style={styles.image} />
                <Text>{food.name}</Text>
                <Text>{food.price}</Text>
                <Text>{food.description}</Text>
                <Text>EDIT</Text>
                <Text>DELETE</Text>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
});
