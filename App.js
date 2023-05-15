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
// modal bottom config
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { withExpoSnack } from 'nativewind';

function App() {
  // font
  const [fontsLoaded] = useFonts({
    Itim_400Regular,
  });
  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <GestureHandlerRootView className='flex-1'>
          <BottomSheetModalProvider>
            <NavigationContainer>
              <Routes />
            </NavigationContainer>
            <Toast />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

export default App;