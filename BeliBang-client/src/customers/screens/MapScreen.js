import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { showStores, updateLocationUser } from '../../../store/actions/actionCreator';
import * as SecureStore from 'expo-secure-store';

export default function MapScreen() {
  const [getLocation, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const openStore = useSelector((state) => {
    return state.openStore;
  });

  useEffect(() => {
    if (openStore.length === 0) {
      (async () => {
        try {
          // let { status } = await Location.requestForegroundPermissionsAsync();
          // if (status !== 'granted') {
          //   setErrorMsg('Permission to access location was denied');
          //   return navigation.navigate('UserHomeScreen');
          // }

          // let currentLocation = await Location.getCurrentPositionAsync({});
          let access_token = await SecureStore.getItemAsync('access_token');
          // setLocation(currentLocation);
          // await dispatch(updateLocationUser(currentLocation, access_token));
          await dispatch(showStores(access_token));

          setLoading(false);
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [getLocation]);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (getLocation) {
    text = JSON.stringify(getLocation);
  }
  console.log(text, '<<<<<< ini text');

  return (
    <View>
      <View>
        <Text>INI GOOGLE MAP SCREEN</Text>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={{
              // latitude: getLocation.coords.latitude,
              // longitude: getLocation.coords.longitude,
              // latitude: -6.93097969657812,
              // longitude: 107.58841195515005,
              // latitudeDelta: 0.0022,
              // longitudeDelta: 0.0021,
              latitude: -6.343346445029737,
              longitude: 106.9465023020914,
              latitudeDelta: 0.0022,
              longitudeDelta: 0.0021,
            }}
          >
            <Marker
              coordinate={{
                latitude: -6.343346445029737,
                longitude: 106.9465023020914,
              }}
              title="Fahreza"
              description="Marker Description"
            />
            {openStore.map((e) => {
              return (
                <Marker
                  coordinate={{
                    latitude: e.User.location.coordinates[1],
                    longitude: e.User.location.coordinates[0],
                  }}
                  title={e.name}
                  key={e.id}
                />
              );
            })}
          </MapView>
        </View>
      </View>
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
