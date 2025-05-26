// src/globalStyles.js
import { StyleSheet } from 'react-native';
import theme from './theme'; // Import your theme

const globalStyles = StyleSheet.create({
  // --- Base Text Styles (Not automatically applied, see "Applying Global Styles") ---
  // You would typically create custom Text components or apply these manually
  baseText: {
    fontFamily: theme.fonts.primary,
    fontSize: theme.SIZES.body,
    color: theme.colors.textPrimary,
    lineHeight: theme.SIZES.body * theme.LINE_HEIGHTS.body,
  },
  paragraph: { // For <p> like elements
    fontFamily: theme.fonts.primary,
    fontSize: theme.SIZES.body,
    color: theme.colors.textPrimary,
    lineHeight: theme.SIZES.body * theme.LINE_HEIGHTS.body,
    marginBottom: 1 * theme.SIZES.base, // 1em margin
  },

  // --- Heading Styles (Create <H1>, <H2> components or apply manually) ---
  h1: {
    fontFamily: theme.fonts.headingsBold, // Assuming headings are bold
    fontSize: theme.SIZES.h1,
    color: theme.colors.textHeadings,
    lineHeight: theme.SIZES.h1 * theme.LINE_HEIGHTS.headings,
    marginBottom: 0.75 * theme.SIZES.base, // 0.75em margin
  },
  h2: {
    fontFamily: theme.fonts.headingsBold,
    fontSize: theme.SIZES.h2,
    color: theme.colors.textHeadings,
    lineHeight: theme.SIZES.h2 * theme.LINE_HEIGHTS.headings,
    marginBottom: 0.75 * theme.SIZES.base,
  },
  h3: {
    fontFamily: theme.fonts.headingsBold,
    fontSize: theme.SIZES.h3,
    color: theme.colors.textHeadings,
    lineHeight: theme.SIZES.h3 * theme.LINE_HEIGHTS.headings,
    marginBottom: 0.75 * theme.SIZES.base,
  },
  h4: {
    fontFamily: theme.fonts.headingsBold,
    fontSize: theme.SIZES.h4,
    color: theme.colors.textHeadings,
    lineHeight: theme.SIZES.h4 * theme.LINE_HEIGHTS.headings,
    marginBottom: 0.75 * theme.SIZES.base,
  },
  h5: {
    fontFamily: theme.fonts.headings, // Perhaps not bold for h5/h6
    fontSize: theme.SIZES.h5,
    color: theme.colors.textHeadings,
    lineHeight: theme.SIZES.h5 * theme.LINE_HEIGHTS.headings,
    marginBottom: 0.75 * theme.SIZES.base,
  },
  h6: {
    fontFamily: theme.fonts.headings,
    fontSize: theme.SIZES.h6,
    color: theme.colors.textHeadings,
    lineHeight: theme.SIZES.h6 * theme.LINE_HEIGHTS.headings,
    marginBottom: 0.75 * theme.SIZES.base,
  },

  // --- Link Style (for Pressable > Text components) ---
  link: {
    color: theme.colors.accentPrimary,
    // textDecorationLine: 'none' is default for Text in RN
  },
  linkHover: { // Apply this on pressIn or for pressed state
    color: theme.colors.accentSecondary,
  },

  // --- List Item Style (Example, you'd build lists with View/Text) ---
  listItem: {
    marginBottom: 0.5 * theme.SIZES.base, // 0.5em margin
  },

  // --- Utility Classes ---
  appContainer: { // For main content wrapping
    width: '90%',
    maxWidth: 1200,
    alignSelf: 'center', // Replaces margin-left/right: auto for centering a block
    paddingHorizontal: 15, // Combines padding-left and padding-right
  },
  textCenter: {
    textAlign: 'center',
  },
  textAccent: {
    color: theme.colors.accentPrimary,
  },

  // --- General App Background (Apply to your root View/SafeAreaView) ---
  appBackground: {
    backgroundColor: theme.colors.bgPrimary,
    flex: 1, // Ensure it fills the screen
  },
});

export default globalStyles;