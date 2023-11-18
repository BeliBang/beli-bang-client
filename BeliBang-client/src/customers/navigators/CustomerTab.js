import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import UserHomeScreen from '../screens/UserHomeScreen';
import LikeScreen from '../screens/LikeScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
// import OrderCustScreen from '../screens/OrderCustScreen';
import { Ionicons, Entypo, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import stylesLib from '../../../assets/styles/styles-lib';
import HomeStack from './HomeStack';
import OrderStack from './OrderStack';

const Tab = createBottomTabNavigator();

export default function CustomerTab() {
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
        component={HomeStack}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size, focused }) => <Ionicons name="home" size={24} color={focused ? '#FEF5ED' : stylesLib.colCr.color} />,
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={LikeScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size, focused }) => <Entypo name="heart" size={24} color={focused ? '#FEF5ED' : stylesLib.colCr.color} />,
        }}
      />
      <Tab.Screen
        name="Order"
        component={OrderStack}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size, focused }) => <Feather name="list" size={24} color={focused ? '#FEF5ED' : stylesLib.colCr.color} />,
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
