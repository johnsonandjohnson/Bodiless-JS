import { ComponentType } from 'react';
import {
  ComponentWithMeta,
  TokenMeta,
  TokenCollection,
  TokenSpec,
} from '@bodiless/fclasses';

/**
 * Defines how Knapsack and Bodiless should handle a component.
 * Export out an object that adheres to this interface and point Knapsack at it.
 * @see {TokenCollection}
 * @example
    import type { KnapsackBodilessSpec } from '@knapsack/renderer-bodiless';
    import * as cxCard from './Card.token';
    import { CardClean } from './Card';

    export const cardSpec: KnapsackBodilessSpec = {
      tokens: cxCard,
      component: CardClean,
    };
 */
export interface KnapsackBodilessSpec<
  /**
   * The sub-components of the component. For example `CardComponents`
   */
  SubComponents extends Record<string, ComponentType> = Record<
    string,
    ComponentType
  >,
> {
  tokens: TokenCollection<any, any>;
  /** The exported name that is passed to `tokens` */
  tokensExportName: string;
  component: ComponentWithMeta;
  /** The exported name that is passed to `component` */
  componentExportName: string;
  /** Slots used, keys are slot names */
  slots: Partial<
    Record<
      keyof SubComponents,
      {
        title: string;
        description?: string;
        /** to restrict which patterns can be used in this slot, supply an array of patternIds. If empty, NO patterns are allowed, if `null`, all patterns are allowed. */
        allowedPatternIds?: string[];
      }
    >
  >;
}
