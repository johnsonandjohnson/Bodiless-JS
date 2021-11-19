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
  useMenuOptionUI,
  asBodilessComponent,
  ifEditable,
  withExtendHandler,
  ifToggledOn,
  EditButtonOptions,
  useEditContext,
  useNode,
  ContentNode,
} from '@bodiless/core';
import type { BodilessOptions } from '@bodiless/core';
import flowRight from 'lodash/flowRight';
import identity from 'lodash/identity';
import {
  Fragment,
  addProps,
  replaceWith,
  withoutProps,
  asToken,
  flowIf,
  addClassesIf,
} from '@bodiless/fclasses';
import { withFieldApi } from 'informed';
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
import { FileUpload as BaseFileUpload, FileUploadProps } from '../FileUpload';

const DEFAULT_INSTRUCTIONS = `
  Use a fully formed URL only for external links, e.g., https://www.example.com.
  Internal links should be specified without a protocol or domain. Internal
  links beginning with a './' will be relative to the current page. Those not
  beginning with a './' will be prefixed with '/' and be relative to
  the site root.  All links will have a trailing slash appended.
`;

const DEFAULT_ALLOWED_FILE_TYPES = [
  // pdf
  'application/pdf',
  // doc
  'application/msword',
  // docx
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const FileUpload: ComponentType<Omit<FileUploadProps, 'fieldApi'>> = withFieldApi('href')(BaseFileUpload);

const useLinkOverrides = (useOverrides: UseLinkOverrides = () => ({})): UseLinkOverrides => (
  props => {
    const overrides = useOverrides(props);
    const {
      submitValueHandler: submitValueHandler$ = identity,
      normalizeHref = (href?: string) => new DefaultNormalHref(href).toString(),
      instructions = DEFAULT_INSTRUCTIONS,
      fileUpload = {},
    } = overrides;
    const { accept: fileUploadAccept = DEFAULT_ALLOWED_FILE_TYPES } = fileUpload;
    const submitValueHandler = ({ href }: LinkData) => submitValueHandler$({
      href: normalizeHref(href),
    });
    const finalOverrides: Partial<EditButtonOptions<Props, LinkData>> & ExtraLinkOptions = {
      ...overrides,
      normalizeHref,
      submitValueHandler,
      renderForm: ({
        componentProps: { unwrap, ui: { fileUpload: fileUploadUI } = {} },
        closeForm,
      }) => {
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
            <ComponentFormLabel>File Upload</ComponentFormLabel>
            <FileUpload ui={fileUploadUI} accept={fileUploadAccept} />
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
 * Token that disables non-menu links on the page.
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
    asToken(
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
