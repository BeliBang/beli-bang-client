import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SellerHomeScreen from '../screens/SellerHomeScreen';
import EditFoodScreen from '../screens/EditFoodScreen';
import MapScreen from '../screens/MapScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SellerHomeScreen"
        component={SellerHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="EditFoodScreen" 
        component={EditFoodScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
