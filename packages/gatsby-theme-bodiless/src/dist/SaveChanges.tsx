import React, { useEffect, useState } from 'react';
import { FormApi, FormState } from 'informed';

import { getUI, useEditContext } from '@bodiless/core';
import { ComponentFormSpinner } from '@bodiless/ui';
import { AxiosError } from 'axios';
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const saveChanges = (milliseconds: number) => new Promise(resolve => setTimeout(resolve, milliseconds));
let rcount = 1;

const backendFilePath = process.env.BODILESS_BACKEND_DATA_FILE_PATH || '';
const backendStaticPath = process.env.BODILESS_BACKEND_STATIC_PATH || '';

/**
 * Form component for reverting local changes.
 *
 * @component
 * @param props Props
 * @constructor
 */
const SaveChanges = (props: Props) => {
  console.log(rcount++);
  // submitValues: (submitValues: any) => {
  //   handle(
  //     client.commit(
  //       submitValues.commitMessage,
  //       [backendFilePath, backendStaticPath],
  //       [],
  //       [],
  //       author,
  //     ),
  //   );
  // },
  // Get the author from the cookie.
  const cookies = new Cookies();
  const author = cookies.get('author');
  console.log(author);
  const context = useEditContext();
  const {
    ui, formState, formApi, client,
  } = props;
  console.log(client);
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
  console.log('kO', formApi.getValue('keepOpen'));
  useEffect(() => {
    // If the form is submitted and valid then lets try reset.
    if (submits && invalid === false) {
      context.showPageOverlay({ hasSpinner: false });
      setState({ status: SaveState.Pending });
      // client.reset()
      client.commit(
        formApi.getValue('commitMessage'),
        [backendFilePath, backendStaticPath],
        [],
        [],
        author,
      )
        .then(() => {
          setState({ status: SaveState.Complete });
        })
        .catch((error : AxiosError) => {
          setState({ status: SaveState.Errored, errorMessage: error.message });
        })
        .finally(() => {
          context.hidePageOverlay();
          formApi.setValue('keepOpen', false);
          console.log('setting keep open to false');
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
