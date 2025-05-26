// src/pages/ProfilePageStyles.js
import { StyleSheet, Platform, Dimensions } from 'react-native';
import theme from './theme'; // Adjust path

const BASE_UNIT = theme.SIZES.base || 16;
const { width: SCREEN_WIDTH } = Dimensions.get('window');

// For --profile-info-label-width
const PROFILE_INFO_LABEL_WIDTH = 100;

export const styles = StyleSheet.create({
  // Main container for the card-like appearance
  pageContainer: {
    backgroundColor: theme.colors.cardBg,
    paddingVertical: 30,
    paddingHorizontal: Platform.OS === 'web' ? 35 : 25, // Adjust padding for mobile if 35 is too much
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
    marginVertical: 2.5 * BASE_UNIT,
    borderRadius: theme.BORDER_RADIUS.large,
    ...Platform.select({
      ios: { shadowColor: theme.colors.shadowWarm, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.12, shadowRadius: 25 },
      android: { elevation: 10 },
    }),
  },
  // Titles for sections (Login, Register, Profile)
  sectionTitle: {
    textAlign: 'center',
    marginBottom: 1.8 * BASE_UNIT,
    color: theme.colors.textHeadings,
    fontSize: 2 * BASE_UNIT,
    fontFamily: theme.fonts.headingsBold,
  },
  profilePageTitle: { // Specifically for "Профіль користувача" if different
    textAlign: 'center',
    marginBottom: 1.8 * BASE_UNIT,
    color: theme.colors.textHeadings,
    fontSize: 2 * BASE_UNIT, // Same as sectionTitle for consistency here
    fontFamily: theme.fonts.headingsBold,
  },
  addressesTitle: {
    marginTop: 2 * BASE_UNIT,
    marginBottom: 1 * BASE_UNIT,
    fontSize: 1.5 * BASE_UNIT,
    textAlign: 'left', // Specific alignment
    color: theme.colors.textHeadings,
    fontFamily: theme.fonts.headingsBold,
  },
  // Form structure
  formSection: {
    gap: 18,
  },
  formGroup: {
    gap: 8,
  },
  label: {
    fontFamily: theme.fonts.headings,
    color: theme.colors.textPrimary,
    fontWeight: '600',
    fontSize: 0.95 * BASE_UNIT,
  },
  input: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    borderRadius: theme.BORDER_RADIUS.medium,
    backgroundColor: '#fffdf5', // theme.colors.bgInput if defined
    color: theme.colors.textPrimary,
    fontSize: 1 * BASE_UNIT,
    fontFamily: theme.fonts.primary,
  },
  inputFocused: {
    borderColor: theme.colors.accentPrimary,
  },
  inputError: {
    borderColor: theme.colors.danger,
    backgroundColor: '#fff0f0',
  },
  inputErrorFocused: {
    borderColor: theme.colors.dangerHover,
  },
  errorMessage: {
    color: theme.colors.danger,
    fontSize: 0.875 * BASE_UNIT,
    fontFamily: theme.fonts.primary, // Ensure font consistency
    fontWeight: '500',
    marginTop: 2,
  },
  errorMessageInline: { // For profile edit view
    // In RN, often best to place error message below the input
    // display: 'block' and margin-left trick from CSS is not applicable
  },
  // Buttons
  buttonBase: { // Base for .btn
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: theme.BORDER_RADIUS.pill,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
        ios: { shadowColor: 'rgba(180, 140, 100, 0.08)', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 1, shadowRadius: 8 },
        android: { elevation: 2 },
    }),
  },
  buttonTextBase: {
    fontFamily: theme.fonts.headings,
    fontWeight: '700',
    fontSize: 1 * BASE_UNIT,
    lineHeight: 1.4 * BASE_UNIT,
    textAlign: 'center',
  },
  buttonPrimary: {
    backgroundColor: theme.colors.accentPrimarySoft,
    borderColor: theme.colors.accentPrimarySoft,
  },
  buttonTextPrimary: {
    color: theme.colors.textOnAccentSoft,
  },
  buttonPrimaryPressed: {
    backgroundColor: theme.colors.accentPrimarySoftHover,
    borderColor: theme.colors.accentPrimarySoftHover,
    transform: [{ translateY: 1 }, { scale: 0.98 }],
  },
  buttonSecondary: { // Define based on your theme if --color-bg-button-secondary-soft exists
    backgroundColor: '#fff7ee', // Fallback if not in theme
    borderColor: '#ffdab9',    // Fallback
  },
  buttonTextSecondary: {
    color: '#e08d5b', // Fallback
  },
  buttonSecondaryPressed: {
    backgroundColor: '#ffdab9',
  },
  buttonDanger: {
    backgroundColor: theme.colors.dangerSoft,
    borderColor: theme.colors.dangerSoft,
  },
  buttonTextDanger: {
    color: theme.colors.textOnDangerSoft,
  },
  buttonDangerPressed: {
    backgroundColor: theme.colors.dangerSoftHover,
    borderColor: theme.colors.dangerSoftHover,
  },
  formSectionButton: { // For main Login/Register buttons
    width: '100%',
    marginTop: 10,
    paddingVertical: 12, // CSS had specific padding, ensure consistency
  },
  formSectionButtonText: { // If font size needs override
    fontSize: 1.05 * BASE_UNIT,
  },
  formLinkButton: {
    // Pressable will be used, Text inside it for styling
  },
  formLinkButtonText: {
    color: theme.colors.accentPrimary,
    textDecorationLine: 'underline',
    fontFamily: theme.fonts.primary,
    fontSize: 0.95 * BASE_UNIT,
    fontWeight: '600',
  },
  formLinkButtonTextPressed: {
    color: theme.colors.accentSecondary,
  },
  formToggleText: {
    textAlign: 'center',
    fontSize: 0.95 * BASE_UNIT,
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.primary,
    marginTop: 15,
  },
  // Profile display section
  profileInfoGroup: {
    gap: 15,
    marginBottom: 25,
  },
  profileInfoItem: {
    flexDirection: 'row', // For label and value/input side-by-side
    alignItems: 'flex-start', // If input is multi-line
    gap: 10,
    // flexWrap: 'wrap', // Can be useful if input is very wide
  },
  profileInfoLabel: {
    fontWeight: '600',
    color: theme.colors.textPrimary,
    fontFamily: theme.fonts.primary, // CSS didn't specify, using primary
    width: PROFILE_INFO_LABEL_WIDTH,
    fontSize: BASE_UNIT,
    lineHeight: BASE_UNIT * 1.6, // To match input height better
  },
  profileInfoValue: {
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.primary,
    flex: 1, // Allow value to take remaining space
    fontSize: BASE_UNIT,
    lineHeight: BASE_UNIT * 1.6,
  },
  inputInline: { // For inputs in the profile edit view
    flex: 1, // Take remaining space after label
    // minWidth: 200, // Less relevant in RN, flex handles it
  },
  profileActionsContainer: {
    flexDirection: SCREEN_WIDTH <= 450 ? 'column' : 'row', // Responsive
    gap: 15,
    marginTop: 20,
    marginBottom: 25,
  },
  profileActionButton: { // For buttons within profileActionsContainer
    flexGrow: SCREEN_WIDTH > 450 ? 1 : 0,
    width: SCREEN_WIDTH <= 450 ? '100%' : 'auto',
  },
  // Address list
  addressListContainer: {
    marginBottom: 20,
  },
  addressListItemsContainer: { // For the View wrapping mapped items
    gap: 8,
  },
  addressListItem: {
    backgroundColor: '#fffdf5', // theme.colors.bgInput
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: theme.BORDER_RADIUS.medium,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
  addressListItemText: {
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.primary,
    fontSize: 0.95 * BASE_UNIT,
  },
  addressListNoItemsText: {
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
    fontFamily: theme.fonts.primary,
    fontSize: 0.95 * BASE_UNIT,
  },
  addAddressFormContainer: {
    marginTop: 15,
  },
  addAddressButton: { // Specific style for "Додати адресу" button
    marginTop: 10,
    alignSelf: 'flex-start', // width: auto equivalent
    paddingHorizontal: 20, // Shorter than full-width buttons
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.borderLight,
    marginVertical: 25,
  },
  logoutButton: { // .profile-logout-button.btn
    width: '100%',
  },
  // Auth messages
  authMessageContainer: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginBottom: 15,
    borderRadius: theme.BORDER_RADIUS.medium,
    borderWidth: 1,
  },
  authMessageText: {
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: theme.fonts.primary,
  },
  authMessageSuccess: {
    backgroundColor: '#e6fffa',
    borderColor: '#b2dfdb',
  },
  authMessageTextSuccess: {
    color: '#00695c',
  },
  authMessageError: {
    backgroundColor: '#fff0f0',
    borderColor: theme.colors.dangerSoft,
  },
  authMessageTextError: {
    color: theme.colors.dangerHover,
  },
});