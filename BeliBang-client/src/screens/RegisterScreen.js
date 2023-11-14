import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import stylesLib from '../../assets/styles/styles-lib';

export default function RegisterScreen() {
  return (
    <View style={[stylesLib.bgColGr, stylesLib.flex1]}>
      <View>
        <Text style={[stylesLib.colCr]}>username</Text>
        <TextInput style={[stylesLib.bgColCr]} />
      </View>
      <View>
        <Text style={[stylesLib.colCr]}>password</Text>
        <TextInput style={[stylesLib.bgColCr]} />
      </View>
      <View>
        <Text style={[stylesLib.colCr]}>Already have an account?</Text>
        <Text style={[stylesLib.colCr]}>log in here</Text>
      </View>
      <View>
        <TouchableOpacity style={[stylesLib.bgColCr]}>
          <Text>Buyer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[stylesLib.bgColCr]}>
          <Text>Seller</Text>
        </TouchableOpacity>
        </View>
      <View>
        <TouchableOpacity style={[stylesLib.bgColCr, stylesLib.w9]}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


