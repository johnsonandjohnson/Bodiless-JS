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

/* eslint-disable no-alert */
import React, { ComponentType, useCallback } from 'react';
import {
  contextMenuForm,
  getUI,
  withMenuOptions,
  TMenuOption,
  useEditContext,
} from '@bodiless/core';
import { AxiosPromise } from 'axios';
import BackendClient from './BackendClient';
import handle from './ResponseHandler';
import verifyPage from './PageVerification';
import { useGatsbyPageContext } from './GatsbyPageProvider';

type Client = {
  savePage: (path: string, template?: string) => AxiosPromise<any>;
};

type Props = {
  client?: Client;
};

const formPageAdd = (client: Client, template: string, context: any) => contextMenuForm({
  submitValues: (submittedValues: any) => {
    (async () => {
      context.showPageOverlay({
        message: 'The page is creating.',
        maxTimeoutInSeconds: 10,
      });
      const pathname = window.location.pathname
        ? window.location.pathname.replace(/\/?$/, '/')
        : '';
      const newPagePath = pathname + submittedValues.path;
      const result = await handle(client.savePage(newPagePath, template));
      if (result.response) {
        const isPageVerified = await verifyPage(newPagePath);
        if (!isPageVerified) {
          const errorMessage = `Unable to verify page creation.
It is likely that your new page was created but is not yet available.
Click ok to visit the new page; if it does not load, wait a while and reload.`;
          context.showError({
            message: errorMessage,
            onClose: () => {
              window.location.href = newPagePath;
            },
          });
        } else {
          window.location.href = newPagePath;
        }
      } else {
        context.showError({
          message: result.message,
        });
      }
    })();
  },
})(({ ui, formState }: any) => {
  const {
    ComponentFormTitle,
    ComponentFormLabel,
    ComponentFormText,
    ComponentFormError,
  } = getUI(
    ui,
  );
  const validate = useCallback((value: string) => (!value || !RegExp(/^[a-z0-9_-]+$/i).test(value)
    ? 'No special characters or spaces allowed'
    : undefined), []);

  // ensure trailing slash is present
  const currentPage = window.location.href.replace(/\/?$/, '/');

  return (
    <>
      <ComponentFormTitle>Add a New Page</ComponentFormTitle>
      <ComponentFormLabel htmlFor="new-page-path">
          URL
        <br />
        {`${currentPage}...`}
      </ComponentFormLabel>
      <ComponentFormText
        field="path"
        id="new-page-path"
        validate={validate}
        validateOnChange
        validateOnBlur
      />
      {formState.errors && formState.errors.path && (
      <ComponentFormError>{formState.errors.path}</ComponentFormError>
      )}
    </>
  );
});

const defaultClient = new BackendClient();

const useGetMenuOptions = (): () => TMenuOption[] => {
  const context = useEditContext();
  const gatsbyPage = useGatsbyPageContext();

  return () => [
    {
      name: 'newpage',
      icon: 'note_add',
      label: 'Page',
      isHidden: () => !context.isEdit,
      handler: () => formPageAdd(defaultClient, gatsbyPage.subPageTemplate, context),
    },
  ];
};

const menuOptions = { useGetMenuOptions, name: 'Gatsby' };
const NewPageProvider = withMenuOptions(menuOptions)(React.Fragment) as ComponentType<Props>;
NewPageProvider.displayName = 'NewPageProvider';

export default NewPageProvider;
