import type { ComponentOrTag, DesignableProps, TokenSpec } from '@bodiless/fclasses';
import type { DefaultDomains } from '@bodiless/vital-elements';

/**
 * Type representing the "slots" exposed by the CarouselDotClean component.
 */
export type CarouselDotComponents = {
  Wrapper: ComponentOrTag<any>,
  DotWrapper: ComponentOrTag<any>,
  Dot: ComponentOrTag<any>,
};

/**
 * The props accepted by the CarouselDotClean component
 */
export type CarouselDotProps = DesignableProps<CarouselDotComponents>;

/**
 * The type of a token spec which applies to the CarouselDotClean component.
 */
export type CarouselDotToken = TokenSpec<CarouselDotComponents, DefaultDomains>;

/**
 * Tokens for the CarouselDotClean component.
 *
 * @category Token Collection
 * @see [[CarouselDotClean]]
 */
export interface VitalCarouselDot {
  /**
   * Default styling and behavior.
   */
  Default: CarouselDotToken;
  // Document other tokens here.
}
