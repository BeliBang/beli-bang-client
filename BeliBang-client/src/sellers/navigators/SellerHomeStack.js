import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SellerHomeScreen from '../screens/SellerHomeScreen';
import AddFoodScreen from '../screens/AddFoodScreen';
import EditFoodScreen from '../screens/EditFoodScreen';
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
        name="AddFoodScreen"
        component={AddFoodScreen}
        // options={{
        //   headerShown: false,
        // }}
      />
      <Stack.Screen
        name="EditFoodScreen"
        component={EditFoodScreen}
        // options={{
        //   headerShown: false,
        // }}
      />
    </Stack.Navigator>
  );
}
