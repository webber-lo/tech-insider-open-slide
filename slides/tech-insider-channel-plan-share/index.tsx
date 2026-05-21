import type { SlideMeta } from '@open-slide/core';
import { deckMeta } from '../tech-insider-channel-plan/content';
import { channelPlanShareSlides } from '../tech-insider-channel-plan/slides';
import { design } from '../tech-insider-channel-plan/theme';

export { design };

export const meta: SlideMeta = {
  ...deckMeta,
  title: 'TECH INSIDER Channel Plan Share',
};

export default channelPlanShareSlides;
