import { View, Text } from 'react-native';

export default function DetailStore({ route }) {
  const storeId = route.params.storeId;
  return (
    <View>
      <Text>INI DETAIL STORE SCREEN : {storeId}</Text>
    </View>
  );
}
