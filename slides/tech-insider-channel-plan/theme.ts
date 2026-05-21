import type { DesignSystem } from '@open-slide/core';

export const design: DesignSystem = {
  palette: {
    bg: '#0F2854',
    text: '#F7F8F0',
    accent: '#4988C4',
  },
  fonts: {
    display:
      '"Play", "Noto Sans TC", "Microsoft JhengHei", system-ui, -apple-system, sans-serif',
    body: '"Noto Sans TC", "Microsoft JhengHei", system-ui, -apple-system, sans-serif',
  },
  typeScale: {
    hero: 136,
    body: 34,
  },
  radius: 8,
};

export const colors = {
  brandNavy: '#0F2854',
  brandRoyal: '#1C4D8D',
  brandSlate: '#355872',
  brandBlue: '#4988C4',
  brandPaleBlue: '#BDE8F5',
  paper: '#F7F8F0',
  ink: '#102A3A',
  muted: '#5F7380',
  line: '#CFE0EA',
  white: '#FFFFFF',
  softAccent: '#EEF8FB',
};

export const layout = {
  pageWidth: 1920,
  pageHeight: 1080,
  padX: 88,
  padTop: 82,
  footerBottom: 36,
  radius: 'var(--osd-radius)',
};

export const typography = {
  kicker: 22,
  pageTitle: 68,
  sectionTitle: 112,
  hero: 'var(--osd-size-hero)',
  cardTitle: 38,
  body: 28,
  small: 22,
};

export const effects = {
  cardShadow: '0 22px 44px rgba(8, 32, 51, 0.08)',
  badgeShadow: '0 12px 28px rgba(8, 32, 51, 0.08)',
};

export const basePage = {
  width: '100%',
  height: '100%',
  position: 'relative' as const,
  overflow: 'hidden',
  fontFamily: 'var(--osd-font-body)',
};
