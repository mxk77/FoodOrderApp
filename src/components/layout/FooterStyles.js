import { StyleSheet } from 'react-native';
import theme from '../../styles/theme';

const styles = StyleSheet.create({
  safeAreaContainer: {
    backgroundColor: theme.colors.background.card,
  },
  container: {
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.m,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
  },
  copyrightText: {
    fontFamily: theme.fonts.primaryRegular,
    fontSize: theme.fontSizes.xs,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.s,
  },
  contactPressable: {
    padding: theme.spacing.xs,
  },
  contactText: {
    fontFamily: theme.fonts.primarySemiBold,
    fontSize: theme.fontSizes.s,
    color: theme.colors.accent.primary,
    textAlign: 'center',
  },
});

export default styles;