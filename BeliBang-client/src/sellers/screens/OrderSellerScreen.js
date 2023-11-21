import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
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
  const [isLoading, setIsLoading] = useState(true);
  const [buyerLatitude, setBuyerLatitude] = useState('');
  const [buyerLongitude, setBuyerLongitude] = useState('');
  const [sellerLatitude, setSellerLatitude] = useState('');
  const [sellerLongitude, setSellerLongitude] = useState('');

  useEffect(() => {
    (async () => {
      try {
        let access_token = await SecureStore.getItemAsync('access_token');
        setAccessToken(access_token);
        const result = await dispatch(fetchSellerOrder(access_token));
        console.log(result, '<<<<<<< order');
        setBuyerLatitude(sellerOrder.orders[0].User.location.coordinates[1]);
        setBuyerLongitude(sellerOrder.orders[0].User.location.coordinates[0]);
        setSellerLatitude(sellerOrder.locationSeller.coordinates[1]);
        setSellerLongitude(sellerOrder.locationSeller.coordinates[0]);
        setIsLoading(false);
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

  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371000; // Earth radius in meters
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in meters

    return Math.floor(distance);
  };

  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  console.log(sellerOrder, '<<<<<<<<<<<<');

  return (
    <ScrollView contentContainerStyle={[styles.container, stylesLib.bgColGrLight]}>
      <View>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View>
            {sellerOrder.orders.length === 0 ? (
              <Text>You have no order</Text>
            ) : (
              <View>
                {sellerOrder.orders.map((order) => (
                  <React.Fragment key={order.id}>
                    {(order.status === 'Waiting' || order.status === 'Canceled' || order.status === 'Processing' || order.status === 'Completed') && (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('SellerMapScreen', {
                            id: order.id,
                          })
                        }
                      >
                        <View style={[styles.cardContainer, stylesLib.bgColCr]}>
                          <Image source={{ uri: order.User.profilePicture }} style={styles.cardImage} />
                          {order.status === 'Canceled' && (
                            <View style={styles.overlay}>
                              <Text style={[styles.overlayTextCancelled]}>{order.status}</Text>
                            </View>
                          )}
                          {order.status === 'Completed' && (
                            <View style={styles.overlay}>
                              <Text style={[styles.overlayTextSuccess]}>{order.status}</Text>
                            </View>
                          )}

                          <View style={styles.cardDetails}>
                            <View>
                              <Text style={styles.cardTitle}>{order.User.username}</Text>
                              <Text>{haversineDistance(buyerLatitude, buyerLongitude, sellerLatitude, sellerLongitude)} meters</Text>
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
                ))}
              </View>
            )}
          </View>
        )}
      </View>
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
    backgroundColor: '#77DD77',
  },
  rejectButton: {
    backgroundColor: '#DB5856',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(128, 128, 128, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  overlayTextCancelled: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#DB5856',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  overlayTextSuccess: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#77DD77',
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
