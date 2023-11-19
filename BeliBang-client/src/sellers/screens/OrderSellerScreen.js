import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSellerOrder, updateStatusOrder } from '../../../store/actions/actionCreator';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import stylesLib from '../../../assets/styles/styles-lib';

export default function OrderSellerScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [accessToken, setAccessToken] = React.useState(null);
  const sellerOrder = useSelector((state) => state.sellerOrder);

  useEffect(() => {
    (async () => {
      try {
        let access_token = await SecureStore.getItemAsync('access_token');
        setAccessToken(access_token);
        dispatch(fetchSellerOrder(access_token));
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  function handleAccept(orderId) {
    try {
      const status = { status: 'Processing' };

      dispatch(updateStatusOrder(orderId, status, accessToken));
      console.log('UPDATE STATUS SUCCESS!');
    } catch (err) {
      console.log(err);
    }
  }

  function handleReject(orderId) {
    try {
      const status = {
        status: 'Canceled',
      };
      dispatch(updateStatusOrder(orderId, status, accessToken));
      console.log('UPDATE STATUS SUCCESS');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <ScrollView contentContainerStyle={[styles.container, stylesLib.bgColGrLight]}>
      {sellerOrder.length !== 0 ? (
        sellerOrder.map((order) => (
          <React.Fragment key={order.id}>
            {(order.status === 'Waiting' || order.status === 'Canceled' || order.status === 'Processing') && (
              <TouchableOpacity onPress={() => navigation.navigate('MapScreenTransc')}>
                <View style={[styles.cardContainer, stylesLib.bgColCr]}>
                  <Image source={{ uri: order.User.profilePicture }} style={styles.cardImage} />
                  {order.status === 'Canceled' && (
                    <View style={styles.overlay}>
                      <Text style={[styles.overlayText]}>{order.status}</Text>
                    </View>
                  )}

                  <View style={styles.cardDetails}>
                    <View>
                      <Text style={styles.cardTitle}>{order.User.username}</Text>
                      <Text>30 meters</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                      {order.status === 'Waiting' && (
                        <>
                          <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={() => handleAccept(order.id)}>
                            <Text style={styles.buttonText}>Accept</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={[styles.button, styles.rejectButton]} onPress={() => handleReject(order.id)}>
                            <Text style={styles.buttonText}>Reject</Text>
                          </TouchableOpacity>
                        </>
                      )}

                      {order.status === 'Processing' && <Text style={[styles.successStatus]}>Processing</Text>}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          </React.Fragment>
        ))
      ) : (
        <Text>NO ORDERS FOUND</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
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
    justifyContent: 'space-between',
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
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptButton: {
    backgroundColor: 'green',
  },
  rejectButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(128, 128, 128, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  overlayText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#DB5856',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  successStatus: {
    padding: 4,
    backgroundColor: '#77DD77',
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
    borderRadius: 10,
  },
});
