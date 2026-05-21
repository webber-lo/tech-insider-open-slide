export type AccentColor = string;

export type DeckMeta = {
  title: string;
  createdAt: string;
};

export type ContentCardData = {
  label: string;
  body: string;
  color?: AccentColor;
};

export type CoverContent = {
  kicker: string;
  title: string;
  subtitle: string;
  footer: string;
  cards: ContentCardData[];
};

export type TrustPyramidContent = {
  kicker: string;
  title: string;
  levels: ContentCardData[];
};

export type ProgramContent = {
  id: string;
  title: string;
  positioning: string;
  carrier: string;
  length: string;
  structure: string;
  source: string;
  accent: AccentColor;
};

export type MythClassContent = {
  kicker: string;
  title: string;
  duration: string;
  headline: string;
  body: string;
  examples: Array<{
    label: string;
    body: string;
  }>;
};

export type ColorToken = {
  name: string;
  hex: string;
  role: string;
  textDark?: boolean;
};

export type PaletteReferenceContent = {
  kicker: string;
  title: string;
  brandColors: ColorToken[];
  tokens: ColorToken[];
};

export type DeckContent = {
  meta: DeckMeta;
  cover: CoverContent;
  trustPyramid: TrustPyramidContent;
  programs: ProgramContent[];
  mythClass: MythClassContent;
  paletteReference: PaletteReferenceContent;
  aiOperationRules: string[];
};
