import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import MainTab from './src/customers/navigators/MainTab';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MainTab />
      {/* <Stack.Navigator>
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator> */}
    </NavigationContainer>
  );
}
