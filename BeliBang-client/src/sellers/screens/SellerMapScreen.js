import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as SecureStore from 'expo-secure-store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDetailOrder } from '../../../store/actions/actionCreator';
import stylesLib from '../../../assets/styles/styles-lib';
import MapViewDirections from 'react-native-maps-directions';

export default function SellerMapScreen({ route }) {
  const orderId = route.params.id;
  const [getLocation, setLocation] = useState(null);
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
        console.log(result, '<<<<<<<<<');
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
                latitude: detailOrder.store.User.location.coordinates[1],
                longitude: detailOrder.store.User.location.coordinates[0],
                latitudeDelta: 0.0022,
                longitudeDelta: 0.0021,
              }}
            >
              <MapViewDirections
                origin={{
                  latitude: detailOrder.store.User.location.coordinates[1],
                  longitude: detailOrder.store.User.location.coordinates[0],
                }}
                destination={{
                  latitude: detailOrder.customer.location.coordinates[1],
                  longitude: detailOrder.customer.location.coordinates[0],
                }}
                apikey="AIzaSyBgg7wUs0UDo5Z_8X6OXCns06fwoUoyK2A"
                strokeWidth={4}
                strokeColor={stylesLib.colRed.color}
              />
              <Marker
                coordinate={{
                  latitude: detailOrder.store.User.location.coordinates[1],
                  longitude: detailOrder.store.User.location.coordinates[0],
                }}
                title={detailOrder.store.name}
                description="Your Position"
                pinColor={stylesLib.colRed.color}
              />
              <Marker
                coordinate={{
                  latitude: detailOrder.customer.location.coordinates[1],
                  longitude: detailOrder.customer.location.coordinates[0],
                }}
                title={detailOrder.customer.username}
                description="Customer"
                pinColor={stylesLib.bgColCr.backgroundColor}
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
