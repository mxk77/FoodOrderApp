// src/pages/CartPageStyles.js (or your chosen path)

import { StyleSheet, Dimensions, Platform } from 'react-native';
import theme from './theme'; // Adjust path to your theme.js

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BASE_UNIT = theme.SIZES.base || 16;

// Function for dynamic styles based on screen width
export const getDynamicCartStyles = () => {
  const isLargeScreen = SCREEN_WIDTH >= 600;
  return StyleSheet.create({
    actionsContainer: {
      marginTop: 1.5 * BASE_UNIT,
      flexDirection: isLargeScreen ? 'row' : 'column',
      gap: 15,
      ...(isLargeScreen && { justifyContent: 'space-between' }),
    },
    actionButton: {
      width: isLargeScreen ? 'auto' : '100%',
      ...(isLargeScreen && { flexGrow: 1 }),
      // marginRight is handled by gap, or could be specific if not last child
    },
  });
};

export const styles = StyleSheet.create({
  // This container is the main card for the cart content
  cartPageContainer: {
    backgroundColor: theme.colors.cardBg,
    paddingVertical: 25,
    paddingHorizontal: 30,
    maxWidth: 700,
    width: '100%', // Take available width up to maxWidth
    alignSelf: 'center', // Center within the Layout's content area
    marginVertical: 2.5 * BASE_UNIT,
    borderRadius: theme.BORDER_RADIUS.large,
    // Shadow (approximating the stronger CSS shadow)
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.shadowWarm,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 25,
      },
      android: {
        elevation: 10, // Adjust elevation for desired shadow intensity
      },
    }),
  },
  title: {
    textAlign: 'center',
    marginBottom: 2 * BASE_UNIT,
    color: theme.colors.textHeadings,
    fontSize: 2.2 * BASE_UNIT,
    fontFamily: theme.fonts.headingsBold, // Assuming titles use bold heading font
  },
  emptyMessageContainer: {
    textAlign: 'center',
    paddingVertical: 25,
    backgroundColor: 'rgba(255, 249, 240, 0.5)',
    borderRadius: theme.BORDER_RADIUS.medium,
  },
  emptyMessageText: {
    fontSize: 1.1 * BASE_UNIT,
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.primary,
    textAlign: 'center',
  },
  // Styles for FlatList itself (if any direct styling needed, often minimal)
  cartItemsList: {
    marginBottom: 1.5 * BASE_UNIT,
  },
  // Styles for each item rendered by FlatList
  cartItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    // borderBottomWidth: 1, // Will use ItemSeparatorComponent instead
    // borderBottomColor: theme.colors.borderLight,
  },
  itemSeparator: {
    height: 1,
    backgroundColor: theme.colors.borderLight,
  },
  cartItemDetails: {
    flexGrow: 1,
    color: theme.colors.textPrimary,
    fontSize: 1 * BASE_UNIT,
    lineHeight: 1.5 * BASE_UNIT,
    paddingRight: 10,
    fontFamily: theme.fonts.primary,
  },
  // Remove button (Pressable)
  removeButton: {
    // backgroundColor: 'transparent', // Default for Pressable
    marginLeft: 15,
    borderRadius: 18, // 36 / 2
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: theme.colors.danger,
    fontSize: 1.3 * BASE_UNIT, // For the '×' character
    lineHeight: 1.3 * BASE_UNIT * 1.2, // Adjust for vertical centering of '×'
  },
  removeButtonPressed: { // Style for when the remove button is pressed
    backgroundColor: 'rgba(229, 115, 115, 0.1)',
  },
  removeButtonTextPressed: {
    color: theme.colors.dangerHover,
  },
  totalText: {
    fontSize: 1.35 * BASE_UNIT,
    fontWeight: '700', // Or use theme.fonts.headingsBold if its weight is 700
    fontFamily: theme.fonts.headings,
    textAlign: 'right',
    marginTop: 1.5 * BASE_UNIT,
    marginBottom: 2.5 * BASE_UNIT,
    color: theme.colors.textPrimary,
  },
  // Common styles for action buttons
  actionButtonBase: {
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'transparent', // Default, can be overridden
    borderRadius: theme.BORDER_RADIUS.pill,
    alignItems: 'center', // For text centering
    justifyContent: 'center',
    ...Platform.select({ // Light shadow for buttons
      ios: {
        shadowColor: 'rgba(180, 140, 100, 0.1)',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  actionButtonText: {
    fontSize: 1.05 * BASE_UNIT,
    fontFamily: theme.fonts.headings,
    fontWeight: '700',
    lineHeight: 1.4 * (1.05 * BASE_UNIT),
    textAlign: 'center',
  },
  // Primary Action Button
  primaryButton: {
    backgroundColor: theme.colors.accentPrimarySoft,
  },
  primaryButtonText: {
    color: theme.colors.textOnAccentSoft,
  },
  primaryButtonPressed: { // Hover/Active state
    backgroundColor: theme.colors.accentPrimarySoftHover,
    // transform: [{ translateY: -1 }], // Subtle lift effect
    ...Platform.select({ // Enhanced shadow on press
      ios: { shadowRadius: 12, shadowOffset: { width: 0, height: 4 } },
      android: { elevation: 5 },
    }),
  },
  // Danger Action Button
  dangerButton: {
    backgroundColor: theme.colors.dangerSoft,
  },
  dangerButtonText: {
    color: theme.colors.textOnDangerSoft,
  },
  dangerButtonPressed: { // Hover/Active state
    backgroundColor: theme.colors.dangerSoftHover,
    // transform: [{ translateY: -1 }],
    ...Platform.select({
      ios: { shadowRadius: 12, shadowOffset: { width: 0, height: 4 } },
      android: { elevation: 5 },
    }),
  },
  // Back Link
  backLinkContainer: {
    marginTop: 2.5 * BASE_UNIT,
    alignItems: 'center', // For Pressable centering
  },
  backLinkPressable: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: theme.BORDER_RADIUS.medium,
  },
  backLinkText: {
    color: theme.colors.accentPrimary,
    fontWeight: '600',
    fontFamily: theme.fonts.headings,
    fontSize: BASE_UNIT * 0.95, // slightly smaller than base if needed
  },
  backLinkPressablePressed: {
    backgroundColor: 'rgba(255, 237, 213, 0.5)',
  },
  backLinkTextPressed: {
    color: theme.colors.accentSecondary,
  },
});