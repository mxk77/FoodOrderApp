// src/components/layout/Header.js
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useCart } from '../../context/CartContext';

export default function Header({ navigation, currentRouteName = 'Menu' }) {
  const { totalItemCount } = useCart();

  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };

  const isLinkActive = (route) => route === currentRouteName;

  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
      }}
    >
      <Pressable onPress={() => navigateTo('Menu')}>
        <Text style={{ fontSize: 20 }}>🚚 FoodDelivery</Text>
      </Pressable>

      <View style={{ flexDirection: 'row' }}>
        <Pressable
          onPress={() => navigateTo('Menu')}
          style={{ marginHorizontal: 8 }}
        >
          <Text style={{ fontWeight: isLinkActive('Menu') ? 'bold' : 'normal' }}>
            Меню
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigateTo('Cart')}
          style={{ marginHorizontal: 8 }}
        >
          <Text style={{ fontWeight: isLinkActive('Cart') ? 'bold' : 'normal' }}>
            Кошик ({totalItemCount})
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigateTo('Profile')}
          style={{ marginHorizontal: 8 }}
        >
          <Text style={{ fontWeight: isLinkActive('Profile') ? 'bold' : 'normal' }}>
            Профіль
          </Text>
        </Pressable>
      </View>
    </View>
  );
}