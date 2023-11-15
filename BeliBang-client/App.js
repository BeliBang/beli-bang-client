import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/navigators/MainStack';
import { Provider } from 'react-redux';
import store from './store';

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <MainStack />
      </Provider>
    </NavigationContainer>
  );
}
