import type { ComponentType } from 'react';
import { withoutHydration, /* withoutHydrationInline */ } from '@bodiless/hydration';
import type { CarouselDotProps } from './types';
import CarouselDot from './CarouselDotClean';

/**
 * This clean component is always static.  That means it is never hydrated
 * in the browser, and must not contain any client-side interactivity.
 */
const CarouselDotClean: ComponentType<CarouselDotProps> = withoutHydration()(
  CarouselDot
);
// @TODO Use withoutHydrationInline if your component renders inline
// const CarouselDotClean: ComponentType<CarouselDotProps> = withoutHydrationInline()(
//   CarouselDot
// );

export {
  CarouselDotClean,
};
export { default as vitalCarouselDot } from './tokens';
