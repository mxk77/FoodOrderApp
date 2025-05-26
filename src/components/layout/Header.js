// Header.js
import React from 'react';
import { View, Text, Pressable } from 'react-native';
// Assuming useCart is adapted for React Native or you have a similar context
// import { useCart } from '../../context/CartContext';
import { styles, themeColors } from '../../styles/HeaderStyles'; // Import styles

// Placeholder for useCart if not set up yet for React Native
const useCart = () => ({ totalItemCount: 0 }); // Replace with your actual context

// To simulate NavLink's isActive, you'd typically get the current route
// from your navigation state (e.g., using React Navigation hooks).
// For this example, let's assume currentRoute is passed as a prop or derived.
// Example: const currentRoute = navigation.getCurrentRoute().name;

export default function Header({ navigation, currentRouteName = "Menu" }) { // `navigation` prop from React Navigation
  const { totalItemCount } = useCart();

  const navigateTo = (screenName) => {
    // In a real app with React Navigation:
    // navigation.navigate(screenName);
    console.log(`Maps to ${screenName}`); // Placeholder action
  };

  // Helper to determine if a link is active
  const isLinkActive = (routeName) => routeName === currentRouteName;

  return (
    <View style={styles.appHeader}>
      <Pressable onPress={() => navigateTo('Menu')} style={styles.logoContainer}>
        <Text style={styles.logoEmoji} accessibilityLabel="Логотип служби доставки">
          🚚
        </Text>
        <Text style={styles.logoText}>FoodDelivery</Text>
      </Pressable>

      <View style={styles.nav}>
        <Pressable
          onPress={() => navigateTo('Menu')}
          style={[
            styles.navLinkContainer,
            isLinkActive('Menu') && styles.navLinkActive,
          ]}
        >
          {({ pressed }) => (
            <Text style={[
              styles.navLinkText,
              isLinkActive('Menu') && styles.navLinkTextActive,
              pressed && !isLinkActive('Menu') && styles.navLinkTextHover // Hover only if not active
            ]}>
              Меню
            </Text>
          )}
        </Pressable>

        <Pressable
          onPress={() => navigateTo('Cart')}
          style={[
            styles.navLinkContainer,
            isLinkActive('Cart') && styles.navLinkActive,
          ]}
        >
          {({ pressed }) => (
            <Text style={[
              styles.navLinkText,
              isLinkActive('Cart') && styles.navLinkTextActive,
              pressed && !isLinkActive('Cart') && styles.navLinkTextHover
            ]}>
              Кошик ({totalItemCount})
            </Text>
          )}
        </Pressable>

        <Pressable
          onPress={() => navigateTo('Profile')}
          style={[
            styles.navLinkContainer,
            isLinkActive('Profile') && styles.navLinkActive,
          ]}
        >
          {({ pressed }) => (
            <Text style={[
              styles.navLinkText,
              isLinkActive('Profile') && styles.navLinkTextActive,
              pressed && !isLinkActive('Profile') && styles.navLinkTextHover
            ]}>
              Профіль
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}