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
import React, { ComponentType, useCallback, useState } from 'react';
import {
  contextMenuForm,
  getUI,
  withMenuOptions,
  TMenuOption,
  useEditContext,
} from '@bodiless/core';
import { AxiosPromise } from 'axios';
import { useFormApi } from 'informed';
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
  errorMessage?: string;
};

const createPage = async ({ path, client, template } : any) => {
  const context = useEditContext();
  context.showPageOverlay({ hasSpinner: false });
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
    context.hidePageOverlay();
    if (!isPageVerified) {
      const errorMessage = `Unable to verify page creation.
        It is likely that your new page was created but is not yet available.
        Click ok to visit the new page; if it does not load, wait a while and reload.`;
      // @fixme: what to do here?
      return Promise.reject(errorMessage);
    }
    return Promise.resolve(newPagePath);
  }

  return Promise.reject(result.message);
};

const CreatPage = (props : any) => {
  const { ui, formState, setState } = props;
  const { client, template } = props;
  const formApi = useFormApi();
  // If the form is submitted and valid then lets try to creat a page.
  if (formState.submits === 1 && formState.invalid === false) {
    setState({ status: NewPageState.Pending });
    const submittedValues = formState.values;
    const { path } = submittedValues;
    // Create the page.
    createPage({ path, client, template })
      .then((newPagePath: string) => {
        if (newPagePath) {
          setState({ status: NewPageState.Complete });
          formApi.setValue('keepOpen', false);
          window.location.href = newPagePath;
        }
      })
      .catch((errorMessage : string) => {
        setState({ status: NewPageState.Errored, errorMessage });
        formApi.setValue('keepOpen', false);
      });
  }
  const { ComponentFormLabel, ComponentFormText, ComponentFormError } = getUI(ui);
  const validate = useCallback(
    (value: string) => (!value || !RegExp(/^[a-z0-9_-]+$/i).test(value)
      ? 'No special characters or spaces allowed'
      : undefined),
    [],
  );
  // ensure trailing slash is present
  const currentPage = window.location.href.replace(/\/?$/, '/');
  return (
    <>
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
      <ComponentFormText type="hidden" field="keepOpen" initialValue={false} />
      {formState.errors && formState.errors.path && (
        <ComponentFormError>{formState.errors.path}</ComponentFormError>
      )}
    </>
  );
};
const formPageAdd = (client: Client, template: string) => contextMenuForm({
  submitValues: (submittedValues: any) => {
    const { keepOpen } = submittedValues;
    console.log(keepOpen);
    return true;
    // return keepOpen;
  },
})(({ ui, formState }: any) => {
  const { ComponentFormTitle, ComponentFormText, ComponentFormError } = getUI(ui);
  const [state, setState] = useState<PageStatus>({
    status: NewPageState.Init,
  });
  const { status, errorMessage } = state;
  switch (status) {
    case NewPageState.Init:
      return (
        <>
          <ComponentFormTitle>Add a New Page</ComponentFormTitle>
          <ComponentFormText type="hidden" field="keepOpen" initialValue />
          <CreatPage
            ui={ui}
            formState={formState}
            setState={setState}
            client={client}
            template={template}
          />
        </>
      );
    case NewPageState.Pending:
      return (
        <>
          <ComponentFormTitle>Creating</ComponentFormTitle>
          <ComponentFormSpinner />
        </>
      );
    case NewPageState.Complete:
      return (
        <>
          <ComponentFormTitle>Redirecting...</ComponentFormTitle>
          <ComponentFormSpinner />
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
      handler: () => formPageAdd(defaultClient, gatsbyPage.subPageTemplate, context),
    },
  ];
};

const menuOptions = { useGetMenuOptions, name: 'Gatsby' };
const NewPageProvider = withMenuOptions(menuOptions)(
  React.Fragment,
) as ComponentType<Props>;
NewPageProvider.displayName = 'NewPageProvider';

export default NewPageProvider;
