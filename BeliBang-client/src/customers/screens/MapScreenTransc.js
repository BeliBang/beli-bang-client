import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as SecureStore from 'expo-secure-store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDetailOrder } from '../../../store/actions/actionCreator';

export default function MapScreenTransc({ route }) {
  const orderId = route.params.id;
  const [isLoading, setIsLoading] = React.useState(true);
  const [accessToken, setAccessToken] = React.useState(null);
  const dispatch = useDispatch();
  const detailOrder = useSelector((state) => state.detailOrder);

  useEffect(() => {
    (async () => {
      try {
        let access_token = await SecureStore.getItemAsync('access_token');
        setAccessToken(access_token);
        const result = await dispatch(fetchDetailOrder(orderId, access_token));
        // console.log(result, '<<<<<<<<<');
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <View style={styles.container}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: detailOrder.customer.location.coordinates[1],
                longitude: detailOrder.customer.location.coordinates[0],
                latitudeDelta: 0.0022,
                longitudeDelta: 0.0021,
              }}
            >
              <Marker
                coordinate={{
                  latitude: detailOrder.customer.location.coordinates[1],
                  longitude: detailOrder.customer.location.coordinates[0],
                }}
                title={detailOrder.customer.username}
                description="Your Position"
              />
              <Marker
                coordinate={{
                  latitude: detailOrder.store.User.location.coordinates[1],
                  longitude: detailOrder.store.User.location.coordinates[0],
                }}
                title={detailOrder.store.name}
                description="Seller"
              />
            </MapView>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
