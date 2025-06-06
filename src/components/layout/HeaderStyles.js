import { StyleSheet } from 'react-native';
import theme from '../../styles/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background.card,

    shadowColor: theme.colors.shadow.color,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 4,

    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,

    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  logoContainer: {
  },
  logoText: {
    fontFamily: theme.fonts.headingsBold,
    fontSize: theme.fontSizes.xl,
    color: theme.colors.accent.primary,
  },
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.m,
  },
  navItem: {
    paddingVertical: theme.spacing.xs,
  },
  navText: {
    fontFamily: theme.fonts.primaryRegular,
    fontSize: theme.fontSizes.m,
    color: theme.colors.text.secondary,
  },
  navTextActive: {
    fontFamily: theme.fonts.primaryBold,
    color: theme.colors.accent.primary,
  },
});

export default styles;