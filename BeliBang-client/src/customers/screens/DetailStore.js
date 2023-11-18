import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import FoodCard from '../components/FoodCard';
import { useDispatch, useSelector } from 'react-redux';
import { createTransaction, fetchStore } from '../../../store/actions/actionCreator';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

export default function DetailStore({ route }) {
  const navigation = useNavigation();
  const [access_token, setAccess_Token] = React.useState(null);
  // const store = useSelector(state => state.store)

  // useEffect(() => {
  //     dispatch(fetchStore(storeId))
  //     .then(() => {
  //         console.log('FETCH DETAIL STORE SUCCESS');
  //     })
  //     .catch(err => {
  //         console.log(err);
  //     })
  // },[])

  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    setAccess_Token(result);
  }

  getValueFor('access_token');

  const dispatch = useDispatch();

  const StoreId = route.params.storeId;

  // DATA HARDCODE
  const foodData = [
    {
      id: '1',
      name: 'Nasi Goreng Spesial',
      image: 'https://live.staticflickr.com/65535/51364535374_64b9889b7d_b.jpg',
      description: 'Nasi goreng dengan berbagai bumbu pilihan.',
      price: 'Rp 25.000',
    },
    {
      id: '2',
      name: 'Nasi Goreng Spesial',
      image: 'https://live.staticflickr.com/65535/51364535374_64b9889b7d_b.jpg',
      description: 'Nasi goreng dengan berbagai bumbu pilihan.',
      price: 'Rp 25.000',
    },
    {
      id: '3',
      name: 'Nasi Goreng Spesial',
      image: 'https://live.staticflickr.com/65535/51364535374_64b9889b7d_b.jpg',
      description: 'Nasi goreng dengan berbagai bumbu pilihan.',
      price: 'Rp 25.000',
    },
    {
      id: '4',
      name: 'Nasi Goreng Spesial',
      image: 'https://live.staticflickr.com/65535/51364535374_64b9889b7d_b.jpg',
      description: 'Nasi goreng dengan berbagai bumbu pilihan.',
      price: 'Rp 25.000',
    },
    {
      id: '5',
      name: 'Nasi Goreng Spesial',
      image: 'https://live.staticflickr.com/65535/51364535374_64b9889b7d_b.jpg',
      description: 'Nasi goreng dengan berbagai bumbu pilihan.',
      price: 'Rp 25.000',
    },
  ];

  function clickCall() {
    dispatch(createTransaction({ access_token, StoreId }))
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
      <Image
        source={{
          uri: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEikdLvYYrJls_oY_h6OyzmWQLijl9qdiMFiKUmEKBWr7O7R4wmo4cwQOG5cIMQzRDT-q9rkENIWYaKIw3GoJ8JFkocS-9a98pA_u9p18521Q6rlNv_7NDs3n2dccSR8QlmPXhQk6mUONSQCTp6SHt0AH7uUBpYiaKkIVUwdB6a216GIM2gRcfWcurpEhA/w1200-h630-p-k-no-nu/Beli%201set%20Peralatan%20Hisana%20Fried%20Chicken%20Modal%20Rp.%203,7%20Juta.jpg',
        }}
        style={styles.storeImage}
      />
      <View style={styles.storeInfoContainer}>
        <Text style={styles.storeName}>HISANA disuka</Text>
        <Text style={styles.storeDescription}>
          Selamat datang di HISANA disuka destinasi terbaik untuk pencinta ayam goreng yang menginginkan cita rasa istimewa! Toko kami menawarkan pengalaman kuliner yang tak terlupakan dengan menu utama kami yang lezat dan beragam pilihan.
        </Text>
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
        {foodData.map((food) => {
          return <FoodCard key={food.id} name={food.name} image={food.image} description={food.description} price={food.price} />;
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
