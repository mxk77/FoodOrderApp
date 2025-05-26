// src/pages/NotFoundPage.js (or your chosen path)

import React from 'react';
import { View, Text, Pressable, SafeAreaView } from 'react-native';
// Assuming Layout is optional for this page, or it will be wrapped by the navigator if needed.
// If always inside Layout, SafeAreaView might be redundant here if Layout handles it.
// import Layout from '../components/layout/Layout';
import { styles } from '../styles/NotFoundPageStyles'; // Adjust path

// The 'navigation' prop is passed by React Navigation to screen components
export default function NotFoundPage({ navigation }) {
  const handleGoHome = () => {
    // Navigate to your main/home screen, assuming its name in the navigator is 'Menu'
    navigation.navigate('Menu');
    // Or, to reset the navigation stack to the home screen:
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'Menu' }],
    // });
  };

  // Decide if this page should be within your standard App Layout or standalone
  // For a standalone feel (like many 404 pages):
  return (
    <SafeAreaView style={{flex: 1 /* Ensure SafeAreaView takes full screen */}}>
      <View style={styles.container}>
        <Text style={styles.title}>404 — Сторінку не знайдено</Text>
        <Text style={styles.message}>
          На жаль, сторінка, яку ви намагаєтеся знайти, не існує або була переміщена.
        </Text>
        <View style={styles.actionsContainer}>
          <Pressable
            onPress={handleGoHome}
            style={({ pressed }) => [
              styles.homeButton,
              pressed && styles.homeButtonPressed,
            ]}
            accessibilityRole="button"
          >
            <Text style={styles.homeButtonText}>Повернутись на головну</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}