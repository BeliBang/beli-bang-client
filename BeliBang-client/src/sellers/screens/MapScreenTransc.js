import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapScreenTransc() {
  const [getLocation, setLocation] = useState(null);
  // const [errorMsg, setErrorMsg] = useState(null);
  // const [loading, setLoading] = useState(true);

  return (
    <View>
      <View>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: -6.94391578039737,
              longitude: 107.59035604976992,
              latitudeDelta: 0.0022,
              longitudeDelta: 0.0021,
            }}
          >
            <Marker
              coordinate={{
                latitude: -6.94391578039737,
                longitude: 107.59035604976992,
              }}
              title="Fahreza"
              description="Your Position"
            />
            <Marker
              coordinate={{
                latitude: -6.943857204627624,
                longitude: 107.59072957213853,
              }}
              title="Pedagang A"
              description="On The Way"
            />
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
