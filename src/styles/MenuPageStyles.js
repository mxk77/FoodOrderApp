import { StyleSheet, Platform } from 'react-native';
import theme from './theme';

const HEADER_HEIGHT = 20;

const styles = StyleSheet.create({
  title: {
    fontFamily: theme.fonts.headingsBold,
    fontSize: theme.fontSizes.h1,
    color: theme.colors.text.headings,
    textAlign: 'center',
    marginBottom: theme.spacing.l,
  },
  categoryFiltersContentContainer: {
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    gap: theme.spacing.s,
  },
  categoryButton: {
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.pill,
    borderWidth: 1.5,
    borderColor: theme.colors.accent.secondary,
    ...theme.shadows.subtle,
  },
  categoryButtonText: {
    fontFamily: theme.fonts.primarySemiBold,
    fontSize: theme.fontSizes.s,
    color: theme.colors.accent.secondary,
  },
  categoryButtonPressed: {
    backgroundColor: theme.colors.background.primary,
    borderColor: theme.colors.accent.primary,
  },
  categoryButtonActive: {
    backgroundColor: theme.colors.accent.primary,
    borderColor: theme.colors.accent.primary,
    ...theme.shadows.card,
  },
  categoryButtonTextActive: {
    fontFamily: theme.fonts.headingsBold,
    color: theme.colors.text.white,
    fontSize: theme.fontSizes.s,
  },
  menuGridContainer: {
    paddingTop: HEADER_HEIGHT + theme.spacing.l,
    paddingHorizontal: theme.spacing.m - (theme.spacing.s / 2),
    paddingBottom: theme.spacing.xxl,
    flexGrow: 1,
  },
  menuCardContainer: {
    flex: 0.5,
    padding: theme.spacing.s / 2,
  },
  menuCard: {
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.l,
    ...theme.shadows.card,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: theme.borderRadius.l,
    borderTopRightRadius: theme.borderRadius.l,
    backgroundColor: theme.colors.border.light,
  },
  cardBody: {
    padding: theme.spacing.m,
    flex: 1,
    flexDirection: 'column',
  },
  cardTitle: {
    fontFamily: theme.fonts.headingsBold,
    fontSize: theme.fontSizes.l,
    color: theme.colors.accent.primary,
    marginBottom: theme.spacing.xs,
    minHeight: theme.fontSizes.l * theme.lineHeights.headings * 2,
  },
  cardDescription: {
    fontFamily: theme.fonts.primaryRegular,
    fontSize: theme.fontSizes.s,
    color: theme.colors.text.secondary,
    lineHeight: theme.fontSizes.s * theme.lineHeights.body,
    marginBottom: theme.spacing.s,
    flexGrow: 1,
    minHeight: theme.fontSizes.s * theme.lineHeights.body * 3,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.s,
    borderTopWidth: 1,
    borderColor: theme.colors.border.light,
  },
  cardPrice: {
    fontFamily: theme.fonts.primaryBold,
    fontSize: theme.fontSizes.l,
    color: theme.colors.text.primary,
  },
  addButton: {
    backgroundColor: theme.colors.accent.primary,
    width: theme.spacing.xl + theme.spacing.xs,
    height: theme.spacing.xl + theme.spacing.xs,
    borderRadius: (theme.spacing.xl + theme.spacing.xs) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.subtle,
  },
  addButtonText: {
    color: theme.colors.text.white,
    fontSize: theme.fontSizes.h4,
    fontWeight: 'bold',
    lineHeight: theme.fontSizes.h4,
  },
  noItemsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.l,
  },
  noItemsText: {
    fontFamily: theme.fonts.primaryRegular,
    fontSize: theme.fontSizes.l,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
});

export default styles;