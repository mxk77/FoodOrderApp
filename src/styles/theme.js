// src/theme.js

// Define your primary and heading font families
// Ensure these names match how they are recognized after linking (see Font Handling section)
export const fonts = {
  primary: 'Open Sans', // Or 'OpenSans-Regular', etc.
  primaryBold: 'Open Sans Bold', // Or 'OpenSans-SemiBold', 'OpenSans-Bold'
  headings: 'Nunito', // Or 'Nunito-Regular', etc.
  headingsBold: 'Nunito-Bold', // Or 'Nunito-ExtraBold' for 800 weight
  // Add other weights as needed, e.g., headingsLight, headingsSemiBold
};

export const colors = {
  bgPrimary: '#fff9f0',
  textPrimary: '#5d4037',
  textHeadings: '#4e4a40',
  textSecondary: '#8d6e63',
  accentPrimary: '#ff8c61',
  accentSecondary: '#ffab76',
  cardBg: '#ffffff',
  borderLight: '#f0e0d0',
  shadowWarm: 'rgba(180, 140, 100, 0.12)', // Note: shadow application is platform-specific
  danger: '#e57373',
  dangerHover: '#d32f2f', // For pressed states
  accentPrimarySoft: '#ffcba4',
  accentPrimarySoftHover: '#ffb58a', // For pressed states
  textOnAccentSoft: '#734d26',
  dangerSoft: '#f7b2b2',
  dangerSoftHover: '#f09a9a', // For pressed states
  textOnDangerSoft: '#8b4513',
};

export const SIZES = {
  // Base font size for calculations (if you use em-like scaling)
  base: 16,

  // Font sizes (converted from em, assuming base is 16px)
  h1: 2.5 * 16, // 40
  h2: 2.0 * 16, // 32
  h3: 1.75 * 16, // 28
  h4: 1.5 * 16, // 24
  h5: 1.25 * 16, // 20
  h6: 1.0 * 16, // 16
  body: 16, // Default body text size

  // Padding, Margins, etc. (can add common spacing units here)
  padding: 15,
  margin: 15,
};

export const BORDER_RADIUS = {
  medium: 12,
  large: 20,
  extraLarge: 30,
  pill: 50, // Often used for buttons with rounded ends
};

export const LINE_HEIGHTS = {
  body: 1.6, // This will be multiplied by font size
  headings: 1.3, // This will be multiplied by font size
};

// Helper for shadows (React Native shadow props are different from CSS)
// This is a basic example; you might need more sophisticated shadow handling
export const SHADOWS = {
  light: {
    // iOS
    shadowColor: colors.shadowWarm,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    // Android
    elevation: 3,
  },
  medium: {
    // iOS
    shadowColor: colors.shadowWarm,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    // Android
    elevation: 5,
  },
};

export default {
  fonts,
  colors,
  SIZES,
  BORDER_RADIUS,
  LINE_HEIGHTS,
  SHADOWS,
};