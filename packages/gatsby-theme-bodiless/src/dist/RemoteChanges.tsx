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
import { ComponentFormSpinner } from '@bodiless/ui';
import { isEmpty } from 'lodash';
import { useFormApi } from 'informed';

type GitBranchType = {
  branch: string | null,
  commits: string[],
  files: string[];
};

type ResponseData = {
  upstream: GitBranchType;
  production: GitBranchType,
  local: GitBranchType,
};

type PropsWithGitClient = {
  client: any;
};

type PropsWithFormApi = {
  formApi: any;
};

/**
 * Component for showing and pulling remote changes.
 *
 * @component
 * @param {BackendClient} client
 * @constructor
 */
const RemoteChanges = ({ client }: PropsWithGitClient) => {
  const formApi = useFormApi();
  // @Todo revise the use of formState, possibly use informed multistep.
  if (formApi.getState().submits === 0) {
    return (<FetchChanges client={client} formApi={formApi} />);
  }
  return <PullChanges client={client} formApi={formApi} />;
};

enum ChangeState {
  Pending,
  CanBePulled,
  CanNotBePulled,
  NoneAvailable,
  Errored
}

const handleBranchResponse = (branch: GitBranchType) => {
  const { commits, files } = branch;

  if (isEmpty(commits)) {
    return ChangeState.NoneAvailable;
  }
  if (files.some(file => file.includes('package-lock.json'))) {
    return ChangeState.CanNotBePulled;
  }
  return ChangeState.CanBePulled;
};

const handleChangesResponse = ({ upstream, production }: ResponseData) => {
  const upstreamStatus = handleBranchResponse(upstream);
  const productionStatus = handleBranchResponse(production);

  return { upstreamStatus, productionStatus };
};

type ContentProps = {
  status: ChangeState;
  masterStatus: ChangeState;
  errorMessage?: string;
};

const ChangeContent = ({ status, masterStatus, errorMessage } : ContentProps) => {
  switch (status) {
    case ChangeState.NoneAvailable:
      return <>There are no changes to download.</>;
    case ChangeState.CanBePulled:
      return (
        <>
          There are changes ready to be pulled. Click check (✓) to initiate.
          {
            masterStatus === ChangeState.CanNotBePulled
              ? '\nThere are changes on production which cannot be merged from the UI.'
              : ''
          }
        </>
      );
    case ChangeState.CanNotBePulled:
      return (
        <>Upstream changes are available but cannot be fetched via the UI.</>
      );
    case ChangeState.Errored:
      return errorMessage ? (
        <>{errorMessage}</>
      ) : (
        <>An unexpected error has occurred</>
      );
    default:
      return <ComponentFormSpinner />;
  }
};

/**
 * Component for fetching & showing remote changes.
 *
 * @component
 * @param {BackendClient} client
 * @param formApi
 * @constructor
 */
const FetchChanges = ({ client, formApi }: PropsWithFormApi & PropsWithGitClient) => {
  const [state, setState] = useState<ContentProps>({
    status: ChangeState.Pending,
    masterStatus: ChangeState.Pending,
  });
  const context = useEditContext();
  useEffect(() => {
    (async () => {
      try {
        context.showPageOverlay({
          hasSpinner: false,
        });

        const response = await client.getChanges();
        if (response.status !== 200) {
          throw new Error(`Error pulling changes, status=${response.status}`);
        }

        const { upstreamStatus, productionStatus } = handleChangesResponse(response.data);

        if (upstreamStatus === ChangeState.CanBePulled) {
          formApi.setValue('keepOpen', true);

          if (productionStatus === ChangeState.CanBePulled) {
            const conflictsResponse = await client.getConflicts();

            if (conflictsResponse.status !== 200) {
              throw new Error(`Error checking conflicts with the master branch, status=${response.status}`);
            }

            if (conflictsResponse.data.hasConflict) {
              setState({ status: upstreamStatus, masterStatus: ChangeState.CanNotBePulled });
            } else {
              formApi.setValue('mergeMaster', true);
            }
          }
        }

        setState({ status: upstreamStatus, masterStatus: productionStatus });
      } catch (error) {
        setState({
          status: ChangeState.Errored,
          masterStatus: ChangeState.Errored,
          errorMessage: error.message,
        });
      } finally {
        context.hidePageOverlay();
      }
    })();
  }, []);
  const { status, masterStatus, errorMessage } = state;
  return <ChangeContent status={status} masterStatus={masterStatus} errorMessage={errorMessage} />;
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
 * @param formApi
 * @constructor
 */
const PullChanges = ({ client, formApi }: PropsWithFormApi & PropsWithGitClient) => {
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

        if (formApi.getValue('mergeMaster')) {
          const mergeResponse = await client.mergeMaster();
          if (mergeResponse.status !== 200) {
            throw new Error(`Error merging production changes to upstream, status=${mergeResponse.status}`);
          }
          formApi.setValue('mergeMaster', false);
        }

        const response = await client.pull();
        if (response.status !== 200) {
          throw new Error(`Error pulling changes, status=${response.status}`);
        }
        setPullStatus({ complete: true });
      } catch (error) {
        setPullStatus({
          complete: false,
          error: error.message || 'An unexpected error has occurred.',
        });
      } finally {
        formApi.setValue('keepOpen', false);
        context.hidePageOverlay();
      }
    })();
  }, []);

  const { complete, error } = pullStatus;
  if (error) return <>{error}</>;
  if (complete) {
    return <>Operation completed.</>;
  }
  return <ComponentFormSpinner />;
};

export default RemoteChanges;
export { PullChanges, FetchChanges };
