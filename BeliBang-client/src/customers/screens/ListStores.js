import { View, Text, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import ListStoresCard from '../components/ListStoresCard';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAllStore } from '../../../store/actions/actionCreator';

export default function ListStores() {
  //   ========= BELUM JALAN =======
  //   const stores = useSelector((state) => state.stores);

  //   const dispatch = useDispatch();
  //   useEffect(() => {
  //     dispatch(fetchAllStore())
  //       .then(() => {
  //         console.log('FETCH ALL STORE SUCCESS');
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, []);

  // posisi user sementara di hardcode
  let userLatitude = -6.944393028777816;
  let userLongitude = 107.59063799989175;

  return (
    <ScrollView>
      <View>
        <ListStoresCard
          title="Gerobak Mas Reza"
          imageSource="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEikdLvYYrJls_oY_h6OyzmWQLijl9qdiMFiKUmEKBWr7O7R4wmo4cwQOG5cIMQzRDT-q9rkENIWYaKIw3GoJ8JFkocS-9a98pA_u9p18521Q6rlNv_7NDs3n2dccSR8QlmPXhQk6mUONSQCTp6SHt0AH7uUBpYiaKkIVUwdB6a216GIM2gRcfWcurpEhA/w1200-h630-p-k-no-nu/Beli%201set%20Peralatan%20Hisana%20Fried%20Chicken%20Modal%20Rp.%203,7%20Juta.jpg"
          rating="4"
          sellerLatitude={-6.944068199740417}
          sellerLongitude={107.5907479704603}
          userLatitude={userLatitude}
          userLongitude={userLongitude}
        />

        <ListStoresCard
          title="Gerobak Mas Reza"
          imageSource="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEikdLvYYrJls_oY_h6OyzmWQLijl9qdiMFiKUmEKBWr7O7R4wmo4cwQOG5cIMQzRDT-q9rkENIWYaKIw3GoJ8JFkocS-9a98pA_u9p18521Q6rlNv_7NDs3n2dccSR8QlmPXhQk6mUONSQCTp6SHt0AH7uUBpYiaKkIVUwdB6a216GIM2gRcfWcurpEhA/w1200-h630-p-k-no-nu/Beli%201set%20Peralatan%20Hisana%20Fried%20Chicken%20Modal%20Rp.%203,7%20Juta.jpg"
          rating="4"
          sellerLatitude={-6.944068199740417}
          sellerLongitude={107.5907479704603}
          userLatitude={userLatitude}
          userLongitude={userLongitude}
        />
        <ListStoresCard
          title="Gerobak Mas Reza"
          imageSource="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEikdLvYYrJls_oY_h6OyzmWQLijl9qdiMFiKUmEKBWr7O7R4wmo4cwQOG5cIMQzRDT-q9rkENIWYaKIw3GoJ8JFkocS-9a98pA_u9p18521Q6rlNv_7NDs3n2dccSR8QlmPXhQk6mUONSQCTp6SHt0AH7uUBpYiaKkIVUwdB6a216GIM2gRcfWcurpEhA/w1200-h630-p-k-no-nu/Beli%201set%20Peralatan%20Hisana%20Fried%20Chicken%20Modal%20Rp.%203,7%20Juta.jpg"
          rating="4"
          sellerLatitude={-6.944068199740417}
          sellerLongitude={107.5907479704603}
          userLatitude={userLatitude}
          userLongitude={userLongitude}
        />
        <ListStoresCard
          title="Gerobak Mas Reza"
          imageSource="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEikdLvYYrJls_oY_h6OyzmWQLijl9qdiMFiKUmEKBWr7O7R4wmo4cwQOG5cIMQzRDT-q9rkENIWYaKIw3GoJ8JFkocS-9a98pA_u9p18521Q6rlNv_7NDs3n2dccSR8QlmPXhQk6mUONSQCTp6SHt0AH7uUBpYiaKkIVUwdB6a216GIM2gRcfWcurpEhA/w1200-h630-p-k-no-nu/Beli%201set%20Peralatan%20Hisana%20Fried%20Chicken%20Modal%20Rp.%203,7%20Juta.jpg"
          rating="4"
          sellerLatitude={-6.944068199740417}
          sellerLongitude={107.5907479704603}
          userLatitude={userLatitude}
          userLongitude={userLongitude}
        />
      </View>
    </ScrollView>
  );
}
