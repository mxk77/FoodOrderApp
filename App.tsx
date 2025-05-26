import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigator from './src/navigation/AppNavigator';
import { CartProvider } from './src/context/CartContext';
import globalStyles from './src/styles/globalStyles';

export default function App() {
  return (
    <GestureHandlerRootView style={globalStyles.appScreen}>
      <SafeAreaProvider>
        <CartProvider>
          <AppNavigator />
        </CartProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
