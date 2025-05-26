// src/pages/NotFoundPageStyles.js (or your chosen path)

import { StyleSheet, Dimensions, Platform } from 'react-native';
import theme from './theme'; // Adjust path to your theme.js

const BASE_UNIT = theme.SIZES.base || 16;
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1, // Take full available space if it's a screen
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 1.5 * BASE_UNIT, // 1.5rem
    paddingVertical: 3 * BASE_UNIT,     // 3rem
    minHeight: SCREEN_HEIGHT * 0.5,     // 50vh
    backgroundColor: theme.colors.bgPrimary, // Assuming it takes the page background
  },
  title: {
    fontSize: 2.8 * BASE_UNIT,
    color: theme.colors.textHeadings,
    fontFamily: theme.fonts.headingsBold, // Assuming headings are bold
    marginBottom: 1.5 * BASE_UNIT,
    textAlign: 'center',
  },
  message: {
    fontSize: 1.15 * BASE_UNIT,
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.primary,
    lineHeight: (1.15 * BASE_UNIT) * 1.7,
    maxWidth: 500,
    marginBottom: 2.5 * BASE_UNIT,
    textAlign: 'center',
  },
  actionsContainer: {
    // This View is optional if there's only one button, but good for structure
  },
  // Styles for the primary button on this page
  homeButton: {
    backgroundColor: theme.colors.accentPrimarySoft,
    borderColor: theme.colors.accentPrimarySoft, // Consistent with .btn--primary
    paddingVertical: 12, // Specific override
    paddingHorizontal: 30, // Specific override
    borderRadius: theme.BORDER_RADIUS.pill,
    borderWidth: 2, // From .btn definition
    alignItems: 'center', // Center text
    justifyContent: 'center', // Center text
    ...Platform.select({ // Shadow from .btn
      ios: {
        shadowColor: 'rgba(180, 140, 100, 0.08)',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  homeButtonText: {
    color: theme.colors.textOnAccentSoft,
    fontFamily: theme.fonts.headings,
    fontWeight: '700',
    fontSize: 1.05 * BASE_UNIT, // Specific override
    lineHeight: (1.05 * BASE_UNIT) * 1.4,
  },
  homeButtonPressed: { // Simulating :hover/:active from .btn--primary:hover and .btn:active
    backgroundColor: theme.colors.accentPrimarySoftHover,
    borderColor: theme.colors.accentPrimarySoftHover,
    transform: [{ translateY: 1 }, { scale: 0.98 }], // From .btn:active
    ...Platform.select({ // Shadow from .btn:hover or .btn:active
      ios: {
        shadowColor: 'rgba(180, 140, 100, 0.1)', // Or .12 from :hover
        shadowOffset: { width: 0, height: 1 }, // Or 4 from :hover
        shadowOpacity: 1,
        shadowRadius: 4, // Or 12 from :hover
      },
      android: {
        elevation: 1, // Or 4 from :hover
      },
    }),
  },
});