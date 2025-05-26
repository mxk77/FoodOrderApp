// src/pages/ConfirmationPageStyles.js
import { StyleSheet, Platform } from 'react-native';
import theme from './theme'; // Adjust path as needed

const BASE_UNIT = theme.SIZES.base || 16;

export const styles = StyleSheet.create({
  // Main container for the page content (card)
  pageContainer: {
    backgroundColor: theme.colors.cardBg,
    paddingVertical: 30,
    paddingHorizontal: 30, // CSS had 35px, adjusting for consistency or keep as desired
    maxWidth: 650,
    width: '100%',
    alignSelf: 'center',
    marginVertical: 2.5 * BASE_UNIT,
    borderRadius: theme.BORDER_RADIUS.large,
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.shadowWarm,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 25,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  title: {
    textAlign: 'center',
    marginBottom: 2 * BASE_UNIT,
    color: theme.colors.textHeadings,
    fontSize: 2.2 * BASE_UNIT,
    fontFamily: theme.fonts.headingsBold,
  },
  // Form container
  form: {
    gap: 20, // Use gap for spacing between form groups
  },
  formGroup: {
    gap: 8, // Spacing between label and input/error
  },
  label: {
    fontFamily: theme.fonts.headings,
    color: theme.colors.textPrimary,
    fontWeight: '600',
    fontSize: 1 * BASE_UNIT,
  },
  input: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    borderRadius: theme.BORDER_RADIUS.medium,
    backgroundColor: '#fffdf5', // theme.colors.bgInput if defined
    color: theme.colors.textPrimary,
    fontSize: 1 * BASE_UNIT,
    fontFamily: theme.fonts.primary,
    // Inset shadow is not directly supported, subtle border is an alternative
  },
  inputFocused: { // Apply this style when input is focused
    borderColor: theme.colors.accentPrimary,
    // Glow effect from CSS (0 0 0 3px rgba(255, 140, 97, 0.25)) is hard to replicate.
    // Can add a thicker border or a wrapper View with shadow if really needed.
  },
  inputError: {
    borderColor: theme.colors.danger,
    backgroundColor: '#fff0f0', // Light reddish background for error
  },
  inputErrorFocused: {
    borderColor: theme.colors.dangerHover,
  },
  errorMessage: {
    color: theme.colors.danger,
    fontSize: 0.875 * BASE_UNIT,
    fontFamily: theme.fonts.primary, // Ensure font consistency
    fontWeight: '500', // CSS had 500
  },
  // Radio button group
  radioGroup: {
    flexDirection: 'row', // Use row for horizontal layout if space permits
    flexWrap: 'wrap', // Allow wrapping
    gap: 20,
    marginTop: 5,
    marginBottom: 10,
  },
  radioOptionContainer: { // Container for one radio button + label
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.accentPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    borderColor: theme.colors.accentPrimary,
  },
  radioInnerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.accentPrimary,
  },
  radioLabel: {
    fontFamily: theme.fonts.primary,
    color: theme.colors.textSecondary,
    fontSize: 0.95 * BASE_UNIT,
  },
  // Picker (Select) styling (applied to the View wrapping the Picker)
  pickerContainer: {
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    borderRadius: theme.BORDER_RADIUS.medium,
    backgroundColor: '#fffdf5',
    // minHeight: 48, // Ensure consistent height with TextInput if Picker is shorter
    justifyContent: 'center',
  },
  pickerError: {
    borderColor: theme.colors.danger,
    backgroundColor: '#fff0f0',
  },
  pickerStyle: { // Style for the Picker component itself if needed
    color: theme.colors.textPrimary,
    fontFamily: theme.fonts.primary, // Note: Picker font styling can be tricky across platforms
  },
  // Submit button
  submitButton: {
    // Based on .cart-page__action-button.btn.btn--primary but with specific overrides
    backgroundColor: theme.colors.accentPrimarySoft,
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: theme.BORDER_RADIUS.pill,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    marginTop: 10, // Specific margin from CSS
    ...Platform.select({
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
  submitButtonText: {
    color: theme.colors.textOnAccentSoft,
    fontFamily: theme.fonts.headings,
    fontSize: 1.1 * BASE_UNIT,
    fontWeight: '700',
    lineHeight: 1.4 * (1.1 * BASE_UNIT),
  },
  submitButtonPressed: {
    backgroundColor: theme.colors.accentPrimarySoftHover,
    transform: [{ scale: 0.98 }, { translateY: 1 }],
    ...Platform.select({
      ios: { shadowRadius: 4, shadowOffset: { width: 0, height: 1 } },
      android: { elevation: 1 },
    }),
  },
  // Back link
  backLinkContainer: {
    marginTop: 2 * BASE_UNIT,
    alignItems: 'center',
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
  },
  backLinkPressablePressed: {
    backgroundColor: 'rgba(255, 237, 213, 0.5)',
  },
  backLinkTextPressed: {
    color: theme.colors.accentSecondary,
  },
  // Order confirmed state
  orderConfirmedContainer: { // Can merge with pageContainer if styles are similar
    alignItems: 'center', // text-align: center equivalent for block
  },
  confirmationMessage: {
    fontSize: 1.1 * BASE_UNIT,
    color: theme.colors.textPrimary,
    lineHeight: 1.6 * (1.1 * BASE_UNIT),
    marginBottom: 2 * BASE_UNIT,
    textAlign: 'center', // For the text itself
    fontFamily: theme.fonts.primary,
  },
});