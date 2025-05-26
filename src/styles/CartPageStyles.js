import { StyleSheet } from 'react-native';
import theme from './theme'; // Переконайтесь, що шлях до theme.js правильний

const styles = StyleSheet.create({
  // Видалено scrollViewContentContainer, оскільки ScrollView більше не використовується тут

  cardWrapper: { // Раніше це був 'container', тепер це обгортка для FlatList
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.l,
    marginHorizontal: theme.spacing.m,
    marginVertical: theme.spacing.l,
    ...theme.shadows.card,
    flex: 1, // Дозволяє картці зайняти доступний простір в Layout
    overflow: 'hidden', // Щоб вміст FlatList не виходив за межі заокруглених кутів картки
  },
  flatListItself: { // Стиль для самого компонента FlatList
    flex: 1, // Дозволяє FlatList заповнити cardWrapper
  },
  flatListContentContainer: { // Стилі для внутрішнього контейнера FlatList, що прокручується
    paddingHorizontal: theme.spacing.l, // Горизонтальні відступи для вмісту списку
    paddingTop: theme.spacing.l, // Відступ зверху (перед заголовком)
    paddingBottom: theme.spacing.l, // Відступ знизу (після футера)
    flexGrow: 1, // Важливо, щоб ListEmptyComponent міг правильно центруватися
  },
  title: {
    fontFamily: theme.fonts.headingsBold,
    fontSize: theme.fontSizes.h2,
    color: theme.colors.text.headings,
    textAlign: 'center',
    marginBottom: theme.spacing.l, // Відступ після заголовка перед першим елементом або повідомленням про порожній кошик
  },
  listFooterContainer: { // Контейнер для суми, кнопок та посилання "назад" у футері списку
    // paddingTop: theme.spacing.l, // Додатковий відступ зверху, якщо потрібно
  },
  emptyListContent: { // Контейнер для вмісту, коли список порожній (для ListEmptyComponent)
    flexGrow: 1, // Дозволяє центрувати вміст по вертикалі
    justifyContent: 'center',
    alignItems: 'center',
    // Горизонтальні відступи вже задані в flatListContentContainer
  },
  empty: {
    paddingVertical: theme.spacing.m, // Зменшений відступ, оскільки заголовок і посилання "назад" тепер окремо
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: theme.fonts.primaryRegular,
    fontSize: theme.fontSizes.l,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  // 'list' стиль більше не потрібен у такому вигляді, його замінили flatListItself та flatListContentContainer
  separator: {
    height: 1,
    backgroundColor: theme.colors.border.light,
    marginVertical: theme.spacing.s,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.m, // Залишаємо для кожного елемента списку
  },
  cartItemText: {
    fontFamily: theme.fonts.primaryRegular,
    fontSize: theme.fontSizes.m,
    color: theme.colors.text.primary,
    flexShrink: 1,
    paddingRight: theme.spacing.s,
  },
  removeBtn: {
    padding: theme.spacing.xs,
    borderRadius: theme.borderRadius.pill,
  },
  removeBtnPressed: {
    backgroundColor: theme.colors.accent.dangerSoftHover,
  },
  removeBtnText: {
    fontFamily: theme.fonts.primaryBold,
    fontSize: theme.fontSizes.xl,
    color: theme.colors.status.danger,
    lineHeight: theme.fontSizes.xl,
  },
  total: {
    fontFamily: theme.fonts.headingsBold,
    fontSize: theme.fontSizes.h4,
    color: theme.colors.text.primary,
    textAlign: 'right',
    marginTop: theme.spacing.l, // Відступ від останнього елемента списку або розділювача
    marginBottom: theme.spacing.l,
  },
  actions: {
    gap: theme.spacing.m,
    marginBottom: theme.spacing.l,
  },
  button: {
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.l,
    borderRadius: theme.borderRadius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  buttonText: {
    fontFamily: theme.fonts.headingsBold,
    fontSize: theme.fontSizes.m,
    lineHeight: theme.fontSizes.m * theme.lineHeights.condensed,
  },
  primaryButton: {
    backgroundColor: theme.colors.background.accentSoft,
    borderColor: theme.colors.accent.secondary,
    ...theme.shadows.subtle,
  },
  primaryButtonText: {
    color: theme.colors.text.onAccentSoft,
  },
  primaryButtonPressed: {
    backgroundColor: theme.colors.accent.primarySoftHover,
    borderColor: theme.colors.accent.primary,
  },
  dangerButton: {
    backgroundColor: theme.colors.background.dangerSoft,
    borderColor: theme.colors.status.danger,
  },
  dangerButtonText: {
    color: theme.colors.text.onDangerSoft,
  },
  dangerButtonPressed: {
    backgroundColor: theme.colors.accent.dangerSoftHover,
    borderColor: theme.colors.status.dangerHover,
  },
  backLink: {
    alignSelf: 'center',
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    marginTop: theme.spacing.m,
  },
  backLinkEmptyPage: {
    marginTop: theme.spacing.xl,
  },
  backLinkText: {
    fontFamily: theme.fonts.primarySemiBold,
    fontSize: theme.fontSizes.m,
    color: theme.colors.accent.primary,
  },
});

export default styles;