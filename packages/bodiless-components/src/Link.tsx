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
  useFormUI,
  asBodilessComponent,
} from '@bodiless/core';
import type { AsBodiless, BodilessOptions } from '@bodiless/core';
import { flowRight } from 'lodash';

// Type of the data used by this component.
type Data = {
  href: string;
};
type Props = HTMLProps<HTMLAnchorElement>;

const options: BodilessOptions<HTMLProps<HTMLAnchorElement>, Data> = {
  icon: 'link',
  name: 'Link',
  label: 'Link',
  renderForm: ({ unwrap, closeForm }) => {
    const {
      ComponentFormTitle,
      ComponentFormLabel,
      ComponentFormText,
      ComponentFormUnwrapButton,
      ComponentFormDescription,
    } = useFormUI();
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

export const asBodilessLink: AsBodiless<Props, Data> = (nodeKeys?) => flowRight(
  asBodilessComponent<Props, Data>(options)(nodeKeys),
  withHrefTransformer,
);
const Link = asBodilessLink()('a');
export default Link;
