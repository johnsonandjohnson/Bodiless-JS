import type { ComponentOrTag, DesignableProps, TokenSpec } from '@bodiless/fclasses';
import type { DefaultDomains } from '@bodiless/vital-elements';

/**
 * Type representing the "slots" exposed by the CarouselThumbClean component.
 */
export type CarouselThumbComponents = {
  Wrapper: ComponentOrTag<any>,
  Image: ComponentOrTag<any>,
};

/**
 * The props accepted by the CarouselThumbClean component
 */
export type CarouselThumbProps = DesignableProps<CarouselThumbComponents>;

/**
 * The type of a token spec which applies to the CarouselThumbClean component.
 */
export type CarouselThumbToken = TokenSpec<CarouselThumbComponents, DefaultDomains>;

/**
 * Tokens for the CarouselThumbClean component.
 *
 * @category Token Collection
 * @see [[CarouselThumbClean]]
 */
export interface VitalCarouselThumb {
  /**
   * Default styling and behavior.
   */
  Default: CarouselThumbToken;

  // Document other tokens here.
}
