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
  CounterWrapper: ComponentOrTag<any>,
  Counter: ComponentOrTag<any>,
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
  /**
   * WithCarouselDots: Show dots and numbers
   */
  WithCarouselCounter: VitalCarouselToken;
  /**
   * WithCarouselDotsAllViewports: Show carousel dots on all viewports (Usage: Product carousel)
   */
  WithCarouselDotsAllViewports: VitalCarouselToken;
  /**
   * WithCarouselDotsMobileTablet: Show carousel dots on mobile/tablet viewports (Usage:Product PDP)
   */
  WithCarouselDotsMobileTablet: VitalCarouselToken;
  /**
   * WithThumbnail: Show dots as thumbnail images.
   */
  WithThumbnail: VitalCarouselToken;
  /**
   * WithImageSlide: Show Image for each slide
   */
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
   * MobileTabletOnly: Show only Mobile & Tablet
   */
  MobileTabletOnly: VitalCarouselToken;
  /**
   * TabletDesktopOnly: Show only on Tablet/Desktop
   */
  TabletDesktopOnly: VitalCarouselToken;
  /**
   * DesktopOnly: Show only Desktop
   */
  DesktopOnly: VitalCarouselToken;
  /**
   * Show Thumbs as Horizontal on carousel
   */
  WithHorizontalThumbs: VitalCarouselToken;
  /**
   * Show Thumbs as Vertical on carousel
   */
  WithVerticalThumbs: VitalCarouselToken;
}
