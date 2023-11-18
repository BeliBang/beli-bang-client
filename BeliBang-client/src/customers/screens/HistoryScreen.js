import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { fetchTransaction } from '../../../store/actions/actionCreator';
import * as SecureStore from 'expo-secure-store';

export default function HistoryScreen() {
  const [access_token, setAccess_Token] = React.useState(null);
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
    { title: 'Title 1', price: 'Rp 40,000', status: 'Completed', imageUrl: 'https://asset-2.tstatic.net/travel/foto/bank/images/sate-taican_20170207_185659.jpg' },
    { title: 'Title 2', price: 'Rp 40,000', status: 'Canceled', imageUrl: 'https://asset-2.tstatic.net/travel/foto/bank/images/sate-taican_20170207_185659.jpg' },
    { title: 'Title 3', price: 'Rp 40,000', status: 'Completed', imageUrl: 'https://asset-2.tstatic.net/travel/foto/bank/images/sate-taican_20170207_185659.jpg' },
  ];

  return (
    <View style={styles.container}>
      {transactions.map((transaction, index) => (
        <View key={index} style={styles.cardContainer}>
          <Image source={{ uri: transaction.imageUrl }} style={styles.cardImage} />
          <View style={styles.cardDetails}>
            <Text style={styles.cardTitle}>{transaction.title}</Text>
            <Text style={styles.cardPrice}>{transaction.price}</Text>
            <Text style={styles.cardDescription}>Status: {transaction.status}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginVertical: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  cardImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  cardDetails: {
    flex: 1,
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    color: 'green',
  },
});
