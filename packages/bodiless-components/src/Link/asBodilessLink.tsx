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

import React, { ComponentType } from 'react';
import {
  asBodilessComponent,
  ifEditable,
  withExtendHandler,
  ifToggledOn,
  EditButtonOptions,
  useEditContext,
} from '@bodiless/core';
import {
  useNode,
  ContentNode,
} from '@bodiless/data';
import type { BodilessOptions } from '@bodiless/core';
import flowRight from 'lodash/flowRight';
import {
  Fragment,
  addProps,
  replaceWith,
  withoutProps,
  flowHoc,
  flowIf,
  addClassesIf,
} from '@bodiless/fclasses';
import { useGetDisabledPages } from '../PageDisable';
import DefaultNormalHref from './NormalHref';
import withGoToLinkButton from './withGoToLinkButton';
import useEmptyLinkToggle from './useEmptyLinkToggle';
import useGetLinkHref from './useGetLinkHref';
import {
  LinkData,
  UseLinkOverrides,
  Props,
  ExtraLinkOptions,
  AsBodilessLink,
} from './types';
import useEditFormOverrides from './useEditFormOverrides.bl-edit';

const useLinkOverrides = (useOverrides: UseLinkOverrides = () => ({})): UseLinkOverrides => (
  props => {
    const overrides = useOverrides(props);
    const {
      normalizeHref = (href?: string) => new DefaultNormalHref(href).toString(),
    } = overrides;
    const editFormOverrides = useEditFormOverrides(overrides);
    const finalOverrides: Partial<EditButtonOptions<Props, LinkData>> & ExtraLinkOptions = {
      ...overrides,
      normalizeHref,
      ...editFormOverrides,
    };
    return finalOverrides;
  }
);

const options: BodilessOptions<Props, LinkData> = {
  icon: 'link',
  name: 'Link',
  label: 'Edit',
  groupLabel: 'Link',
  groupMerge: 'merge',
  // The actual form is provided by useLinkOverrides above.
  renderForm: () => <></>,
  global: false,
  local: true,
  defaultData: {
    href: '',
    'aria-label': undefined,
  },
};

const withNormalHref = (
  useOverrides: () => ExtraLinkOptions,
) => (Component : ComponentType<Props>) => {
  const WithNormalHref = ({ href, ...rest }: Props) => (
    <Component
      href={useOverrides().normalizeHref(href)}
      {...rest}
    />
  );
  return WithNormalHref;
};

const withLinkTarget = (
  useOverrides: () => ExtraLinkOptions,
) => (Component : ComponentType<Props>) => {
  const WithLinkTarget = (props: Props) => {
    const { target } = useOverrides();
    if (!target) return <Component {...props} />;
    return (
      <Component
        target={target}
        {...props}
      />
    );
  };
  return WithLinkTarget;
};

/**
 * HOC that can be applied to a link based component to not render the component
 * when the component link data is empty
 * Note: the component will still render its children
 *
 * @param Component - link based component
 * @returns Component - Fragment when link data empty, input Component otherwise
 */
const withoutLinkWhenLinkDataEmpty = ifToggledOn(useEmptyLinkToggle)(replaceWith(Fragment));

// @TODO: Move to richtext types?
type ParentGetters = {
  getParentNode: () => ContentNode<object>,
  getParentPeer: (path: string|string[]) => ContentNode<object>,
};
type SlateNodeWithParentGetters<T> = {
  node: ContentNode<T> & {
    getGetters: () => ParentGetters,
  }
};

/**
 * Hook that returns true if the current link is Disabled, false otherwise.
 */
const useIsLinkDisabled = () => {
  const { node } = useNode() as SlateNodeWithParentGetters<LinkData>;
  const href = useGetLinkHref(node);
  if (!href) {
    return false;
  }
  const node$ = node.path[0] === 'slatenode' ? node.getGetters().getParentNode() : node;
  const disabledPages = useGetDisabledPages(node$);
  // Content links
  if (disabledPages?.[href]?.contentLinksDisabled === true && node.path[0] !== 'Site') {
    return true;
  }
  // Menu links
  if (disabledPages?.[href]?.menuLinksDisabled === true && node.path[0] === 'Site') {
    return true;
  }

  return false;
};

/**
 * HOC that disables non-menu links on the page.
 */
const asDisabledPageLink = flowIf(useIsLinkDisabled)(
  withoutProps('href'),
  addProps({
    title: 'Link Disabled'
  }),
  addClassesIf(() => useEditContext().isEdit)('bl-link-disabled'),
);

const asBodilessLink: AsBodilessLink = (
  nodeKeys, defaultData, useOverrides,
) => flowRight(
  asBodilessComponent<Props, LinkData>(options)(
    nodeKeys, defaultData, useLinkOverrides(useOverrides),
  ),
  ifEditable(
    flowHoc(
      // Prevent following the link in edit mode
      withExtendHandler('onClick', () => (e: MouseEvent) => e.preventDefault()),
      addProps({ draggable: false }),
      withGoToLinkButton(useLinkOverrides(useOverrides) as () => ExtraLinkOptions),
    ),
  ),
  withoutProps(['unwrap']),
  withNormalHref(useLinkOverrides(useOverrides) as () => ExtraLinkOptions),
  withLinkTarget(useLinkOverrides(useOverrides) as () => ExtraLinkOptions),
  asDisabledPageLink,
);

export default asBodilessLink;
export { withoutLinkWhenLinkDataEmpty, useIsLinkDisabled };
