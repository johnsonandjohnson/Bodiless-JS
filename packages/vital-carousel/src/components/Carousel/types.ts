import type { ComponentOrTag, DesignableProps, TokenSpec } from '@bodiless/fclasses';
import type { DefaultDomains } from '@bodiless/vital-elements';

/**
 * Type representing the "slots" exposed by the VitalCarouselClean component.
 */
export type VitalCarouselComponents = {
  Wrapper: ComponentOrTag<any>,
  Script: ComponentOrTag<any>,
  SliderWrapper: ComponentOrTag<any>,
  Slider: ComponentOrTag<any>,
  Slide: ComponentOrTag<any>,
  ControlsWrapper: ComponentOrTag<any>,
  Indicator: ComponentOrTag<any>,
  NavWrapper: ComponentOrTag<any>,
  Prev: ComponentOrTag<any>,
  Next: ComponentOrTag<any>,
};

/**
 * The props accepted by the VitalCarouselClean component
 */
export type VitalCarouselProps = DesignableProps<VitalCarouselComponents>;

/**
 * The type of a token spec which applies to the VitalCarouselClean component.
 */
export type VitalCarouselToken = TokenSpec<VitalCarouselComponents, DefaultDomains>;

/**
 * Tokens for the VitalCarouselClean component.
 *
 * @category Token Collection
 * @see [[VitalCarouselClean]]
 */
export interface VitalCarousel {
  /**
   * Default styling and behavior.
   */
  Default: VitalCarouselToken;
  /**
   * WithNavigationButtons: add Navigation buttons on the left & right side of items
   */
  // WithNavigationButtons: VitalCarouselToken;
  /**
   * WithControls: Use controls, must setup display of controls (WithCarouselDots or WithThumbnail)
   */
  WithControls: VitalCarouselToken;
  /**
   * WithCarouselDots: Show dots
   */
  WithCarouselDots: VitalCarouselToken;
  // /**
  //  * WithThumbnail: Show dots as thumbnail images.
  //  */
  WithThumbnail: VitalCarouselToken;
  // /**
  //  * asAccessibleCarousel: make carousel accessible
  //  */
  // asAccessibleCarousel: VitalCarouselToken;
  // /**
  //  * WithImageSlide: Show Image for each slide
  //  */
  WithImageSlide: VitalCarouselToken;
  /**
   * WithCardSlide: Show Product Card for each slide
   */
  WithCardSlide: VitalCarouselToken;

  /**
   * MobileOnly: Show only on Mobile
   */
  MobileOnly: VitalCarouselToken;
  /**
   * TabletOnly: Show only on Tablet
   */
  TabletOnly: VitalCarouselToken;
  /**
   * TabletDesktopOnly: Show only on Tablet/Desktop
   */
  TabletDesktopOnly: VitalCarouselToken;
  /**
   * DesktopOnly: Show only Desktop
   */
  DesktopOnly: VitalCarouselToken;
}
