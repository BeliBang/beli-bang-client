import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import ListStoresCard from '../components/ListStoresCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllStore, showStores } from '../../../store/actions/actionCreator';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

export default function ListStores() {
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
          console.log('sssssssss');
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

  // POSISI USER DI HARCODE DULU
  // let userLatitude = getLocation.coords.latitude;
  // let userLongitude = getLocation.coords.longitude;
  let userLatitude = -6.944393028777816;
  let userLongitude = 107.59063799989175;

  return (
    <ScrollView>
      <View>
        <View>
          {openStore.map((e) => {
            return (
              <ListStoresCard
                title={e.name}
                imageSource={e.imageUrl}
                rating="4"
                sellerLatitude={e.User.location.coordinates[1]}
                sellerLongitude={e.User.location.coordinates[0]}
                userLatitude={userLatitude}
                userLongitude={userLongitude}
                key={e.id}
                storeId={e.id}
              />
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}
