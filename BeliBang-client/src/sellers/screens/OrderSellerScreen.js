import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { fetchTransaction } from '../../../store/actions/actionCreator';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import stylesLib from '../../../assets/styles/styles-lib';

export default function OrderSellerScreen() {
  const [access_token, setAccess_Token] = React.useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        let result = await SecureStore.getItemAsync('access_token');
        setAccess_Token(result);

        dispatch(fetchTransaction(result));
      } catch (error) {
        console.error('Error fetching access token:', error.message);
      }
    };

    fetchAccessToken();
  }, [dispatch]);

  const transactions = [
    { id: 1, title: 'Title 1', price: 'Rp 40,000', status: 'Processing', imageUrl: 'https://asset-2.tstatic.net/travel/foto/bank/images/sate-taican_20170207_185659.jpg' },
    { id: 2, title: 'Title 2', price: 'Rp 40,000', status: 'Processing', imageUrl: 'https://asset-2.tstatic.net/travel/foto/bank/images/sate-taican_20170207_185659.jpg' },
    { id: 3, title: 'Title 3', price: 'Rp 40,000', status: 'Processing', imageUrl: 'https://asset-2.tstatic.net/travel/foto/bank/images/sate-taican_20170207_185659.jpg' },
  ];

  return (
    <ScrollView contentContainerStyle={[styles.container, stylesLib.bgColGrLight]}>
      {transactions.map((transaction, index) => (
        <TouchableOpacity onPress={() => navigation.navigate('MapScreenTransc')}>
          <View key={transaction.id} style={[styles.cardContainer, stylesLib.bgColCr]}>
            <Image source={{ uri: transaction.imageUrl }} style={styles.cardImage} />
            <View style={styles.cardDetails}>
              <View>
                <Text style={styles.cardTitle}>{transaction.title}</Text>
                <Text style={styles.cardPrice}>{transaction.price}</Text>
              </View>
              <View>
                <Text style={[styles.cardDescription, stylesLib.colGrLight, {fontWeight:'700', textDecorationLine:'underline'}]}>{transaction.status}...</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1
  },
  cardContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginVertical: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
  },
  cardDetails: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  cardTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDescription: {
    fontSize: 16,
    color: '#666',
  },
  cardPrice: {
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 5,
    color: 'green',
  },
});
