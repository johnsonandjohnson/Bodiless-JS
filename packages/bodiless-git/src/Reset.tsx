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
import { AxiosError } from 'axios';
import { getUI, ContextMenuUI, useEditContext } from '@bodiless/core';
import { GitClient } from './types';

enum ResetState {
  Init,
  Pending,
  Complete,
  Errored,
}

type ResetStatus = {
  status: ResetState;
  errorMessage?: string;
};

type Props = {
  ui: ContextMenuUI,
  formState: FormState,
  formApi: FormApi,
  client: GitClient
};

/**
 * Form component for reverting local changes.
 *
 * @component
 * @param props Props
 * @constructor
 */
const Reset = (props: Props) => {
  const context = useEditContext();
  const {
    ui, formState, formApi, client,
  } = props;
  const {
    ComponentFormTitle,
    ComponentFormLabel,
    ComponentFormWarning,
    ComponentFormDescription,
    Spinner,
  } = getUI(ui);
  const { submitted, invalid } = formState;
  const [state, setState] = useState<ResetStatus>({
    status: ResetState.Init,
  });
  useEffect(() => {
    // If the form is submitted and valid then lets try reset.
    if (submitted && invalid === false) {
      context.showPageOverlay({ hasSpinner: false });
      setState({ status: ResetState.Pending });
      client.reset()
        .then(() => {
          setState({ status: ResetState.Complete });
          formApi.setValue('reload', true);
        })
        .catch((error : AxiosError) => {
          setState({ status: ResetState.Errored, errorMessage: error.message });
        })
        .finally(() => {
          context.hidePageOverlay();
          formApi.setValue('keepOpen', false);
        });
    }
  }, [submitted]);

  const { status, errorMessage } = state;
  const formTitle = 'Revert to saved';
  switch (status) {
    case ResetState.Init: {
      return (
        <>
          <ComponentFormTitle>{formTitle}</ComponentFormTitle>
          <ComponentFormLabel htmlFor="reset-txt">
            Discard local changes
          </ComponentFormLabel>
        </>
      );
    }
    case ResetState.Pending:
      return (
        <>
          <ComponentFormTitle>Resetting...</ComponentFormTitle>
          <Spinner />
        </>
      );
    case ResetState.Complete:
      return (
        <>
          <ComponentFormTitle>Operation complete.</ComponentFormTitle>
          <ComponentFormDescription>Local changes were discarded.</ComponentFormDescription>
        </>
      );
    case ResetState.Errored:
      return (
        <>
          <ComponentFormTitle>{formTitle}</ComponentFormTitle>
          <ComponentFormWarning>{errorMessage}</ComponentFormWarning>
        </>
      );
    default:
      return <></>;
  }
};

export default Reset;
