import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

export default function MapScreen() {
  const [getLocation, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        // bisa diganti jadi alert
        setErrorMsg('Permission to access location was denied');
        return navigation.navigate('UserHomeScreen');
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setLoading(false);
    })();
  }, []);

  //   let text = 'Waiting..';
  //   if (errorMsg) {
  //     text = errorMsg;
  //   } else if (getLocation) {
  //     text = JSON.stringify(getLocation);
  //   }
  //   console.log(text, '<<<<<< ini text');

  //   console.log(getLocation, '<<<<<<<<');

  return (
    <View>
      {loading ? (
        <Text>LOADING</Text>
      ) : (
        <View>
          <Text>INI GOOGLE MAP SCREEN</Text>
          <View style={styles.container}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: getLocation.coords.latitude,
                longitude: getLocation.coords.longitude,
                latitudeDelta: 0.0022,
                longitudeDelta: 0.0021,
              }}
            >
              <Marker
                coordinate={{
                  latitude: getLocation.coords.latitude,
                  longitude: getLocation.coords.longitude,
                }}
                title="Fahreza"
                description="Marker Description"
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
