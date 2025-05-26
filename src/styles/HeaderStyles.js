// HeaderStyles.js
import { StyleSheet, Platform } from 'react-native';

// Re-define or import theme colors & fonts if they are not already globally available
// For example, if you have a central theme.js:
// import { themeColors, themeFonts } from './theme';

export const themeColors = {
  bgPrimary: '#fff9f0',        // from CSS var(--color-bg-primary)
  shadowWarm: 'rgba(180, 140, 100, 0.08)', // from CSS var(--color-shadow-warm)
  accentPrimary: '#ff8c61',    // from CSS var(--color-accent-primary)
  textSecondary: '#8d6e63',   // from CSS var(--color-text-secondary)
  accentSecondary: '#ffab76', // from CSS var(--color-accent-secondary)
};

export const themeFonts = {
  headings: 'Nunito', // Make sure 'Nunito' is available in your project
  // primary: 'Open Sans', // if needed from other components
};

const BASE_FONT_SIZE = 16; // Assuming 1em = 16px for conversion

export const styles = StyleSheet.create({
  appHeader: {
    backgroundColor: themeColors.bgPrimary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    // For box-shadow:
    ...Platform.select({
      ios: {
        shadowColor: themeColors.shadowWarm,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1, // CSS uses alpha in color, RN uses opacity
        shadowRadius: 15,
      },
      android: {
        elevation: 8, // Android's elevation for shadow
        // Note: Android elevation color is harder to customize directly like CSS shadow color
      },
    }),
    // position: 'sticky' behavior:
    // In React Native, true stickiness usually comes from placing the header
    // outside a ScrollView or using features of navigation libraries.
    // For a simple component, 'absolute' can mimic some aspects if the parent is structured accordingly.
    // If this header is meant to be globally sticky, it should be rendered at a higher level in your app.
    position: 'absolute', // Or 'relative' depending on how you structure your screen
    top: 0,
    left: 0,
    right: 0, // Ensures it takes full width if position is absolute
    zIndex: 1000,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%', // Redundant if left/right are set with position: 'absolute'
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontFamily: themeFonts.headings,
    fontSize: 1.8 * BASE_FONT_SIZE,
    fontWeight: '800', // In React Native, string '800' is correct
    color: themeColors.accentPrimary,
  },
  logoEmoji: {
    marginRight: 10,
    fontSize: 1.3 * BASE_FONT_SIZE,
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navLinkContainer: { // Container for Pressable
    marginLeft: 25,
    paddingBottom: 6, // For the border to have space
    borderBottomWidth: 3,
    borderBottomColor: 'transparent', // Default state
  },
  navLinkText: {
    fontFamily: themeFonts.headings,
    fontWeight: '600',
    color: themeColors.textSecondary,
  },
  navLinkActive: {
    borderBottomColor: themeColors.accentPrimary,
  },
  navLinkTextActive: {
    color: themeColors.accentPrimary,
  },
  navLinkTextHover: { // For press effect
    color: themeColors.accentSecondary,
  },
});