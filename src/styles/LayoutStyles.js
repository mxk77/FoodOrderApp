// src/components/layout/LayoutStyles.js (or your actual path)

import { StyleSheet, Dimensions } from 'react-native';
// Import the global theme
import theme from './theme'; // Adjust path as needed (e.g., '../theme' or '../../../theme')

const SCREEN_WIDTH = Dimensions.get('window').width;

// IMPORTANT: You need to determine the actual height of your absolute-positioned Header.
// This could be a fixed value if your header height is static,
// or you might need to measure it dynamically in some cases.
// For now, let's use a placeholder value. Adjust it to your Header's actual height.
// This could also potentially be defined in or derived from the theme if header size is part of design tokens.
export const HEADER_HEIGHT = 60; // Example: Adjust this value!

export const styles = StyleSheet.create({
  siteContainer: {
    flex: 1,
    backgroundColor: theme.colors.bgPrimary, // Using global theme color
  },
  mainContentOuterContainer: {
    flex: 1,
    width: '100%',
    paddingTop: HEADER_HEIGHT, // Accounts for the absolutely positioned Header
  },
  mainContentScrollView: {
    flexGrow: 1,
  },
  mainContentInnerContainer: {
    // This container has specific layout rules (maxWidth: 800px)
    // different from the more general globalStyles.appContainer (maxWidth: 1200px)
    // So, we define its styles here, using theme.SIZES.base for consistent unit scaling.
    width: '100%',
    maxWidth: 800, // Specific to this Layout's main content area
    alignSelf: 'center',
    paddingVertical: 2 * theme.SIZES.base, // Using theme.SIZES.base (e.g., 2 * 16)
    paddingHorizontal: SCREEN_WIDTH > 850
      ? 1.5 * theme.SIZES.base // Using theme.SIZES.base (e.g., 1.5 * 16)
      : 1 * theme.SIZES.base,   // Using theme.SIZES.base (e.g., 1 * 16)
  },
});