import { StyleSheet } from 'react-native';
import theme from './theme'; // Переконайтесь, що шлях до theme.js правильний

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.l,
    padding: theme.spacing.l,
    marginHorizontal: theme.spacing.m,
    marginVertical: theme.spacing.l,
    ...theme.shadows.card,
  },
  title: {
    fontFamily: theme.fonts.headingsBold,
    fontSize: theme.fontSizes.h2,
    color: theme.colors.text.headings,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  formGroup: {
    marginBottom: theme.spacing.l,
    gap: theme.spacing.xs,
  },
  label: {
    fontFamily: theme.fonts.headingsRegular,
    fontSize: theme.fontSizes.m,
    color: theme.colors.text.primary,
  },
  input: {
    fontFamily: theme.fonts.primaryRegular,
    fontSize: theme.fontSizes.m,
    color: theme.colors.text.primary,
    backgroundColor: theme.colors.background.input,
    borderWidth: 1.5,
    borderColor: theme.colors.border.light,
    borderRadius: theme.borderRadius.m,
    paddingVertical: theme.spacing.m - theme.spacing.xxs,
    paddingHorizontal: theme.spacing.m,
    minHeight: 48,
  },
  inputFocused: {
    borderColor: theme.colors.border.focused,
  },
  inputError: {
    borderColor: theme.colors.border.error,
    backgroundColor: theme.colors.background.dangerSoft,
  },
  error: {
    fontFamily: theme.fonts.primaryRegular,
    fontSize: theme.fontSizes.s,
    color: theme.colors.status.danger,
    marginTop: theme.spacing.xxs,
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.m,
    marginBottom: theme.spacing.s,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s,
    paddingVertical: theme.spacing.xs,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: theme.colors.accent.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    borderColor: theme.colors.accent.primary,
  },
  radioInnerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.accent.primary,
  },
  radioLabel: {
    fontFamily: theme.fonts.primaryRegular,
    fontSize: theme.fontSizes.m,
    color: theme.colors.text.secondary,
  },
  pickerContainer: {
    backgroundColor: theme.colors.background.input,
    borderWidth: 1.5,
    borderColor: theme.colors.border.light,
    borderRadius: theme.borderRadius.m,
    minHeight: 48,
    justifyContent: 'center',
  },
  submitBtn: {
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.l,
    borderRadius: theme.borderRadius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    backgroundColor: theme.colors.background.accentSoft,
    borderColor: theme.colors.accent.secondary,
    ...theme.shadows.subtle,
    marginTop: theme.spacing.l,
  },
  submitText: {
    fontFamily: theme.fonts.headingsBold,
    fontSize: theme.fontSizes.m,
    color: theme.colors.text.onAccentSoft,
    lineHeight: theme.fontSizes.m * theme.lineHeights.condensed,
  },
  submitBtnPressed: {
    backgroundColor: theme.colors.accent.primarySoftHover,
    borderColor: theme.colors.accent.primary,
  },
  backLink: {
    alignSelf: 'center',
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    marginTop: theme.spacing.l,
  },
  backLinkText: {
    fontFamily: theme.fonts.primarySemiBold,
    fontSize: theme.fontSizes.m,
    color: theme.colors.accent.primary,
  },
  confirmedContainer: {
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.l,
    padding: theme.spacing.xl,
    marginHorizontal: theme.spacing.m,
    marginVertical: theme.spacing.l,
    ...theme.shadows.card,
    alignItems: 'center',
  },
  message: {
    fontFamily: theme.fonts.primaryRegular,
    fontSize: theme.fontSizes.l,
    color: theme.colors.text.primary,
    textAlign: 'center',
    lineHeight: theme.fontSizes.l * theme.lineHeights.body,
    marginBottom: theme.spacing.xl,
  },
});

export default styles;