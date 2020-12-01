/**
 * Copyright © 2019 Johnson & Johnson
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

import React, { HTMLProps, ComponentType } from 'react';
import {
  useMenuOptionUI,
  asBodilessComponent,
  withoutProps,
  ifEditable,
  withExtendHandler,
  UseBodilessOverrides,
  useNode,
  ifToggledOn,
  EditButtonOptions,
} from '@bodiless/core';
import type { AsBodiless, BodilessOptions } from '@bodiless/core';
import { flowRight, identity } from 'lodash';
import {
  replaceWith,
  Fragment,
} from '@bodiless/fclasses';
import DefaultNormalHref from './NormalHref';
import type { HrefNormalizer } from './NormalHref';

// Type of the data used by this component.
export type LinkData = {
  href: string;
};

type Props = HTMLProps<HTMLAnchorElement> & {
  unwrap?: () => void,
};

type ExtraLinkOptions = {
  normalizeHref: HrefNormalizer,
  instructions?: string,
};

type UseLinkOverrides = UseBodilessOverrides<Props, LinkData, ExtraLinkOptions>;

const DEFAULT_INSTRUCTIONS = `
  Use a fully formed URL only for external links, e.g., https://www.example.com.
  Internal links should be specified without a protocol or domain. Internal
  links beginning with a './' will be relative to the current page. Those not
  beginning with a './' will be prefixed with '/' and be relative to
  the site root.  All links will have a trailing slash appended.
`;

const useLinkOverrides = (useOverrides: UseLinkOverrides = () => ({})): UseLinkOverrides => (
  props => {
    const overrides = useOverrides(props);
    const {
      submitValueHandler: submitValueHandler$ = identity,
      normalizeHref = (href?: string) => new DefaultNormalHref(href).toString(),
      instructions = DEFAULT_INSTRUCTIONS,
    } = overrides;
    const submitValueHandler = ({ href }: LinkData) => submitValueHandler$({
      href: normalizeHref(href),
    });
    const finalOverrides: Partial<EditButtonOptions<Props, LinkData>> & ExtraLinkOptions = {
      ...overrides,
      normalizeHref,
      submitValueHandler,
      renderForm: ({ componentProps: { unwrap }, closeForm }) => {
        const {
          ComponentFormTitle,
          ComponentFormLabel,
          ComponentFormText,
          ComponentFormUnwrapButton,
          ComponentFormDescription,
        } = useMenuOptionUI();
        const removeLinkHandler = (event: React.MouseEvent) => {
          event.preventDefault();
          if (unwrap) {
            unwrap();
          }
          closeForm(event);
        };
        return (
          <>
            <ComponentFormTitle>Link</ComponentFormTitle>
            <ComponentFormLabel htmlFor="link-href">URL</ComponentFormLabel>
            <ComponentFormText field="href" id="link-href" aria-describedby="description" placeholder="/link" />
            <ComponentFormDescription id="description">
              {instructions}
            </ComponentFormDescription>
            {unwrap && (
            <ComponentFormUnwrapButton type="button" onClick={removeLinkHandler}>
              Remove Link
            </ComponentFormUnwrapButton>
            )}
          </>
        );
      },
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

export type AsBodilessLink = AsBodiless<Props, LinkData, ExtraLinkOptions>;

const asBodilessLink: AsBodilessLink = (
  nodeKeys, defaultData, useOverrides,
) => flowRight(
  // Prevent following the link in edit mode
  ifEditable(
    withExtendHandler('onClick', () => (e: MouseEvent) => e.preventDefault()),
  ),
  asBodilessComponent<Props, LinkData>(options)(
    nodeKeys, defaultData, useLinkOverrides(useOverrides),
  ),
  withoutProps(['unwrap']),
  withNormalHref(useLinkOverrides(useOverrides) as () => ExtraLinkOptions),
);

/**
 * hook that determines if the link data is empty
 * the hook validates the data in the current node and in the corresponding prop
 *
 * @param props - link based component props
 * @returns true when link data is empty, otherwise false
 */
const useEmptyLinkToggle = ({ href }: Props) => {
  const { node } = useNode<LinkData>();
  return (href === undefined || href === '#') && node.data.href === undefined;
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

export default asBodilessLink;
export { withoutLinkWhenLinkDataEmpty };
