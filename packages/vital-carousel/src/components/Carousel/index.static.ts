import {
  withoutHydration,
  staticTokenCollection
  // Use `StaticInline` if your component renders inline elements.
  // StaticInline as StaticComponent,
} from '@bodiless/hydration';

const vitalCarouselStatic = staticTokenCollection;

const onUpdateCarouselInit = (props: Record<string, any>, element: HTMLElement | null) => {
  if (element === null) return;

  // @ts-ignore
  if (sliderSimpleInit !== 'undefined') {
    // @ts-ignore
    sliderSimpleInit(element);
  }
};

const options = {
  onUpdate: onUpdateCarouselInit
};

const CarouselStatic = withoutHydration(options)(() => null);

export {
  vitalCarouselStatic,
  CarouselStatic,
};
