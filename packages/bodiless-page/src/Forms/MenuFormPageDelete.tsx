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
  useEffect,
  useState,
} from 'react';
import {
  ContextMenuProvider,
  contextMenuForm,
  handleBackendResponse,
  useEditContext,
} from '@bodiless/core';
import { useNode } from '@bodiless/data';
import { ComponentFormSpinner } from '@bodiless/ui';
import { usePageMenuOptionUI } from '../MenuOptionUI';
import { createRedirect } from '../Operations';
import { PATTERN_INSENSITIVE_VALID_PATH_URL } from '../constants';
import {
  PageClient,
  PageStatus,
  PageState,
} from '../types';
import { hasPageChild } from '../utils';
import { PageURLField } from './MenuFormFields';

let actualState: number = -1;

const deletePage = async ({ path, client } : any) => {
  const result = await handleBackendResponse(client.deletePage(path));
  if (result.response) {
    if (result.message !== 'Success' && typeof (result.message) === 'string') {
      return Promise.reject(new Error(result.message));
    }
    // Deleting the static assets on delete leads to a gatsby image rendering issue.
    // To be resolved with another approach:
    // https://github.com/johnsonandjohnson/Bodiless-JS/issues/1348
    // try {
    //   await handleBackendResponse(client.deleteStaticAssets(path));
    // } catch (e: any) {
    //   return Promise.reject(new Error(e.message));
    // }
    return Promise.resolve();
  }
  return Promise.reject(new Error('The page cannot be deleted.'));
};

const DeletePageForm = (props : PageState) => {
  const {
    status, errorMessage, isRedirectActive,
  } = props;
  const defaultUI = usePageMenuOptionUI();
  const {
    ComponentFormDescription,
    ComponentFormDescriptionEmphasis,
    ComponentFormFieldWrapper,
    ComponentFormLabelBase,
    ComponentFormTitle,
    ComponentFormWarning,
  } = defaultUI;

  const formTitle = 'Delete Page';

  switch (status) {
    case PageStatus.Init: {
      return (
        <>
          <ContextMenuProvider ui={defaultUI}>
            <ComponentFormTitle>{formTitle}</ComponentFormTitle>
            <ComponentFormFieldWrapper>
              <ComponentFormLabelBase>
                Click check to confirm delete of current page
              </ComponentFormLabelBase>
            </ComponentFormFieldWrapper>
            <PageURLField
              fieldLabel="Add optional redirect"
              placeholder="/redirectpage"
              simpleValidation
              validateOn="change-blur"
            />
          </ContextMenuProvider>
        </>
      );
    }
    case PageStatus.Pending:
      return (
        <>
          <ComponentFormTitle>Deleting Page</ComponentFormTitle>
          <ComponentFormSpinner />
        </>
      );
    case PageStatus.Complete: {
      return (
        <>
          <ContextMenuProvider ui={defaultUI}>
            <ComponentFormTitle>{formTitle}</ComponentFormTitle>
            <ComponentFormLabelBase>Delete operation was successful.</ComponentFormLabelBase>
            <ComponentFormDescription>
              Upon closing this dialog you will be redirected to the deleted page’s parent page.
            </ComponentFormDescription>
            {
              isRedirectActive ? (
                <ComponentFormDescriptionEmphasis>
                  Redirect Active
                </ComponentFormDescriptionEmphasis>
              ) : null
            }
          </ContextMenuProvider>
        </>
      );
    }
    case PageStatus.Errored:
      return (
        <>
          <ComponentFormTitle>{formTitle}</ComponentFormTitle>
          <ComponentFormWarning>{errorMessage}</ComponentFormWarning>
        </>
      );
    default: return (<></>);
  }
};

const redirectPage = (values: {keepOpen: boolean, path?: string }) => {
  if (values.keepOpen || actualState === PageStatus.Errored || typeof window === 'undefined') {
    actualState = -1;
    return;
  }

  actualState = -1;

  const { href } = window.location;
  const hrefArray = href.split('/');

  // Handle paths withtout '/' at the end.
  if (hrefArray[hrefArray.length - 1] !== '') hrefArray.push('');

  // Removes last child path from href array.
  hrefArray.splice(-2, 1);

  const parentHref = hrefArray.join('/');
  // Uses replace to redirect since child page no longer exists.
  window.location.replace(parentHref);
};

const menuFormPageDelete = (client: PageClient) => contextMenuForm({
  submitValues: ({ keepOpen }: any) => keepOpen,
  hasSubmit: ({ keepOpen }: any) => keepOpen,
  onClose: redirectPage,
})(({ formState, formApi } : any) => {
  const { ComponentFormText } = usePageMenuOptionUI();
  const {
    invalid,
    submitted,
    values,
  } = formState;
  const {
    pagePath,
  } = values;
  const [state, setState] = useState<PageState>({
    status: PageStatus.Init,
  });
  const [isRedirectActive, setRedirectActive] = useState<boolean>(false);

  const context = useEditContext();
  const { node } = useNode();

  const path = (typeof window !== 'undefined') ? window.location.pathname : '';
  const redirectPathInput = (typeof pagePath === 'string') ? pagePath : '';

  useEffect(() => {
    if (path === '/') {
      actualState = PageStatus.Errored;
      setState({ status: PageStatus.Errored, errorMessage: 'The page cannot be deleted.' });
      formApi.setValue('keepOpen', false);
    } else {
      hasPageChild({ pagePath: path, client })
        .catch((err: Error) => {
          actualState = PageStatus.Errored;
          setState({ status: PageStatus.Errored, errorMessage: err.message });
          formApi.setValue('keepOpen', false);
        });
    }

    if (submitted && path && !invalid) {
      context.showPageOverlay({ hasSpinner: false });
      actualState = PageStatus.Pending;
      setState({ status: PageStatus.Pending });

      // Delete the page.
      deletePage({ path, client })
        .then(() => {
          if (redirectPathInput !== '') {
            const redirectPath = redirectPathInput.match(PATTERN_INSENSITIVE_VALID_PATH_URL)
              ? redirectPathInput
              : `/${redirectPathInput}`;
            createRedirect(node, path, redirectPath);
            setRedirectActive(true);
          }
          actualState = PageStatus.Complete;
          setState({ status: PageStatus.Complete });
        })
        .catch((err: Error) => {
          actualState = PageStatus.Errored;
          setState({ status: PageStatus.Errored, errorMessage: err.message });
        })
        .finally(() => {
          context.hidePageOverlay();
          formApi.setValue('keepOpen', false);
        });
    }
  }, [submitted]);
  const { status, errorMessage } = state;

  return (
    <>
      <ComponentFormText type="hidden" name="keepOpen" initialValue />
      <DeletePageForm
        status={status}
        errorMessage={errorMessage}
        isRedirectActive={isRedirectActive}
      />
    </>
  );
});

export {
  menuFormPageDelete,
};
