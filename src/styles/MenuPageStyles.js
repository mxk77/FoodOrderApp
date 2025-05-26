import { StyleSheet, Platform } from 'react-native';
import theme from './theme'; // Переконайтесь, що шлях до theme.js правильний

const styles = StyleSheet.create({
  title: {
    fontFamily: theme.fonts.headingsBold,
    fontSize: theme.fontSizes.h1,
    color: theme.colors.text.headings,
    textAlign: 'center',
    marginTop: theme.spacing.l,
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
    paddingHorizontal: theme.spacing.m - (theme.spacing.s / 2), // e.g. 16px - 6px = 10px outer padding
    paddingBottom: theme.spacing.xxl,
  },
  menuCardContainer: {
    flex: 0.5, // For 2 columns
    padding: theme.spacing.s / 2, // Creates a gap of theme.spacing.s between cards
  },
  menuCard: {
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.l,
    ...theme.shadows.card,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    flex: 1, // Ensure card fills its container
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
    flex: 1, // Allows cardBody to grow and push footer
    flexDirection: 'column',
  },
  cardTitle: {
    fontFamily: theme.fonts.headingsBold,
    fontSize: theme.fontSizes.l,
    color: theme.colors.accent.primary, // Using accent for title as per potential preference
    marginBottom: theme.spacing.xs,
    minHeight: theme.fontSizes.l * theme.lineHeights.headings * 2, // Approx 2 lines
  },
  cardDescription: {
    fontFamily: theme.fonts.primaryRegular,
    fontSize: theme.fontSizes.s,
    color: theme.colors.text.secondary,
    lineHeight: theme.fontSizes.s * theme.lineHeights.body,
    marginBottom: theme.spacing.s,
    flexGrow: 1, // Takes up available space, pushing footer down
    minHeight: theme.fontSizes.s * theme.lineHeights.body * 3, // Approx 3 lines
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.s,
    borderTopWidth: 1,
    borderColor: theme.colors.border.light,
    // marginTop: 'auto'; // Not needed due to flexGrow on description
  },
  cardPrice: {
    fontFamily: theme.fonts.primaryBold,
    fontSize: theme.fontSizes.l,
    color: theme.colors.text.primary,
  },
  addButton: {
    backgroundColor: theme.colors.accent.primary,
    width: theme.spacing.xl + theme.spacing.xs, // 40px
    height: theme.spacing.xl + theme.spacing.xs, // 40px
    borderRadius: (theme.spacing.xl + theme.spacing.xs) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.subtle,
  },
  addButtonText: {
    color: theme.colors.text.white,
    fontSize: theme.fontSizes.h4, // Large "+"
    fontWeight: 'bold',
    lineHeight: theme.fontSizes.h4, // For vertical centering
  },
  noItemsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.l,
    marginTop: theme.spacing.xl,
  },
  noItemsText: {
    fontFamily: theme.fonts.primaryRegular,
    fontSize: theme.fontSizes.l,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
});

export default styles;