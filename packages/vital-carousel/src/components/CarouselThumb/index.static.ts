import {
  staticTokenCollection,
  StaticBlock as StaticComponent,
  // Use `StaticInline` if your component renders inline elements.
  // StaticInline as StaticComponent,
} from '@bodiless/hydration';

export { default as vitalCarouselThumb } from './tokens';
export const vitalCarouselThumbStatic = staticTokenCollection;
export { default as CarouselThumbClean } from './CarouselThumbClean';
export const CarouselThumbStatic = StaticComponent;
