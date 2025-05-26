import { StyleSheet } from 'react-native';
import theme from './theme';

const globalStyles = StyleSheet.create({
  appScreen: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  safeAreaContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.l,
  },
  baseText: {
    fontFamily: theme.fonts.primaryRegular,
    fontSize: theme.fontSizes.m,
    color: theme.colors.text.primary,
    lineHeight: theme.fontSizes.m * theme.lineHeights.body,
  },
  h1: {
    fontFamily: theme.fonts.headingsBold,
    fontSize: theme.fontSizes.h1,
    color: theme.colors.text.headings,
    lineHeight: theme.fontSizes.h1 * theme.lineHeights.headings,
    marginBottom: theme.spacing.m,
  },
  h2: {
    fontFamily: theme.fonts.headingsBold,
    fontSize: theme.fontSizes.h2,
    color: theme.colors.text.headings,
    lineHeight: theme.fontSizes.h2 * theme.lineHeights.headings,
    marginBottom: theme.spacing.m,
  },
  h3: {
    fontFamily: theme.fonts.headingsBold,
    fontSize: theme.fontSizes.h3,
    color: theme.colors.text.headings,
    lineHeight: theme.fontSizes.h3 * theme.lineHeights.headings,
    marginBottom: theme.spacing.s,
  },
  h4: {
    fontFamily: theme.fonts.headingsBold,
    fontSize: theme.fontSizes.h4,
    color: theme.colors.text.headings,
    lineHeight: theme.fontSizes.h4 * theme.lineHeights.headings,
    marginBottom: theme.spacing.s,
  },
  h5: {
    fontFamily: theme.fonts.headingsRegular,
    fontSize: theme.fontSizes.xl,
    color: theme.colors.text.headings,
    lineHeight: theme.fontSizes.xl * theme.lineHeights.headings,
    marginBottom: theme.spacing.xs,
  },
  paragraph: {
    fontFamily: theme.fonts.primaryRegular,
    fontSize: theme.fontSizes.m,
    color: theme.colors.text.primary,
    lineHeight: theme.fontSizes.m * theme.lineHeights.body,
    marginBottom: theme.spacing.m,
  },
  link: {
    color: theme.colors.accent.primary,
    fontFamily: theme.fonts.primarySemiBold,
  },
  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  textAccent: {
    color: theme.colors.text.accent,
  },
  cardBase: {
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.l,
    padding: theme.spacing.m,
    ...theme.shadows.card,
  },
});

export default globalStyles;