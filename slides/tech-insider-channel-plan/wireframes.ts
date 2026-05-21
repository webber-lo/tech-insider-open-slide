export type WireframeKind =
  | 'cover'
  | 'section'
  | 'program'
  | 'pyramid'
  | 'matrix'
  | 'timeline'
  | 'imageHero'
  | 'comparison'
  | 'infographic'
  | 'vertical916'
  | 'paletteReference';

export type WireframeSpec = {
  kind: WireframeKind;
  component: string;
  status: 'implemented' | 'planned';
  bestFor: string;
  contentShape: string;
  notes: string;
};

export const wireframes: WireframeSpec[] = [
  {
    kind: 'cover',
    component: 'CoverPage',
    status: 'implemented',
    bestFor: 'Deck title, positioning statement, and three strategic anchors.',
    contentShape: 'CoverContent',
    notes: 'Use dark brand background, one large title, one subtitle, and three cards.',
  },
  {
    kind: 'pyramid',
    component: 'TrustPyramidPage',
    status: 'implemented',
    bestFor: 'Layered logic, trust hierarchy, strategy stack, or maturity model.',
    contentShape: 'TrustPyramidContent',
    notes: 'Use four levels. Keep each body sentence short enough for one band.',
  },
  {
    kind: 'program',
    component: 'ProgramPage',
    status: 'implemented',
    bestFor: 'One recurring show, content format, product module, or editorial pillar.',
    contentShape: 'ProgramContent',
    notes: 'Use one positioning paragraph and four metadata fields: carrier, length, structure, source.',
  },
  {
    kind: 'infographic',
    component: 'MythClassPage',
    status: 'implemented',
    bestFor: 'Short-form explainer concepts with one lead claim and three examples.',
    contentShape: 'MythClassContent',
    notes: 'Current version is horizontal 16:9. Do not use it for 9:16 output.',
  },
  {
    kind: 'paletteReference',
    component: 'PaletteReferencePage',
    status: 'implemented',
    bestFor: 'Brand book appendix, color token documentation, and SDD handoff.',
    contentShape: 'PaletteReferenceContent',
    notes: 'Keep this in the full deck, omit from share deck unless the audience needs production specs.',
  },
  {
    kind: 'section',
    component: 'SectionPage',
    status: 'planned',
    bestFor: 'Chapter dividers and agenda transitions.',
    contentShape: 'SectionContent',
    notes: 'Planned for the formal wireframe library.',
  },
  {
    kind: 'matrix',
    component: 'MatrixPage',
    status: 'planned',
    bestFor: 'Two-axis decisions, prioritization, market mapping, and content portfolio views.',
    contentShape: 'MatrixContent',
    notes: 'Use when the user asks for a 2x2 or quadrant page.',
  },
  {
    kind: 'timeline',
    component: 'TimelinePage',
    status: 'planned',
    bestFor: 'Roadmaps, publishing cadence, launch plans, and production workflow.',
    contentShape: 'TimelineContent',
    notes: 'Use for chronological sequences with 3-6 milestones.',
  },
  {
    kind: 'imageHero',
    component: 'ImageHeroPage',
    status: 'planned',
    bestFor: 'A strong visual reference plus OpenSlide-rendered Chinese text.',
    contentShape: 'ImageHeroContent',
    notes: 'Images carry mood and subject matter only; OpenSlide owns every readable text layer.',
  },
  {
    kind: 'comparison',
    component: 'ComparisonPage',
    status: 'planned',
    bestFor: 'Before/after, old/new strategy, channel tradeoffs, or option comparison.',
    contentShape: 'ComparisonContent',
    notes: 'Use two or three columns, not many small cards.',
  },
  {
    kind: 'vertical916',
    component: 'Vertical916Page',
    status: 'planned',
    bestFor: 'NotebookLM-style vertical infographic, reels, and social distribution.',
    contentShape: 'Vertical916Content',
    notes: 'Must live in a separate 9:16 deck, not inside the 16:9 channel plan.',
  },
];

export const implementedWireframes = wireframes.filter((wireframe) => wireframe.status === 'implemented');
