import type { ComponentType } from 'react';
import { withoutHydration, /* withoutHydrationInline */ } from '@bodiless/hydration';
import type { DividerProps } from './types';
import Divider from './DividerClean';

/**
 * This clean component is always static.  That means it is never hydrated
 * in the browser, and must not contain any client-side interactivity.
 */
const DividerClean: ComponentType<DividerProps> = withoutHydration()(
  Divider
);
// @TODO Use withoutHydrationInline if your component renders inline
// const DividerClean: ComponentType<DividerProps> = withoutHydrationInline()(
//   Divider
// );

export {
  DividerClean,
};
export { default as vitalDividers } from './tokens';
