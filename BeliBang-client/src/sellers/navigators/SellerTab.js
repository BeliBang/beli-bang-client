import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import stylesLib from '../../../assets/styles/styles-lib';
import WeatherScreen from '../screens/WeatherScreen';
import SellerHomeScreen from '../screens/SellerHomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HistoryScreen from '../screens/HistoryScreen';
import OrderSellerScreen from '../screens/OrderSellerScreen';

const Tab = createBottomTabNavigator();

export default function SellerTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          height: 70,
          paddingHorizontal: 5,
          paddingTop: 0,
          backgroundColor: stylesLib.colGrBold.color,
          position: 'absolute',
          borderTopWidth: 0,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={SellerHomeScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size, focused }) => <Ionicons name="home" size={24} color={focused ? '#FEF5ED' : stylesLib.colCr.color} />,
        }}
      />
      <Tab.Screen
        name="Order Seller"
        component={OrderSellerScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size, focused }) => <Feather name="list" size={24} color={focused ? '#FEF5ED' : stylesLib.colCr.color} />,
        }}
      />
      <Tab.Screen
        name="Weather"
        component={WeatherScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size, focused }) => <MaterialCommunityIcons name="weather-partly-cloudy" size={24} color={focused ? '#FEF5ED' : stylesLib.colCr.color} />,
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size, focused }) => <MaterialCommunityIcons name="history" size={24} color={focused ? '#FEF5ED' : stylesLib.colCr.color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size, focused }) => <Ionicons name="person-circle-outline" size={24} color={focused ? '#FEF5ED' : stylesLib.colCr.color} />,
        }}
      />
    </Tab.Navigator>
  );
}
