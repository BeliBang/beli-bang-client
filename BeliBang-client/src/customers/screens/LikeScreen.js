import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { fetchTransaction } from '../../../store/actions/actionCreator';
import * as SecureStore from 'expo-secure-store';
import { MaterialIcons } from '@expo/vector-icons';

export default function LikeScreen() {
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

  const likedTransactions = [
    {
      title: 'Title 1',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis, eius. Beatae quam vero, facilis ducimus laborum alias? Ducimus, non unde.',
      imageUrl: 'https://asset-2.tstatic.net/travel/foto/bank/images/sate-taican_20170207_185659.jpg',
    },
    {
      title: 'Title 2',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis, eius. Beatae quam vero, facilis ducimus laborum alias? Ducimus, non unde.',
      imageUrl: 'https://asset-2.tstatic.net/travel/foto/bank/images/sate-taican_20170207_185659.jpg',
    },
    {
      title: 'Title 3',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis, eius. Beatae quam vero, facilis ducimus laborum alias? Ducimus, non unde.',
      imageUrl: 'https://asset-2.tstatic.net/travel/foto/bank/images/sate-taican_20170207_185659.jpg',
    },
  ];

  return (
    <View style={styles.container}>
      {likedTransactions.map((transaction, index) => (
        <View key={index} style={styles.cardContainer}>
          <Image source={{ uri: transaction.imageUrl }} style={styles.cardImage} />
          <View style={styles.cardDetails}>
            <Text style={styles.cardTitle}>{transaction.title}</Text>
            <Text style={styles.cardDescription}>{transaction.description}</Text>
          </View>
          <MaterialIcons name="favorite" size={24} color="red" style={styles.iconHeart} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 9,
    marginTop: 5,
    color: 'gray',
  },
  iconHeart: {
    alignSelf: 'center',
    marginHorizontal: 10,
    marginRight: 50,
  },
});
