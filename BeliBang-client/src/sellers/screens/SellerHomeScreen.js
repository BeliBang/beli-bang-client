import { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSellerStore } from '../../../store/actions/actionCreator';
import * as React from 'react';
import { Card } from 'react-native-paper';
import stylesLib from '../../../assets/styles/styles-lib';
import * as SecureStore from 'expo-secure-store';

export default function SellerHomeScreen({ navigation, food }) {
  const dispatch = useDispatch();
  const store = useSelector((state) => {
    return state.sellerStore;
  });

  useEffect(() => {
    (async () => {
      try {
        let userId = await SecureStore.getItemAsync('userId');
        let access_token = await SecureStore.getItemAsync('access_token');
        await dispatch(fetchSellerStore({ userId, access_token }));
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  // console.log(store, '<<<<<<<<');

  return (
    <SafeAreaView style={[stylesLib.flex1, stylesLib.bgColGrLight]}>
      <ScrollView>
        <View style={[stylesLib.bgColGrLight, { padding: 10, paddingBottom: 80 }]}>
          <Card style={[{ marginBottom: 20, borderRadius: 30 }]}>
            <Card.Cover source={{ uri: store.imageUrl }} style={[styles.foodImage, { borderRadius: 20, overflow: 'hidden' }]} />
          </Card>
          <View style={[{ marginBottom: 20 }]}>
            <View>
              {store.status ? (
                <View style={[{ borderRadius: 20 }]}>
                  <TouchableOpacity>
                    <Text style={[styles.statusBtn, stylesLib.colCr, { borderRadius: 20, fontSize: 20, fontWeight: '900', textAlign: 'center', backgroundColor: '#77DD77' }]}>OPEN</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <TouchableOpacity>
                    <Text style={[styles.statusBtn, stylesLib.colCr, { borderRadius: 20, fontSize: 20, fontWeight: '900', backgroundColor: '#DB5856', textAlign: 'center' }]}>CLOSE</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
          <View style={[stylesLib.pad10]}>
            <Text style={[stylesLib.colCr, { fontSize: 30, fontWeight: '700' }]}>{store.name}</Text>
            <Text style={[stylesLib.colCr, { fontSize: 20, textAlign: 'justify' }]}>{store.description}</Text>
            <View style={[{ alignSelf: 'flex-end', marginTop: 10, marginBottom: 15 }]}>
              <TouchableOpacity>
                <Text style={[styles.statusBtn, stylesLib.bgColCr, stylesLib.colGrLight, { borderRadius: 20, fontWeight: '900', fontSize: 15 }]}>TAMBAH MAKAN+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            {store.Food.map((food, id) => {
              return (
                <Card key={id} style={styles.foodCard}>
                  <Card.Cover source={{ uri: food.imageUrl }} style={styles.foodImage} />
                  <Card.Content>
                    <View style={[{ marginTop: 15, marginBottom: 10 }]}>
                      <Text style={[stylesLib.colGrBold, { fontWeight: '800', fontSize: 25 }]}>{food.name}</Text>
                      <Text style={[stylesLib.colGrBold, { fontWeight: '600', fontSize: 20 }]}>{food.price}</Text>
                    </View>
                    <View style={[{ marginBottom: 10 }]}>
                      <Text style={[stylesLib.colGrBold, { fontWeight: '500', fontSize: 15, textAlign: 'justify' }]}>{food.description}</Text>
                    </View>
                    <View style={[{ flexDirection: 'row', justifyContent: 'space-evenly' }]}>
                      <View style={[{ borderRadius: 20 }]}>
                        <TouchableOpacity>
                          <Text style={[styles.statusBtn, stylesLib.pad20, stylesLib.bgColGrLight, stylesLib.colCr, { borderRadius: 20, fontWeight: '900' }]}>EDIT</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={[{ borderRadius: 20 }]}>
                        <TouchableOpacity>
                          <Text style={[styles.statusBtn, stylesLib.colCr, { borderRadius: 20, fontWeight: '900', backgroundColor: '#DB5856' }]}>DELETE</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Card.Content>
                </Card>
              );
            })}
          </View>
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
    backgroundColor: 'rgb(236, 227, 206)',
  },
  foodImage: {
    height: 200,
    padding: 10,
    backgroundColor: 'rgb(236, 227, 206)',
  },
});
