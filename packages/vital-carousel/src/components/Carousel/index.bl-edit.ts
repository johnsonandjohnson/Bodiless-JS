import type { ComponentType } from 'react';
import { withoutHydration, /* withoutHydrationInline */ } from '@bodiless/hydration';
import vitalCarouselStatic from './tokens';

import type { VitalCarouselProps } from './types';
import VitalCarouselClean from './VitalCarouselClean';

// import { carouselScript } from './utils/carousel';

/**
 * This clean component is always static.  That means it is never hydrated
 * in the browser, and must not contain any client-side interactivity.
 *
 * If anything inserted into a component slot (or any children) requires
 * interactivity, Use VitalCarouselClean instead.
 */

// Referfence Type to pass in:
// export type WithoutHydrationOptions = {
//   onUpdate?: (props: Record<string, any>, element: HTMLElement | null) => void
//   WrapperStyle?: CSSProperties
//   WrapperElement: 'div'|'span',
// };

// {
//  onUpdate: (onUpdateCarouselInit)
// };

const CarouselStatic: ComponentType<VitalCarouselProps> = withoutHydration()(
  VitalCarouselClean
);
// @TODO Use withoutHydrationInline if your component renders inline
// const VitalCarouselStatic: ComponentType<VitalCarouselProps> = withoutHydrationInline()(
//   VitalCarouselClean
// );

export {
  vitalCarouselStatic,
  CarouselStatic,
};
