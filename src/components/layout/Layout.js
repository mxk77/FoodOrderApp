// src/components/layout/Layout.js
import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  const navigation = useNavigation();
  const route = useRoute();
  const currentRouteName = route.name;

  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation={navigation}
        currentRouteName={currentRouteName}
      />

      <View style={styles.content}>
        {children}
      </View>

      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
});
