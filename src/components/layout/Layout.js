// src/components/layout/Layout.js
import React from 'react';
import { View, SafeAreaView } from 'react-native';
import Header from './Header';
import Footer from './Footer';
// Ensure styles are imported correctly, and HEADER_HEIGHT is available if used in styles
import { styles as layoutLocalStyles } from '../../styles/LayoutStyles';

export default function Layout({ children, currentRouteName }) {
  return (
    <SafeAreaView style={layoutLocalStyles.siteContainer}>
      <Header currentRouteName={currentRouteName} />
      {/* mainContentOuterContainer provides flex: 1 and paddingTop for Header */}
      <View style={layoutLocalStyles.mainContentOuterContainer}>
        {/* Children are rendered directly. They manage their own scrolling. */}
        {/* The styles for maxWidth, padding, etc., originally on mainContentInnerContainer
            should now be applied by the child pages themselves or to mainContentOuterContainer
            if they are meant to be universally applied to the content area. */}
        {children}
      </View>
      <Footer />
    </SafeAreaView>
  );
}