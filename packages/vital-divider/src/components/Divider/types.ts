import type { ComponentOrTag, DesignableProps, TokenSpec } from '@bodiless/fclasses';
import type { DefaultDomains } from '@bodiless/vital-elements';

/**
 * Type representing the "slots" exposed by the DividerClean component.
 */
export type DividerComponents = {
  Wrapper: ComponentOrTag<any>,
  Divider : ComponentOrTag<any>,
};

/**
 * The props accepted by the DividerClean component
 */
export type DividerProps = DesignableProps<DividerComponents>;

/**
 * The type of a token spec which applies to the DividerClean component.
 */
export type DividerToken = TokenSpec<DividerComponents, DefaultDomains>;

/**
 * Tokens for the DividerClean component.
 *
 * @category Token Collection
 * @see [[DividerClean]]
 */
export interface VitalDividers {
  /**
   * Default styling and behavior.
   */
  Default: DividerToken;

  /**
   * Primary styling and behavior.
   */
  Primary: DividerToken

  // Document other tokens here.
};