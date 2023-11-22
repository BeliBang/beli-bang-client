import { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFood, fetchSellerStore, updateLocationUser, updateStatusStore } from '../../../store/actions/actionCreator';
import * as React from 'react';
import { Card } from 'react-native-paper';
import stylesLib from '../../../assets/styles/styles-lib';
import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';

export default function SellerHomeScreen({ navigation, food }) {
  const dispatch = useDispatch();
  const store = useSelector((state) => {
    return state.sellerStore;
  });
  const [isLoading, setIsLoading] = React.useState(true);
  const [statusStore, setStatusStore] = React.useState(false);
  const [accessToken, setAccessToken] = React.useState(null);
  const [getLocation, setLocation] = React.useState(null);

  useEffect(() => {
    (async () => {
      try {
        const permission = await Location.requestForegroundPermissionsAsync();
        if (permission.status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }
        let access_token = await SecureStore.getItemAsync('access_token');
        setAccessToken(access_token);
        const result = await dispatch(fetchSellerStore({ access_token }));
        setStatusStore(result.status);
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        const setLocationUser = await dispatch(updateLocationUser(currentLocation, access_token));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      (async () => {
        try {
          const permission = await Location.requestForegroundPermissionsAsync();
          if (permission.status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
          }
          let access_token = await SecureStore.getItemAsync('access_token');
          let currentLocation = await Location.getCurrentPositionAsync({});
          setLocation(currentLocation);
          const setLocationUser = await dispatch(updateLocationUser(currentLocation, access_token));
        } catch (err) {
          console.log(err);
        }
      })();
    }, 50000);
    return () => clearInterval(interval);
  }, []);

  function closeStore() {
    const formData = {
      name: store.name,
      imageUrl: store.imageUrl,
      description: store.description,
      status: false,
    };
    dispatch(updateStatusStore(formData, store.id, accessToken)).then(() => {
      console.log('SUCCESS CLOSE STORE !');
    });
    setStatusStore(false);
  }

  function openStore() {
    const formData = {
      name: store.name,
      imageUrl: store.imageUrl,
      description: store.description,
      status: true,
    };
    dispatch(updateStatusStore(formData, store.id, accessToken)).then(() => {
      console.log('SUCCESS OPEN STORE !');
    });

    setStatusStore(true);
  }

  function clickDeleteFood(foodId) {
    dispatch(deleteFood(foodId, accessToken))
      .then(() => {
        dispatch();
        console.log('SUCCESS DELETE FOOD !');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function formatCurrency(amount) {
    const integerAmount = parseInt(amount, 10);
    if (isNaN(integerAmount)) {
      return 'Invalid Input';
    }
    const formattedAmount = integerAmount.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });
    return `Rp${formattedAmount}`;
  }

  return (
    <SafeAreaView style={[stylesLib.flex1, stylesLib.bgColPri]}>
      <ScrollView>
        <View>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <View style={[stylesLib.bgColPri, { padding: 10, paddingBottom: 80 }]}>
              <Card style={[{ marginBottom: 20, borderRadius: 30 }]}>
                <Card.Cover source={{ uri: store.imageUrl }} style={[styles.foodImage, { borderRadius: 20, overflow: 'hidden' }]} />
              </Card>
              <View style={[{ marginBottom: 20 }]}>
                <View>
                  {!statusStore ? (
                    <View style={[{ borderRadius: 20 }]}>
                      <TouchableOpacity onPress={openStore}>
                        <Text style={[styles.statusBtn, stylesLib.colPri, stylesLib.bgColTer, { borderRadius: 20, fontSize: 20, fontWeight: '900', textAlign: 'center' }]}>OPEN</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View>
                      <TouchableOpacity onPress={closeStore}>
                        <Text style={[styles.statusBtn, stylesLib.colPri, stylesLib.bgColTer, { borderRadius: 20, fontSize: 20, fontWeight: '900', textAlign: 'center' }]}>CLOSE</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
              <View style={[stylesLib.pad10]}>
                <Text style={[stylesLib.colSec, { fontSize: 25, fontWeight: '700', marginTop: 15, marginBottom: 10 }]}>{store.name}</Text>
                <Text style={[stylesLib.colSec, { fontSize: 20, textAlign: 'justify', fontStyle: 'italic' }]}>"{store.description}"</Text>
                <View style={[{ alignSelf: 'flex-end', marginTop: 15, marginBottom: 15 }]}>
                  <TouchableOpacity onPress={() => navigation.navigate('AddFoodScreen')}>
                    <Text style={[styles.statusBtn, stylesLib.colPri, stylesLib.bgColTer, { borderRadius: 20, fontWeight: '900', fontSize: 15 }]}>CREATE FOOD +</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                {store.Food && store.Food.length > 0 ? (
                  store.Food.map((food, id) => {
                    return (
                      <Card key={id} style={styles.foodCard}>
                        <Card.Cover source={{ uri: food.imageUrl }} style={styles.foodImage} />
                        <Card.Content>
                          <View style={[{ marginTop: 15, marginBottom: 10 }]}>
                            <Text style={[stylesLib.colPri, { fontWeight: '800', fontSize: 25 }]}>{food.name}</Text>
                            <Text style={[stylesLib.colPri, { fontWeight: '600', fontSize: 20 }]}>{formatCurrency(food.price)}</Text>
                          </View>
                          <View style={[{ marginBottom: 10 }]}>
                            <Text style={[stylesLib.colPri, { fontWeight: '500', fontSize: 15, textAlign: 'justify' }]}>{food.description}</Text>
                          </View>
                          <View style={[{ flexDirection: 'row', justifyContent: 'space-evenly' }]}>
                            <View style={[{ borderRadius: 20 }]}>
                              <TouchableOpacity onPress={() => navigation.navigate('EditFoodScreen', { id: food.id })}>
                                <Text style={[styles.statusBtn, stylesLib.pad20, stylesLib.bgColTer, stylesLib.colPri, { borderRadius: 20, fontWeight: '900' }]}>EDIT</Text>
                              </TouchableOpacity>
                            </View>
                            <View style={[{ borderRadius: 20 }]}>
                              <TouchableOpacity onPress={() => clickDeleteFood(food.id)}>
                                <Text style={[styles.statusBtn, stylesLib.colPri, { borderRadius: 20, fontWeight: '900' }]}>DELETE</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </Card.Content>
                      </Card>
                    );
                  })
                ) : (
                  <Text></Text>
                )}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  statusBtn: {
    padding: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  foodCard: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: stylesLib.bgColSec.backgroundColor,
  },
  foodImage: {
    height: 200,
    padding: 10,
    backgroundColor: stylesLib.bgColSec.backgroundColor,
  },
});
