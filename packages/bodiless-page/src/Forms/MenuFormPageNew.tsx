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

import React, {
  ComponentType,
  HTMLProps,
  useEffect,
  useState,
} from 'react';
import {
  contextMenuForm,
  handleBackendResponse,
  useEditContext,
} from '@bodiless/core';
import { usePageMenuOptionUI } from '../MenuOptionUI';
import { verifyPage } from '../Operations';
import { usePageDataContext } from '../Provider';
import { DEFAULT_PAGE_TEMPLATE } from '../constants';
import {
  PageClient,
  PageStatus,
  PageState,
} from '../types';
import { getPathValue } from '../utils';
import { MenuFormPage } from './MenuFormPage';

const createPage = async ({ path, client, template } : any) => {
  // Create the page.
  const result = await handleBackendResponse(client.savePage(path, template));
  // If the page was created successfully:
  if (result.response) {
    // Verify the creation of the page.
    const isPageVerified = await verifyPage(path);
    if (!isPageVerified) {
      const errorMessage = `Unable to verify page creation.
        It is likely that your new page was created but is not yet available.
        Click ok to visit the new page; if it does not load, wait a while and reload.`;
      return Promise.reject(new Error(errorMessage));
    }
    return Promise.resolve(path);
  }
  // @todo: in case of response `false`, use following msg to cover cases.
  // refactoring once @bodiless/backend via Gatsby proxy HTTPError issue fixed.
  const errorMessage = `Something happened. Please verify page does not already
    exist, and try again. If problem persists, contact a developer.`;
  return Promise.reject(new Error(errorMessage));
};

const menuFormPageNew = (client: PageClient) => contextMenuForm({
  submitValues: ({ keepOpen }: any) => keepOpen,
  hasSubmit: ({ keepOpen }: any) => keepOpen,
})(({ formState, formApi } : any) => {
  const { ComponentFormText } = usePageMenuOptionUI();
  const {
    submitted, invalid, values,
  } = formState;
  const [state, setState] = useState<PageState>({
    status: PageStatus.Init,
  });
  const context = useEditContext();
  const { template } = values;
  const path = getPathValue(values);
  useEffect(() => {
    // If the form is submitted and valid then lets try to create a page.
    if (submitted && path && invalid === false) {
      context.showPageOverlay({ hasSpinner: false });
      setState({ status: PageStatus.Pending });
      // Create the page.
      createPage({ path, client, template })
        .then((pagePath: string) => {
          if (pagePath) {
            setState({ status: PageStatus.Complete, pagePath });
          }
        })
        .catch((err: Error) => {
          setState({ status: PageStatus.Errored, errorMessage: err.message });
        })
        .finally(() => {
          context.hidePageOverlay();
          formApi.setValue('keepOpen', false);
        });
    }
  }, [submitted]);

  const { status, errorMessage, pagePath } = state;
  const { subPageTemplate } = usePageDataContext();
  const currentTemplate = subPageTemplate || DEFAULT_PAGE_TEMPLATE;

  return (
    <>
      <ComponentFormText type="hidden" name="keepOpen" initialValue />
      <MenuFormPage
        formTitle="Add a Blank Page"
        status={status}
        errorMessage={errorMessage}
        completeMessage="Click here to visit the new page"
        titlePending="Creating Page"
        pagePath={pagePath}
        linkId="new-page-link"
        FormFields={(Label: ComponentType<HTMLProps<HTMLLabelElement>>) => (
          <>
            <Label>Template</Label>
            <ComponentFormText
              name="template"
              disabled
              initialValue={currentTemplate}
            />
          </>
        )}
      />
    </>
  );
});

export {
  menuFormPageNew,
};
