import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useCart } from '../../context/CartContext';
import styles from './HeaderStyles';

export default function Header({ navigation, currentRouteName = 'Menu' }) {
  const { totalItemCount } = useCart();

  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };

  const isLinkActive = (route) => route === currentRouteName;

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigateTo('Menu')} style={styles.logoContainer}>
        <Text style={styles.logoText}>🚚 FoodDelivery</Text>
      </Pressable>

      <View style={styles.navContainer}>
        <Pressable
          onPress={() => navigateTo('Menu')}
          style={styles.navItem}
        >
          <Text style={[
            styles.navText,
            isLinkActive('Menu') && styles.navTextActive
          ]}>
            Меню
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigateTo('Cart')}
          style={styles.navItem}
        >
          <Text style={[
            styles.navText,
            isLinkActive('Cart') && styles.navTextActive
          ]}>
            Кошик ({totalItemCount})
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigateTo('Profile')}
          style={styles.navItem}
        >
          <Text style={[
            styles.navText,
            isLinkActive('Profile') && styles.navTextActive
          ]}>
            Профіль
          </Text>
        </Pressable>
      </View>
    </View>
  );
}