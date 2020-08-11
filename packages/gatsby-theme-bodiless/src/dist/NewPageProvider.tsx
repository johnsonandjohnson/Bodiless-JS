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
import React, {
  ComponentType, useCallback, useEffect, useState,
} from 'react';
import {
  contextMenuForm,
  getUI,
  withMenuOptions,
  TMenuOption,
  useEditContext,
} from '@bodiless/core';
import { AxiosPromise } from 'axios';
import { ComponentFormSpinner } from '@bodiless/ui';
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

enum NewPageState {
  Init,
  Pending,
  Complete,
  Errored,
}

type PageStatus = {
  status: NewPageState;
  newPagePath?: string;
  errorMessage?: string;
};

type NewPageProps = PageStatus & {
  ui: any,
  errors: any,
};

const createPage = async ({ path, client, template } : any) => {
  const pathname = window.location.pathname
    ? window.location.pathname.replace(/\/?$/, '/')
    : '';
  const newPagePath = pathname + path;
  // Create the page.
  const result = await handle(client.savePage(newPagePath, template));
  // If the page was created successfully:
  if (result.response) {
    // Verify the creation of the page.
    const isPageVerified = await verifyPage(newPagePath);
    if (!isPageVerified) {
      const errorMessage = `Unable to verify page creation.
        It is likely that your new page was created but is not yet available.
        Click ok to visit the new page; if it does not load, wait a while and reload.`;
      return Promise.reject(new Error(errorMessage));
    }
    return Promise.resolve(newPagePath);
  }
  return Promise.reject(new Error('An internal error occurred. Please try again later.'));
};

const NewPageComp = (props : NewPageProps) => {
  const {
    status, ui, errors, errorMessage, newPagePath,
  } = props;
  const {
    ComponentFormLabel,
    ComponentFormDescription,
    ComponentFormText,
    ComponentFormError,
    ComponentFormWarning,
    ComponentFormTitle,
  } = getUI(ui);
  // ensure trailing slash is present
  const currentPage = window.location.href.replace(/\/?$/, '/');

  switch (status) {
    case NewPageState.Init: {
      const validate = useCallback(
        (value: string) => (!value || !RegExp(/^[a-z0-9_-]+$/i).test(value)
          ? 'No special characters or spaces allowed'
          : undefined),
        [],
      );
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
          {errors && errors.path && (
          <ComponentFormWarning>{errors.path}</ComponentFormWarning>
          )}

        </>
      );
    }
    case NewPageState.Pending:
      return (
        <>
          <ComponentFormTitle>Creating Page</ComponentFormTitle>
          <ComponentFormSpinner />
        </>
      );
    case NewPageState.Complete:
      return (
        <>
          <ComponentFormTitle>Operation Complete</ComponentFormTitle>
          <ComponentFormDescription>
            <a href={newPagePath}>{`Click here to visit the new page. ${newPagePath}`}</a>
          </ComponentFormDescription>
        </>
      );
    case NewPageState.Errored:
      return (
        <>
          <ComponentFormError>{errorMessage}</ComponentFormError>
        </>
      );
    default: return (<></>);
  }
};

const formPageAdd = (client: Client, template: string) => contextMenuForm({
  submitValues: ({ keepOpen }: any) => keepOpen,
})(({ formState, ui, formApi } : any) => {
  const { ComponentFormText } = getUI(ui);
  const {
    submits, errors, invalid, values,
  } = formState;
  const [state, setState] = useState<PageStatus>({
    status: NewPageState.Init,
  });
  const context = useEditContext();
  useEffect(() => {
    // If the form is submitted and valid then lets try to creat a page.
    if (submits && invalid === false) {
      context.showPageOverlay({ hasSpinner: false });
      setState({ status: NewPageState.Pending });
      const { path } = values;
      // Create the page.
      createPage({ path, client, template })
        .then((newPagePath: string) => {
          if (newPagePath) {
            setState({ status: NewPageState.Complete, newPagePath });
          }
        })
        .catch((err: Error) => {
          console.log(err);
          setState({ status: NewPageState.Errored, errorMessage: err.message });
        })
        .finally(() => {
          context.hidePageOverlay();
          formApi.setValue('keepOpen', false);
        });
    }
  }, [submits]);
  const { status, errorMessage, newPagePath } = state;
  return (
    <>
      <ComponentFormText type="hidden" field="keepOpen" initialValue />
      <NewPageComp
        status={status}
        ui={ui}
        errorMessage={errorMessage}
        errors={errors}
        newPagePath={newPagePath}
      />
    </>
  );
});

const defaultClient = new BackendClient();

const useGetMenuOptions = (): (() => TMenuOption[]) => {
  const context = useEditContext();
  const gatsbyPage = useGatsbyPageContext();

  return () => [
    {
      name: 'newpage',
      icon: 'note_add',
      label: 'Page',
      isHidden: () => !context.isEdit,
      handler: () => formPageAdd(defaultClient, gatsbyPage.subPageTemplate),
    },
  ];
};

const menuOptions = { useGetMenuOptions, name: 'Gatsby' };
const NewPageProvider = withMenuOptions(menuOptions)(
  React.Fragment,
) as ComponentType<Props>;
NewPageProvider.displayName = 'NewPageProvider';

export default NewPageProvider;
