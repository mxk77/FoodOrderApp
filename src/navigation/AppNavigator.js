import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MenuPage from '../pages/MenuPage';
import CartPage from '../pages/CartPage';
import ProfilePage from '../pages/ProfilePage';
import ConfirmationPage from '../pages/ConfirmationPage';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Menu"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Menu"
          component={MenuPage}
        />
        <Stack.Screen
          name="Cart"
          component={CartPage}
        />
        <Stack.Screen
          name="Profile"
          component={ProfilePage}
        />
        <Stack.Screen
          name="Confirmation"
          component={ConfirmationPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}