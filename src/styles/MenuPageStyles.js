// src/pages/MenuPageStyles.js
import { StyleSheet, Platform } from 'react-native';
import theme from './theme'; // Adjust path

const BASE_UNIT = theme.SIZES.base || 16;

export const styles = StyleSheet.create({
  // Main page container (used within Layout)
  pageContainer: {
    flex: 1,
    // paddingHorizontal: BASE_UNIT, // Add padding if Layout doesn't provide enough
  },
  title: {
    textAlign: 'center',
    marginBottom: 2.5 * BASE_UNIT,
    fontSize: 2.5 * BASE_UNIT,
    color: theme.colors.textHeadings,
    fontFamily: theme.fonts.headingsBold,
  },
  // Category Filters (Horizontal ScrollView)
  categoryFiltersContainer: {
    paddingVertical: 10, // For shadow visibility & touch area
    marginBottom: 2 * BASE_UNIT, // CSS had 3rem
  },
  categoryFiltersContentContainer: { // For ScrollView's contentContainerStyle
    paddingHorizontal: BASE_UNIT, // Ensure first/last items have padding
    gap: 12, // Spacing between buttons
    alignItems: 'center',
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderWidth: 2,
    borderColor: theme.colors.accentSecondary,
    backgroundColor: theme.colors.cardBg,
    borderRadius: theme.BORDER_RADIUS.extraLarge,
    ...Platform.select({ // Subtle shadow for buttons
      ios: { shadowColor: 'rgba(180, 140, 100, 0.08)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 5 },
      android: { elevation: 2 },
    }),
  },
  categoryButtonText: {
    fontSize: 0.95 * BASE_UNIT,
    fontFamily: theme.fonts.headings,
    fontWeight: '600',
    color: theme.colors.accentSecondary,
  },
  categoryButtonPressed: { // Simulating hover
    backgroundColor: theme.colors.accentSecondary,
    // transform: [{ translateY: -1 }], // Optional: subtle lift
  },
  categoryButtonTextPressed: {
    color: theme.colors.cardBg,
  },
  categoryButtonActive: {
    backgroundColor: theme.colors.accentPrimary,
    borderColor: theme.colors.accentPrimary,
    ...Platform.select({ // Slightly different shadow for active
      ios: { shadowColor: 'rgba(200, 100, 50, 0.2)', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 1, shadowRadius: 8 },
      android: { elevation: 4 },
    }),
  },
  categoryButtonTextActive: {
    color: theme.colors.cardBg,
    fontWeight: '700',
  },
  // Menu Grid (FlatList)
  menuGridContainer: { // For FlatList's contentContainerStyle
    paddingHorizontal: BASE_UNIT / 2, // Half of item margin for outer spacing
    paddingBottom: BASE_UNIT * 2, // Space at the bottom
  },
  menuCardContainer: { // Wrapper for each card to handle column spacing
    flex: 1 / 2, // For 2 columns, adjust for more (e.g., 1/3 for 3 columns)
    maxWidth: '50%', // For 2 columns
    padding: BASE_UNIT / 2, // This creates the "gap" between items
  },
  menuCard: {
    backgroundColor: theme.colors.cardBg,
    borderRadius: theme.BORDER_RADIUS.large,
    overflow: 'hidden', // Important for image border radius
    flexDirection: 'column', // Default but good to be explicit
    height: '100%', // Make cards in a row take same height (if parent View has fixed height or alignItems: 'stretch')
    ...Platform.select({ // Card shadow
      ios: {
        shadowColor: theme.colors.shadowWarm,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 25,
      },
      android: {
        elevation: 6, // Adjust for desired shadow
      },
    }),
  },
  menuCardPressed: { // Simulating hover transform
    // transform: [{ translateY: -3 }, { scale: 1.01 }], // Subtle effect
  },
  imageContainer: {
    width: '100%',
    height: 150, // Adjusted from 200px, adapt as needed for mobile
    backgroundColor: '#f0f0f0', // Placeholder background
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cardBody: {
    padding: BASE_UNIT * 0.75, // 15px if BASE_UNIT is 20, 12px if 16
    flexGrow: 1,
    justifyContent: 'space-between', // Pushes footer down if description is short
  },
  cardTitle: {
    fontSize: 1.2 * BASE_UNIT, // 1.3em
    fontWeight: '700',
    fontFamily: theme.fonts.headingsBold,
    color: theme.colors.accentPrimary,
    marginBottom: BASE_UNIT * 0.5, // 10px
    minHeight: (1.2 * BASE_UNIT) * 1.3 * 2, // Approx 2 lines (fontSize * lineHeight * lines)
  },
  cardDescription: {
    fontSize: 0.9 * BASE_UNIT,
    color: theme.colors.textSecondary,
    lineHeight: (0.9 * BASE_UNIT) * 1.6,
    marginBottom: BASE_UNIT * 0.75, // 15px
    flexGrow: 1, // Allows description to take space
    minHeight: (0.9 * BASE_UNIT) * 1.6 * 3, // Approx 3 lines
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: BASE_UNIT * 0.75,
    borderTopWidth: 1,
    borderColor: theme.colors.borderLight,
    // marginTop: 'auto' is achieved by flexGrow on elements above
  },
  cardPrice: {
    fontSize: 1.15 * BASE_UNIT, // 1.25em
    color: theme.colors.textPrimary,
    fontWeight: '700',
    fontFamily: theme.fonts.primaryBold, // Assuming a bold primary font for price
  },
  addButton: {
    backgroundColor: theme.colors.accentPrimary,
    width: 40, // Slightly smaller for mobile
    height: 40,
    borderRadius: 20, // width / 2
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({ // Button shadow
      ios: { shadowColor: 'rgba(255, 140, 97, 0.35)', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 10 },
      android: { elevation: 4 },
    }),
  },
  addButtonPressed: {
    backgroundColor: theme.colors.accentSecondary,
    transform: [{ scale: 1.05 }],
  },
  addButtonText: {
    color: 'white',
    fontSize: 1.6 * BASE_UNIT,
    fontWeight: 'bold',
    lineHeight: 1.6 * BASE_UNIT * 1.1, // Adjust for vertical centering of '+'
  },
  noItemsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 3 * BASE_UNIT,
    padding: 25,
    marginHorizontal: BASE_UNIT, // To give some spacing from screen edges
    backgroundColor: theme.colors.cardBg,
    borderRadius: theme.BORDER_RADIUS.medium,
    ...theme.SHADOWS.light, // Using predefined shadow from theme
  },
  noItemsText: {
    textAlign: 'center',
    fontSize: 1.1 * BASE_UNIT,
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.primary,
  },
});