// AppNavigator.js (or navigation/AppNavigator.js, etc.)

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screen components (ensure these are React Native components)
import MenuPage from '../pages/MenuPage';       // e.g., src/pages/MenuPage.js
import CartPage from '../pages/CartPage';       // e.g., src/pages/CartPage.js
import ProfilePage from '../pages/ProfilePage';   // e.g., src/pages/ProfilePage.js
import ConfirmationPage from '../pages/ConfirmationPage'; // e.g., src/pages/ConfirmationPage.js
import NotFoundPage from '../pages/NotFoundPage';   // e.g., src/pages/NotFoundPage.js

// If your Layout component includes Header/Footer that should NOT be part of the stack's own header:
// import Layout from '../components/layout/Layout'; // Assuming your RN Layout

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Menu" // Corresponds to path="/"
        screenOptions={{
          // You can define global screen options here, e.g., header style
          // headerShown: false, // If your Layout component already provides a header
        }}
      >
        <Stack.Screen
          name="Menu"
          component={MenuPage}
          // options={{ title: 'Food Delivery Menu' }} // Example: Screen-specific options
        />
        <Stack.Screen
          name="Cart"
          component={CartPage}
          // options={{ title: 'Your Cart' }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfilePage}
          // options={{ title: 'Your Profile' }}
        />
        <Stack.Screen
          name="Confirmation"
          component={ConfirmationPage}
          // options={{ title: 'Order Confirmation' }}
        />
        <Stack.Screen
          name="NotFound" // Explicit screen name for "Not Found"
          component={NotFoundPage}
          // options={{ title: 'Page Not Found' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}