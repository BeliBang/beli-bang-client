import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderSellerScreen from '../screens/OrderSellerScreen';
import MapScreenTransc from '../screens/MapScreenTransc';

const Stack = createNativeStackNavigator();

export default function OrderStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OrderSellerScreen"
        component={OrderSellerScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MapScreenTransc"
        component={MapScreenTransc}
        // options={{
        //   headerShown: false,
        // }}
      />
    </Stack.Navigator>
  );
}
