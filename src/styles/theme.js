export const colors = {
  background: {
    primary: '#FFF9F0',
    card: '#FFFFFF',
    input: '#FFFDF5',
    accentSoft: '#FFCBA4',
    dangerSoft: '#F7B2B2',
    successSoft: '#E6FFFA',
  },
  text: {
    primary: '#5D4037',
    headings: '#4E4A40',
    secondary: '#8D6E63',
    onAccentSoft: '#734D26',
    onDangerSoft: '#8B4513',
    onSuccessSoft: '#00695C',
    accent: '#FF8C61',
    white: '#FFFFFF',
  },
  accent: {
    primary: '#FF8C61',
    secondary: '#FFAB76',
    primarySoftHover: '#FFB58A',
    dangerSoftHover: '#F09A9A',
  },
  border: {
    light: '#F0E0D0',
    focused: '#FFAB76',
    error: '#E57373',
  },
  status: {
    danger: '#E57373',
    dangerHover: '#D32F2F',
  },
  shadow: {
    color: 'rgba(180, 140, 100, 0.15)',
  },
  white: '#FFFFFF',
  black: '#000000',
};

export const fonts = {
  primaryRegular: 'OpenSans-Regular',
  primaryBold: 'OpenSans-Bold',
  primarySemiBold: 'OpenSans-SemiBold',
  headingsRegular: 'Nunito-Regular',
  headingsBold: 'Nunito-Bold',
  headingsExtraBold: 'Nunito-ExtraBold',
};

export const spacing = {
  xxs: 4,
  xs: 8,
  s: 12,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 48,
};

export const fontSizes = {
  xs: 12,
  s: 14,
  m: 16,
  l: 18,
  xl: 20,
  h4: 24,
  h3: 28,
  h2: 32,
  h1: 40,
};

export const lineHeights = {
  body: 1.6,
  headings: 1.3,
  condensed: 1.2,
};

export const borderRadius = {
  s: 6,
  m: 12,
  l: 20,
  xl: 30,
  pill: 50,
};

export const shadows = {
  subtle: {
    shadowColor: colors.shadow.color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  card: {
    shadowColor: colors.shadow.color,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 6,
  },
  strong: {
    shadowColor: colors.shadow.color,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 18,
    elevation: 10,
  },
};

const theme = {
  colors,
  fonts,
  spacing,
  fontSizes,
  lineHeights,
  borderRadius,
  shadows,
};

export default theme;