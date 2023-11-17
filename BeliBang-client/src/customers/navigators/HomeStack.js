import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserHomeScreen from '../screens/UserHomeScreen';
import MapScreen from '../screens/MapScreen';
import ListStores from '../screens/ListStores';
import DetailStore from '../screens/DetailStore';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UserHomeScreen"
        component={UserHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="ListStores" component={ListStores} />
      <Stack.Screen name="DetailStore" component={DetailStore} />
    </Stack.Navigator>
  );
}
