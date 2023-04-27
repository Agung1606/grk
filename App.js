// react
import React from 'react';
// toast
import Toast from 'react-native-toast-message';
// font
import { useFonts, Itim_400Regular} from '@expo-google-fonts/itim'
// route
import { NavigationContainer } from '@react-navigation/native';
// state 
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { store } from './state'
import Routes from './Routes';

export default function App() {
  // font
  const [fontsLoaded] = useFonts({
    Itim_400Regular,
  });
  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
        <Toast />
      </PersistGate>
    </Provider>
  );
}