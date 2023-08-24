import type {
  ComponentOrTag, DesignableProps, TokenSpec, TokenCollection
} from '@bodiless/fclasses';
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
export interface VitalDividersBase {
  /**
   * Divider styling and behavior.
   */
  Base: DividerToken;

  /**
   * Divider Primary Color
   */
  WithPrimaryDivider: DividerToken;

  /**
   * Divider Secondary Color
   */
  WithSecondaryDivider: DividerToken;

  /**
   * Divider Vertical Orientation
   */
  WithVerticalOrientation: DividerToken;

}

export interface VitalDividers extends
  VitalDividersBase,
  TokenCollection<DividerComponents, DefaultDomains>
{}
