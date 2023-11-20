import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderSellerScreen from '../screens/OrderSellerScreen';
import SellerMapScreen from '../screens/SellerMapScreen';

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
        name="SellerMapScreen"
        component={SellerMapScreen}
        // options={{
        //   headerShown: false,
        // }}
      />
    </Stack.Navigator>
  );
}
