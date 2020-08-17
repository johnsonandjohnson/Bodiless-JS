import React, { useEffect, useState } from 'react';
import { FormApi, FormState } from 'informed';

import { getUI, useEditContext } from '@bodiless/core';
import { ComponentFormSpinner } from '@bodiless/ui';
import { AxiosError, AxiosPromise } from 'axios';
import Cookies from 'universal-cookie';
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
  ui: any,
  formState: FormState,
  formApi: FormApi,
  client: GitClient
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// @todo remove.
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars,max-len
const saveChanges = (milliseconds: number) => new Promise(resolve => setTimeout(resolve, milliseconds));

const backendFilePath = process.env.BODILESS_BACKEND_DATA_FILE_PATH || '';
const backendStaticPath = process.env.BODILESS_BACKEND_STATIC_PATH || '';

const handle = (promise: AxiosPromise<any>, callback?: () => void) => promise
  .then(res => {
    if (res.status === 200) {
      // @TODO: Display the response in a component instead of an alert.
      // eslint-disable-next-line no-undef
      if (typeof callback === 'function') {
        callback();
      } else {
        return Promise.resolve('Success');
      }
    }
    // eslint-disable-next-line no-undef
    return Promise.reject(new Error('An unknown error has occured.'));
  })
  .catch((err: AxiosError) => {
    // Use back-end crafted error message if available.
    if (err.response && err.response.data) {
      console.log('err', err);
      console.log('err', err.response.data);
      return new Error(err.response.data);
    }
    return Promise.reject(err.message);
  });

/**
 * Form component for reverting local changes.
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
    ComponentFormError,
    ComponentFormText,
  } = getUI(ui);
  const { submits, invalid } = formState;
  const [state, setState] = useState<SaveStatus>({
    status: SaveState.Init,
  });
  useEffect(() => {
    // If the form is submitted and valid then lets try reset.
    if (submits && invalid === false) {
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
          console.log(error);
          setState({ status: SaveState.Errored, errorMessage: error.message });
        })
        .finally(() => {
          context.hidePageOverlay();
          formApi.setValue('keepOpen', false);
        });
    }
  }, [submits]);

  const { status, errorMessage } = state;

  switch (status) {
    case SaveState.Pending:
      return (
        <>
          <ComponentFormTitle>Uploading...</ComponentFormTitle>
          <ComponentFormSpinner />
        </>
      );
    case SaveState.Complete:
      return (
        <>
          <ComponentFormTitle>Operation complete.</ComponentFormTitle>
        </>
      );
    case SaveState.Errored:
      return (
        <>
          <ComponentFormError>{errorMessage}</ComponentFormError>
        </>
      );
    case SaveState.Init: {
      return (
        <>
          <ComponentFormTitle>Upload Changes</ComponentFormTitle>
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
