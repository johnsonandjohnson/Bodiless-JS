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

import React, { HTMLProps } from 'react';
import {
  EditButtonOptions,
  getUI,
  withEditButton,
  withData,
  withContextActivator,
  withNode,
  withNodeDataHandlers,
  withLocalContextMenu,
  WithNodeProps,
  ifEditable,
  Bodiless,
  ifReadOnly,
  withNodeKey,
  withoutProps,
} from '@bodiless/core';
import { flowRight } from 'lodash';

// Type of the data used by this component.
export type Data = {
  href: string;
};

// Type of the props accepted by this component.
// Exclude the href from the props accepted as we write it.
type AProps = HTMLProps<HTMLAnchorElement>;

export type Props = Pick<AProps, Exclude<keyof AProps, 'href'>> & {
  unwrap?: () => void,
};

// Options used to create an edit button.
export const editButtonOptions: EditButtonOptions<Props, Data> = {
  icon: 'link',
  name: 'Link',
  renderForm: ({ ui: formUi, unwrap, closeForm }) => {
    const {
      ComponentFormTitle,
      ComponentFormLabel,
      ComponentFormText,
      ComponentFormDescription,
      ComponentFormUnwrapButton,
    } = getUI(formUi);
    const removeLinkHandler = (event: React.MouseEvent) => {
      event.preventDefault();
      if (unwrap) {
        unwrap();
      }
      closeForm();
    };
    return (
      <>
        <ComponentFormTitle>Link</ComponentFormTitle>
        <ComponentFormLabel htmlFor="link-href">URL</ComponentFormLabel>
        <ComponentFormText field="href" id="link-href" aria-describedby="description" />
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
};

const emptyValue = {
  href: '/link',
};
// Composed hoc which creates editable version of the component.
// Note - the order is important. In particular:
// - the node data handlers must be outermost
// - anything relying on the context (activator, indicator) must be
//   *after* `withEditButton()` as this establishes the context.
// - withData must be *after* the data handlers are defiend.
export const asBodilessLink = (nodeKey?: string) => flowRight(
  // @ts-ignore: Types of parameters are incompatible.
  withNodeKey(nodeKey),
  withNode,
  withNodeDataHandlers(emptyValue),
  ifReadOnly(
    withoutProps(['setComponentData']),
  ),
  ifEditable(
    withEditButton(editButtonOptions),
    withContextActivator('onClick'),
    withLocalContextMenu,
  ),
  withData,
) as Bodiless<Props, Props & Partial<WithNodeProps>>;
const Link = asBodilessLink()('a');
export default Link;
