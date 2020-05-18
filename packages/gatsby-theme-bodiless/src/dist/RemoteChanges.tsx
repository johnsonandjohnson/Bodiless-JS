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

import React, { useState, useEffect } from 'react';
import { useEditContext } from '@bodiless/core';
import { Spinner } from '@bodiless/ui';
import { isEmpty } from 'lodash';
import { useFormApi } from 'informed';

type ResponseData = {
  upstream: {
    branch: string;
    commits: [string];
    files: [string];
  };
};

type Props = {
  client: any;
  closeForm?: () => void;
};

const SpinnerWrapper = () => (
  <div className="bl-pt-3">
    <Spinner color="bl-bg-white" />
  </div>
);

/**
 * Component for showing and pulling remote changes.
 *
 * @component
 * @param {BackendClient} client
 * @constructor
 */
const RemoteChanges = ({ client, closeForm }: Props) => {
  const formApi = useFormApi();
  // @Todo revise the use of formState, possibly use informed multistep.
  if (formApi.getState().submits === 2 && closeForm) {
    closeForm();
    return null;
  }
  if (formApi.getState().submits === 1 && formApi.getValue('allowed') === true) {
    return <PullChanges client={client} />;
  }
  return (<FetchChanges client={client} />);
};

enum ChangeState {
  Pending,
  CanBePulled,
  CannotBePulled,
  NoneAvailable,
  Errored
}

const handleChangesResponse = ({ upstream }: ResponseData) => {
  const { commits, files } = upstream;
  if (isEmpty(commits)) {
    return ChangeState.NoneAvailable;
  }
  if (files.some(file => file.includes('package-lock.json'))) {
    return ChangeState.CannotBePulled;
  }
  return ChangeState.CanBePulled;
};

type ContentProps = {
  status: ChangeState;
  errorMessage?: string;
};

const ChangeContent = ({ status, errorMessage } : ContentProps) => {
  switch (status) {
    case ChangeState.NoneAvailable:
      return <>There are no changes to download.</>;
    case ChangeState.CanBePulled:
      return (
        <>
      There are changes ready to be pulled. Click check (✓) to initiate.
        </>
      );
    case ChangeState.CannotBePulled:
      return <>Upstream changes are available but cannot be fetched via the UI.</>;
    case ChangeState.Errored:
      return errorMessage ? <>{errorMessage}</> : <>An unexpected error has occurred</>;
    default:
      return <SpinnerWrapper />;
  }
};

/**
 * Component for fetching & showing remote changes.
 *
 * @component
 * @param {BackendClient} client
 * @constructor
 */
const FetchChanges = ({ client }: Props) => {
  const formApi = useFormApi();
  const [state, setState] = useState<ContentProps>({
    status: ChangeState.Pending,
  });
  const context = useEditContext();
  useEffect(() => {
    (async () => {
      try {
        context.showPageOverlay({
          hasSpinner: false,
          maxTimeoutInSeconds: 10,
        });
        const response = await client.getChanges();
        if (response.status === 200) {
          setState({ status: handleChangesResponse(response.data) });
          if (state.status === ChangeState.CanBePulled) {
            formApi.setValue('allowed', true);
          }
        }
      } catch (error) {
        setState({ status: ChangeState.Errored, errorMessage: error.message });
      } finally {
        context.hidePageOverlay();
      }
    })();
  }, []);
  const { status, errorMessage } = state;
  return <ChangeContent status={status} errorMessage={errorMessage} />;
};

type PullStatus = {
  complete: boolean;
  error?: string;
};

/**
 * Component for pulling remote changes.
 *
 * @component
 * @param {BackendClient} client
 * @constructor
 */
const PullChanges = ({ client }: Props) => {
  const [pullStatus, setPullStatus] = useState<PullStatus>({
    complete: false,
    error: '',
  });
  const context = useEditContext();
  useEffect(() => {
    (async () => {
      try {
        context.showPageOverlay({
          hasSpinner: false,
        });
        const response = await client.pull();
        if (response.status === 200) {
          setPullStatus({ complete: true });
        }
      } catch (error) {
        setPullStatus({
          complete: false,
          error: error || 'An unexpected error has occurred.',
        });
      } finally {
        context.hidePageOverlay();
      }
    })();
  }, []);

  const { complete, error } = pullStatus;
  if (error) return <>{error}</>;
  if (complete) {
    return <>Operation completed.</>;
  }
  return <SpinnerWrapper />;
};

export default RemoteChanges;
export { PullChanges, FetchChanges };
