// FooterStyles.js
import { StyleSheet } from 'react-native';

// Define your theme colors (can also be imported from a central theme file)
export const themeColors = {
  bgPrimary: '#fff9f0',
  borderLight: '#f0e0d0',
  textSecondary: '#8d6e63',
  accentSecondary: '#ffab76',
};

// Define your font (ensure this font is linked in your React Native project)
export const themeFonts = {
  primary: 'Open Sans', // Make sure 'Open Sans' is available in your project
};

export const staticStyles = StyleSheet.create({
  appFooter: {
    backgroundColor: themeColors.bgPrimary,
    paddingVertical: 25,
    paddingHorizontal: 30,
    borderTopWidth: 1,
    borderTopColor: themeColors.borderLight,
    marginTop: 2 * 16, // Assuming 1rem = 16 (adjust if needed)
    fontFamily: themeFonts.primary,
    width: '100%',
  },
  text: {
    color: themeColors.textSecondary,
    fontSize: 0.9 * 16,
    fontFamily: themeFonts.primary,
  },
  phoneLink: {
    color: themeColors.textSecondary,
    fontFamily: themeFonts.primary,
    fontSize: 0.9 * 16,
  },
  phoneLinkHover: {
    color: themeColors.accentSecondary,
  },
});

// Function to generate dynamic styles
// This is one way to handle styles that depend on props or state (like screenWidth)
export const getDynamicStyles = (isLargeScreen) => StyleSheet.create({
  content: {
    flexDirection: isLargeScreen ? 'row' : 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: isLargeScreen ? 'nowrap' : 'wrap',
    gap: 15,
    maxWidth: 1200,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
  },
  copyright: {
    flexBasis: isLargeScreen ? 'auto' : '100%',
    textAlign: isLargeScreen ? 'left' : 'center',
  },
  contacts: {
    flexBasis: isLargeScreen ? 'auto' : '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: isLargeScreen ? 'flex-end' : 'center',
    gap: 25,
    flexWrap: 'wrap',
  },
});