import type { Page } from '@open-slide/core';
import { cover, mythClass, paletteReference, programs, trustPyramid } from './content';
import { CoverPage, MythClassPage, PaletteReferencePage, ProgramPage, TrustPyramidPage } from './components';
import { discoveryQuestions, openDesignManifest, selfReviewChecklist } from './open-design';
import { implementedWireframes } from './wireframes';

export { discoveryQuestions, openDesignManifest, selfReviewChecklist };
export { implementedWireframes };

export const createChannelPlanSlides = ({ includePalette = true }: { includePalette?: boolean } = {}) => {
  const total = includePalette ? 8 : 7;

  const pages: Page[] = [
    () => <CoverPage data={cover} index={1} total={total} />,
    () => <TrustPyramidPage data={trustPyramid} index={2} total={total} />,
    ...programs.map((program, programIndex) => {
      const PageComponent: Page = () => <ProgramPage data={program} index={programIndex + 3} total={total} />;
      return PageComponent;
    }),
    () => <MythClassPage data={mythClass} index={7} total={total} />,
  ];

  if (includePalette) {
    pages.push(() => <PaletteReferencePage data={paletteReference} index={8} total={total} />);
  }

  return pages;
};

export const channelPlanSlides = createChannelPlanSlides({ includePalette: true });
export const channelPlanShareSlides = createChannelPlanSlides({ includePalette: false });
