/**
 * Copyright © 2020 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Fragment } from 'react';
import {
  withSidecarNodes, ifReadOnly, ifEditable, withOnlyProps,
} from '@bodiless/core';
import type { UseBodilessOverrides, EditButtonProps } from '@bodiless/core';
import { flowRight, identity, flow } from 'lodash';
import { replaceWith, withDesign, withoutProps } from '@bodiless/fclasses';
import type { HOC } from '@bodiless/fclasses';
import type { AsBodilessLink } from './Link';
import {
  withChameleonComponentFormControls, applyChameleon, withChameleonContext, useChameleonContext,
  withDeleteNodeOnUnwrap,
} from './Chameleon';

const SafeFragment = withOnlyProps('key', 'children')(Fragment);
const SafeSpan = withoutProps('href')('span');

const extendOverrides = <P extends object, D extends object>(
  useOverrides: UseBodilessOverrides<P, D> = () => ({}),
) => (
    extender: UseBodilessOverrides<P, D> = () => ({}),
  ): UseBodilessOverrides<P, D> => (props: P & EditButtonProps<D>) => ({
    ...useOverrides(props),
    ...extender(props),
  });

/**
 * @private
 * Default hoc used to replace link when toggled off.
 */
const defaultAsOff = flow(
  ifEditable(replaceWith(SafeSpan)),
  ifReadOnly(replaceWith(SafeFragment)),
);

/**
 * Creates an AsBodiless... HOC factory which can be used to wrap a component
 * in a toggled bodiless link.
 *
 * @param asEditableLink
 * HOC factory which should be used to create the plain link.
 *
 * @param asOff
 * Optional HOC to apply when the link is toggled off.  By default, replaces the
 * wrapped component with a fragment (or with a span in edit mode).
 */
const withBodilessLinkToggle = (
  asEditableLink: AsBodilessLink,
  asOff: HOC = defaultAsOff,
): AsBodilessLink => (
  nodeKey, defaultData, useOverrides,
) => {
  const useOverrides$ = extendOverrides<any, any>(
    () => ({
      label: useChameleonContext().isOn ? 'Edit' : 'Add',
      formTitle: useChameleonContext().isOn ? 'Edit Link' : 'Add Link',
    }),
  )(useOverrides as UseBodilessOverrides);
  return flowRight(
    withDesign({
      _default: asOff,
      Link: identity,
    }),
    withChameleonContext('link-toggle'),
    withChameleonComponentFormControls,
    withSidecarNodes(
      flowRight(
        ifEditable(withDeleteNodeOnUnwrap(nodeKey)),
        asEditableLink(nodeKey, defaultData, useOverrides$),
      ),
    ),
    applyChameleon,
  );
};

export default withBodilessLinkToggle;
