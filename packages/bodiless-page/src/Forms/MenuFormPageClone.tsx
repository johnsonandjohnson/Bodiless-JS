/**
 * Copyright © 2021 Johnson & Johnson
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
  useEffect,
  useState,
} from 'react';
import {
  contextMenuForm,
  handleBackendResponse,
  useEditContext,
  useNode,
} from '@bodiless/core';
import { usePageMenuOptionUI } from '../MenuOptionUI';
import { verifyPage } from '../Operations';
import {
  PageClient,
  PageStatus,
  PageState,
} from '../types';
import { getPathValue } from '../utils';
import { MenuFormPage } from './MenuFormPage';

const clonePage = async ({ origin, destination, client } : any) => {
  // Clone the page.
  const result = await handleBackendResponse(client.clonePage(origin, destination));

  // If the page was cloned successfully:
  if (result.response) {
    // Verify the clone of the page.
    const isPageVerified = await verifyPage(destination);
    if (!isPageVerified) {
      const errorMessage = `Unable to verify page clone.
        It is likely that your cloned page was cloned but is not yet available.
        Click ok to visit the cloned page; if it does not load, wait a while and reload.`;
      return Promise.reject(new Error(errorMessage));
    }
    return Promise.resolve(destination);
  }
  if (result.message) {
    return Promise.reject(new Error(result.message));
  }
  return Promise.reject(new Error('An internal error occurred. Please try again later.'));
};

const menuFormPageClone = (client: PageClient) => contextMenuForm({
  submitValues: ({ keepOpen }: any) => keepOpen,
  hasSubmit: ({ keepOpen }: any) => keepOpen,
})(({ formState, formApi } : any) => {
  const { ComponentFormText } = usePageMenuOptionUI();
  const {
    submits, invalid, values,
  } = formState;
  const [state, setState] = useState<PageState>({
    status: PageStatus.Init,
  });
  const context = useEditContext();
  const origin = useNode().node.pagePath;
  const destination = getPathValue(values);

  useEffect(() => {
    // If the form is submitted and valid then lets try to clone a page.
    if (submits && destination && invalid === false) {
      context.showPageOverlay({ hasSpinner: false });
      setState({ status: PageStatus.Pending });
      clonePage({ origin, destination, client })
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
  }, [submits]);
  const { status, errorMessage, pagePath } = state;
  return (
    <>
      <ComponentFormText type="hidden" field="keepOpen" initialValue />
      <MenuFormPage
        formTitle="Clone (this) Page"
        status={status}
        errorMessage={errorMessage}
        completeMessage="Click here to visit the cloned page"
        titlePending="Cloning Page"
        pagePath={pagePath}
        linkId="clone-page-link"
      />
    </>
  );
});

export {
  menuFormPageClone,
};
