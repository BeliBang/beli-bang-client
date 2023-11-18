import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderCustScreen from '../screens/OrderCustScreen';
import MapScreenTransc from '../screens/MapScreenTransc';

const Stack = createNativeStackNavigator();

export default function OrderStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OrderCustScreen"
        component={OrderCustScreen}
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
