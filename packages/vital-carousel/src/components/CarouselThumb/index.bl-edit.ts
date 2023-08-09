import type { ComponentType } from 'react';
import { withoutHydration, /* withoutHydrationInline */ } from '@bodiless/hydration';
import type { CarouselThumbProps } from './types';
import CarouselThumbClean from './CarouselThumbClean';

/**
 * This clean component is always static.  That means it is never hydrated
 * in the browser, and must not contain any client-side interactivity.
 *
 * If anything inserted into a component slot (or any children) requires
 * interactivity, Use CarouselThumbClean instead.
 */
const CarouselThumbStatic: ComponentType<CarouselThumbProps> = withoutHydration()(
  CarouselThumbClean
);
// @TODO Use withoutHydrationInline if your component renders inline
// const CarouselThumbStatic: ComponentType<CarouselThumbProps> = withoutHydrationInline()(
//   CarouselThumbClean
// );

export {
  CarouselThumbClean,
  CarouselThumbStatic,
};
export { default as vitalCarouselThumb } from './tokens';
export { default as vitalCarouselThumbStatic } from './tokens';
