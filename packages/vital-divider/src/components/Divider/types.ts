import type { ComponentOrTag, DesignableProps, TokenSpec } from '@bodiless/fclasses';
import type { DefaultDomains } from '@bodiless/vital-elements';

/**
 * Type representing the "slots" exposed by the DividerClean component.
 */
export type DividerComponents = {
  Wrapper: ComponentOrTag<any>,
  Slot1Wrapper: ComponentOrTag<any>,
  Slot1: ComponentOrTag<any>,
  Slot2Wrapper: ComponentOrTag<any>,
  Slot2: ComponentOrTag<any>,
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
export interface DividerDivider {
  /**
   * Default styling and behavior.
   */
  Default: DividerToken;

  // Document other tokens here.
};