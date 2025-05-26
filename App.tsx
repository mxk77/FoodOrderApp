// App.tsx - Modified for your app
import 'react-native-gesture-handler';
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';

import { CartProvider } from './src/context/CartContext';

export default function App() {
  return (
    <CartProvider>
        <AppNavigator />
    </CartProvider>
  );
}