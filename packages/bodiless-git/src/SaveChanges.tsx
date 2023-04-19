/**
 * Copyright © 2022 Johnson & Johnson
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

import React, { useEffect, useState } from 'react';
import { FormApi, FormState } from 'informed';

import { AxiosError, AxiosPromise } from 'axios';
import Cookies from 'universal-cookie';
import { getUI, ContextMenuUI, useEditContext } from '@bodiless/core';

import { GitClient } from './types';

enum SaveState {
  Init,
  Pending,
  Complete,
  Errored,
}

type SaveStatus = {
  status: SaveState;
  errorMessage?: string;
};

type Props = {
  ui: ContextMenuUI,
  formState: FormState,
  formApi: FormApi,
  client: GitClient
};

const backendFilePath = process.env.BODILESS_BACKEND_DATA_FILE_PATH || '';
const backendStaticPath = process.env.BODILESS_BACKEND_STATIC_PATH || '';

// @todo unify response handler for all actions to the backend.
// We need to handle responses that come in the form of html, such as 404, and
// other messages.
const handle = (promise: AxiosPromise<any>, callback?: () => void) => promise
  .then(res => {
    if (res.status === 200) {
      // @TODO: Display the response in a component instead of an alert.
      // eslint-disable-next-line no-undef
      if (typeof callback === 'function') {
        callback();
      } else {
        return 'Success';
      }
    }
    // eslint-disable-next-line no-undef
    throw new Error('An unknown error has occurred.');
  })
  .catch((err: AxiosError) => {
    // Use back-end crafted error message if available.
    let errMsg = `${err.message}\n`;
    if (err.response && err.response.data) {
      errMsg += err.response.data;
    }
    throw new Error(errMsg);
  });

/**
 * Form component for saving local changes.
 *
 * @component
 * @param props Props
 * @constructor
 */
const SaveChanges = (props: Props) => {
  // Get the author from the cookie.
  const cookies = new Cookies();
  const author = cookies.get('author');
  const context = useEditContext();
  const {
    ui, formState, formApi, client,
  } = props;
  const {
    ComponentFormTitle,
    ComponentFormLabel,
    ComponentFormWarning,
    ComponentFormText,
    Spinner,
  } = getUI(ui);
  const { submits, invalid } = formState;
  const [state, setState] = useState<SaveStatus>({
    status: SaveState.Init,
  });
  const formTitle = 'Upload changes';
  useEffect(() => {
    // If the form is submitted and valid then lets try reset.
    if (submits === 1 && invalid === false) {
      context.showPageOverlay({ hasSpinner: false });
      setState({ status: SaveState.Pending });
      // client.reset()
      handle(client.commit(
        formApi.getValue('commitMessage'),
        [backendFilePath, backendStaticPath],
        [],
        [],
        author,
      ))
        .then(() => {
          setState({ status: SaveState.Complete });
        })
        .catch((error : any) => {
          setState({ status: SaveState.Errored, errorMessage: error.message });
        })
        .finally(() => {
          context.hidePageOverlay();
          formApi.setValue('keepOpen', false);
        });
    }
  }, [submits]);

  const { status } = state;

  switch (status) {
    case SaveState.Pending:
      return (
        <>
          <ComponentFormTitle>Uploading...</ComponentFormTitle>
          <Spinner />
        </>
      );
    case SaveState.Complete:
      return (
        <>
          <ComponentFormTitle>Operation complete.</ComponentFormTitle>
        </>
      );
    case SaveState.Errored: {
      // @todo: in case of error response, use following msg to cover cases.
      // refactoring once @bodiless/backend via Gatsby proxy HTTPError issue fixed.
      const errorMessage = `Something happened. Please verify current environment
        allows saving content, as well as confirm you have made changes.`;
      return (
        <>
          <ComponentFormTitle>{formTitle}</ComponentFormTitle>
          <ComponentFormWarning>{errorMessage}</ComponentFormWarning>
        </>
      );
    }
    case SaveState.Init: {
      return (
        <>
          <ComponentFormTitle>{formTitle}</ComponentFormTitle>
          <ComponentFormLabel htmlFor="commit-txt">
            Description:
          </ComponentFormLabel>
          <ComponentFormText field="commitMessage" id="commit-txt" />
        </>
      );
    }
    default:
      return <></>;
  }
};

export default SaveChanges;
