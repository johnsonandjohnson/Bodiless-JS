/* eslint-disable @typescript-eslint/indent */
import { ComponentOrTag, ComponentWithMeta, TokenCollection } from '@bodiless/fclasses';

/**
 * Defines a structure for the Design Manager Spec for components.
 * Export out an object that adheres to this interface and point Design Manager at it.
 * @see {TokenCollection}
 * @example
 *  import type { VitalDesignSpec } from '@bodiless/vital-elements';
 *
 *  import * as cxCard from './Card.token';
 *  import { CardClean } from './Card';
 *
 *  export const cardSpec: VitalDesignSpec = {
 *    tokens: cxCard,
 *    component: CardClean,
 *    tokensExportName: 'cxCard',
 *    componentExportName: 'CardClean',
 *  };
 */
export interface VitalDesignSpec<
  /**
   * The sub-components of the component. For example `CardComponents`
   */
  SubComponents extends Record<string, ComponentOrTag<any>> = Record<string, ComponentOrTag<any>>,
> {
  /**
   * A TokenCollection that is associated with the Clean Component.
   */
  tokens: TokenCollection<any, any>;
  /**
   * The exported name that is passed to `tokens`
   */
  tokensExportName: string;
  /**
   * A Clean Component to which the tokens from above are meant to be applied to.
   */
  component: ComponentWithMeta;
  /**
   * The exported name that is passed to `component`
   */
  componentExportName: string;
  /**
   * Slots used, keys are slot names
   */
  slots: Partial<
    Record<
      keyof SubComponents,
      {
        title: string;
        description?: string;
        /**
         * To restrict which patterns can be used in this slot, supply an array of patternIds.
         * If empty, NO patterns are allowed, if `null`, all patterns are allowed.
         */
        allowedPatternIds?: string[];
      }
    >
  >;
}
