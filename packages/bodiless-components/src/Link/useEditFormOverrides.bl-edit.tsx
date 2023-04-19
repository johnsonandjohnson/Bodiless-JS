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
} from '@bodiless/core';
import identity from 'lodash/identity';
import { withFieldApi } from 'informed';
import DefaultNormalHref from './NormalHref';
import {
  LinkData,
  UseLinkOverrides,
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

const useEditFormOverrides = (
  overrides: ReturnType<UseLinkOverrides>
): ReturnType<UseLinkOverrides> => {
  const {
    submitValueHandler: submitValueHandler$ = identity,
    normalizeHref = (href?: string) => new DefaultNormalHref(href).toString(),
    instructions = DEFAULT_INSTRUCTIONS,
    fileUpload = {},
  } = overrides;
  const { accept: fileUploadAccept = DEFAULT_ALLOWED_FILE_TYPES } = fileUpload;
  const submitValueHandler = ({ href, 'aria-label': ariaLabel }: LinkData) => submitValueHandler$({
    href: normalizeHref(href),
    'aria-label': ariaLabel,
  });
  return {
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
          <ComponentFormLabel htmlFor="aria-label">Aria Label</ComponentFormLabel>
          <ComponentFormText field="aria-label" id="aria-label" aria-describedby="description" placeholder="aria-label" />
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
};

export default useEditFormOverrides;
