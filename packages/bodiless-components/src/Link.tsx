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
  useNode,
  ifToggledOn,
} from '@bodiless/core';
import type { AsBodiless, BodilessOptions } from '@bodiless/core';
import {
  replaceWith,
  Fragment,
} from '@bodiless/fclasses';
import { flowRight } from 'lodash';

// Type of the data used by this component.
export type LinkData = {
  href: string;
};

type Props = HTMLProps<HTMLAnchorElement> & {
  unwrap?: () => void,
};

const options: BodilessOptions<Props, LinkData> = {
  icon: 'link',
  name: 'Link',
  label: 'Edit',
  groupLabel: 'Link',
  groupMerge: 'merge',
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
          Use relative URLs for internal links. Preface the link with `/` to be
          relative to the root, otherwise the link is relative to the page. Use
          a fully formed URL for external links, e.g., https://www.example.com.
        </ComponentFormDescription>
        {unwrap && (
        <ComponentFormUnwrapButton type="button" onClick={removeLinkHandler}>
          Remove Link
        </ComponentFormUnwrapButton>
        )}
      </>
    );
  },
  global: false,
  local: true,
  defaultData: {
    href: '',
  },
};

const withHrefTransformer = (Component : ComponentType<Props>) => {
  const TransformedHref = ({ href, ...rest } : Props) => <Component href={href !== '' ? href : '#'} {...rest} />;
  return TransformedHref;
};

export type AsBodilessLink = AsBodiless<Props, LinkData>;

export const asBodilessLink: AsBodilessLink = (
  nodeKeys,
  defaultData,
  useOverrides,
) => flowRight(
  // Prevent following the link in edit mode
  ifEditable(
    withExtendHandler('onClick', () => (e: MouseEvent) => e.preventDefault()),
  ),
  asBodilessComponent<Props, LinkData>(options)(nodeKeys, defaultData, useOverrides),
  withoutProps(['unwrap']),
  withHrefTransformer,
);
const Link = asBodilessLink()('a');

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

export default Link;
export { withoutLinkWhenLinkDataEmpty };
