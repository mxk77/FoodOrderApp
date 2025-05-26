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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
    minHeight: 200, // Забезпечити мінімальну висоту для контейнера завантажувача
  },
  heading: {
    fontFamily: theme.fonts.headingsBold,
    fontSize: theme.fontSizes.h2,
    color: theme.colors.text.headings,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  subheading: {
    fontFamily: theme.fonts.headingsBold,
    fontSize: theme.fontSizes.h4,
    color: theme.colors.text.headings,
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.m,
  },
  group: {
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
  errorText: {
    fontFamily: theme.fonts.primaryRegular,
    fontSize: theme.fontSizes.s,
    color: theme.colors.status.danger,
    marginTop: theme.spacing.xxs,
  },
  msgBox: {
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    borderWidth: 1,
    marginBottom: theme.spacing.l,
    alignItems: 'center',
  },
  msgText: {
    fontFamily: theme.fonts.primarySemiBold,
    fontSize: theme.fontSizes.m,
    textAlign: 'center',
  },
  msgSuccess: {
    backgroundColor: theme.colors.background.successSoft,
    borderColor: theme.colors.accent.secondary,
  },
  msgTextSuccess: {
    color: theme.colors.text.onSuccessSoft,
  },
  msgError: {
    backgroundColor: theme.colors.background.dangerSoft,
    borderColor: theme.colors.border.error,
  },
  msgTextError: {
    color: theme.colors.text.onDangerSoft,
  },
  btn: {
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.l,
    borderRadius: theme.borderRadius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
    marginTop: theme.spacing.s,
    minHeight: 48,
  },
  btnTextBase: { // Базовий стиль для тексту кнопки (шрифт, розмір)
    fontFamily: theme.fonts.headingsBold,
    fontSize: theme.fontSizes.m,
    lineHeight: theme.fontSizes.m * theme.lineHeights.condensed,
  },
  btnPrimaryText: { // Колір тексту для первинної кнопки
    color: theme.colors.text.onAccentSoft,
  },
  btnSecondaryText: { // Колір тексту для вторинної кнопки
    color: theme.colors.accent.secondary,
  },
  btnDangerText: { // Колір тексту для кнопки небезпеки
    color: theme.colors.text.onDangerSoft,
  },
  btnPrimary: {
    backgroundColor: theme.colors.background.accentSoft,
    borderColor: theme.colors.accent.secondary,
    ...theme.shadows.subtle,
  },
  btnPrimaryPressed: {
    backgroundColor: theme.colors.accent.primarySoftHover,
    borderColor: theme.colors.accent.primary,
  },
  btnSecondary: {
    backgroundColor: theme.colors.background.card,
    borderColor: theme.colors.accent.secondary,
  },
  btnSecondaryPressed: {
    backgroundColor: theme.colors.background.primary,
    borderColor: theme.colors.accent.primary,
  },
  btnDanger: {
    backgroundColor: theme.colors.background.dangerSoft,
    borderColor: theme.colors.status.danger,
  },
  btnDangerPressed: {
    backgroundColor: theme.colors.accent.dangerSoftHover,
    borderColor: theme.colors.status.dangerHover,
  },
  linkToggle: {
    alignSelf: 'center',
    paddingVertical: theme.spacing.m,
    marginTop: theme.spacing.s,
  },
  linkText: {
    fontFamily: theme.fonts.primarySemiBold,
    fontSize: theme.fontSizes.m,
    color: theme.colors.accent.primary,
    textDecorationLine: 'underline',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
    gap: theme.spacing.s,
  },
  value: {
    fontFamily: theme.fonts.primaryRegular,
    fontSize: theme.fontSizes.m,
    color: theme.colors.text.secondary,
    flex: 1,
  },
  inputInline: {
    fontFamily: theme.fonts.primaryRegular,
    fontSize: theme.fontSizes.m,
    color: theme.colors.text.primary,
    backgroundColor: theme.colors.background.input,
    borderWidth: 1.5,
    borderColor: theme.colors.border.light,
    borderRadius: theme.borderRadius.m,
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    flex: 1,
    minHeight: 40,
  },
  errorInline: {
    fontFamily: theme.fonts.primaryRegular,
    fontSize: theme.fontSizes.s,
    color: theme.colors.status.danger,
    marginLeft: theme.spacing.m + theme.spacing.s, // Відступ, якщо мітка має фіксовану ширину або для вирівнювання
    marginBottom: theme.spacing.m,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: theme.spacing.m,
    marginTop: theme.spacing.l,
    marginBottom: theme.spacing.l,
  },
  addressItem: {
    fontFamily: theme.fonts.primaryRegular,
    fontSize: theme.fontSizes.m,
    color: theme.colors.text.secondary,
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    backgroundColor: theme.colors.background.input,
    borderRadius: theme.borderRadius.s,
    marginBottom: theme.spacing.s,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  logoutButton: { // Можна додати сюди специфічні стилі, якщо потрібно
    marginTop: theme.spacing.xl,
  }
});

export default styles;