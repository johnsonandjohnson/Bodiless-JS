import React from 'react';
import type { FC } from 'react';
import {
  Fragment, H1, P, designable, Div,
} from '@bodiless/fclasses';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import type { DialogBaseProps, DialogComponents } from './types';

/**
 * Defines the starting elements to be used for each sub-components ("slots").
 * These can be modified by applying Vital tokens to this component.
 *
 * Note that in most cases, these are simple HTML elements (we import
 * the `stylable` versions from `@bodiless/fclasses` so that they can
 * have classes applied by Vital tokens).
 */
const dialogComponents: DialogComponents = {
  Border: Div,
  TitleWrapper: H1,
  MessageWrapper: P,
  // For the content slots we use a `Fragment` since the actual component
  // used to render content may depend on the type of content.
  Title: Fragment,
  Message: Fragment,
};

/**
 * The actual clean compnoent base is defined next.
 *
 * Note that it will receive a `components` prop which contains all the
 * starting elements defined above, already modified by any Vital tokens
 * which have been applied.
 */
const DialogCleanBase: FC<DialogBaseProps> = ({ components: C, ...rest }) => (
  // Note that we pass the props received by the `Dialog` component to
  // the `Wrapper` slot.  This is standard p
  <C.Border {...rest}>
    <C.TitleWrapper>
      <C.Title />
    </C.TitleWrapper>
    <C.MessageWrapper>
      <C.Message />
    </C.MessageWrapper>
  </C.Border>
);

/**
 * By making our clean component `designable`, we allow it to receive
 * a `design` prop. This is an object with the same keys as the
 * `components` prop received by the base component. Each value is
 * a Higher Order Component composing all the Vital tokens which have
 * been applied to that slot.  `designable` will apply the HOC's to
 * the starting component in each slot, and pass the resulting sub-component
 * through to the `DialogCleanBase` in the `components` prop.
 *
 * The second paramter to `designable` is a string which will be used
 * to identify slots in the rendered parkup.  This makes it easier
 * to understand which slot to target in order to modify a particular
 * DOM element.
 */
const DialogClean = designable(dialogComponents, 'Dialog')(DialogCleanBase);

/**
 * We also export a utility which can be used to create tokens which
 * apply to the `DialogClean`.  This ensures type safety, as well
 * as ensuring that all token domains will be applied in the canonical
 * order.
 */
const asDialogToken = asVitalTokenSpec<DialogComponents>();

export default DialogClean;
export { asDialogToken };
