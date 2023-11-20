import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import FoodCard from '../components/FoodCard';
import { useDispatch, useSelector } from 'react-redux';
import { createTransaction, fetchDetailStore } from '../../../store/actions/actionCreator';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

export default function DetailStore({ route }) {
  const navigation = useNavigation();
  const store = useSelector((state) => state.detailStore);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = React.useState(true)

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true)
        let access_token = await SecureStore.getItemAsync('access_token');
        dispatch(fetchDetailStore(route.params.storeId, access_token));
        console.log('FETCH DETAIL STORE SUCCESS');
        setIsLoading(false)
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  function clickCall() {
    dispatch(createTransaction({ access_token, StoreId: route.params.storeId }))
      .then((result) => {
        console.log('CALLING ABANG BERHASIL! :', result);
        navigation.navigate('UserHomeScreen');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <ScrollView style={styles.container}>
      {/* {!isLoading? ActivityIndicator} */}
      <Image
        source={{
          uri: store.imageUrl,
        }}
        style={styles.storeImage}
      />
      <View style={styles.storeInfoContainer}>
        <Text style={styles.storeName}>{store.name}</Text>
        <Text style={styles.storeDescription}>{store.description}</Text>
      </View>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingStar}>⭐️</Text>
        <Text style={styles.ratingText}>4.8</Text>
        <Text style={styles.ratingCount}>(999+ Reviews)</Text>
        <TouchableOpacity style={styles.callButton} onPress={clickCall}>
          <Text style={styles.callButtonText}>CALL</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.foodContainer}>
        <Text style={styles.storeName}>LIST FOOD</Text>
        {store.Food.map((food) => {
          return <FoodCard key={food.id} name={food.name} image={food.imageUrl} description={food.description} price={food.price} />;
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  storeImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  storeInfoContainer: {
    padding: 15,
  },
  storeName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  storeDescription: {
    fontSize: 16,
    marginTop: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 15,
    marginBottom: 20,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ratingStar: {
    fontSize: 20,
    marginLeft: 5,
    marginRight: 5,
  },
  ratingCount: {
    fontSize: 16,
    marginLeft: 5,
    color: 'gray',
  },
  foodContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  deliveryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  deliveryInfo: {
    fontSize: 16,
  },
  callButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 15,
  },
  callButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
