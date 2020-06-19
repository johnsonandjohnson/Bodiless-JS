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
import type { ChangeNotifier } from './GitProvider';

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

type PropsWithNotify = {
  notifyOfChanges: ChangeNotifier;
};

/**
 * Component for showing and pulling remote changes.
 *
 * @component
 * @param {BackendClient} client
 * @constructor
 */
const RemoteChanges = ({ client, notifyOfChanges }: PropsWithGitClient & PropsWithNotify) => {
  const formApi = useFormApi();
  // @Todo revise the use of formState, possibly use informed multistep.
  if (formApi.getState().submits === 0) {
    return (
      <FetchChanges
        client={client}
        formApi={formApi}
        notifyOfChanges={notifyOfChanges}
      />
    );
  }
  return (
    <PullChanges
      client={client}
      formApi={formApi}
      notifyOfChanges={notifyOfChanges}
    />
  );
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
      return (
        <>
          {
            // eslint-disable-next-line no-nested-ternary
            masterStatus === ChangeState.CanBePulled
              ? 'There are changes ready to be pulled. Click check (✓) to initiate.'
              : masterStatus === ChangeState.CanNotBePulled
                ? 'There are changes on production which cannot be merged from the UI.'
                : 'There are no changes to download.'
          }
        </>
      );
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
const FetchChanges = (
  { client, formApi, notifyOfChanges }: PropsWithFormApi & PropsWithGitClient & PropsWithNotify,
) => {
  const [state, setState] = useState<ContentProps>({
    status: ChangeState.Pending,
    masterStatus: ChangeState.NoneAvailable,
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

        if (productionStatus === ChangeState.CanBePulled) {
          const conflictsResponse = await client.getConflicts();

          if (conflictsResponse.status !== 200) {
            throw new Error(`Error checking conflicts with the master branch, status=${response.status}`);
          }

          if (conflictsResponse.data.hasConflict) {
            setState({ status: upstreamStatus, masterStatus: ChangeState.CanNotBePulled });
          } else {
            setState({ status: ChangeState.CanBePulled, masterStatus: ChangeState.CanBePulled });
            formApi.setValue('mergeMaster', true);
            formApi.setValue('keepOpen', true);
          }
        }

        if (upstreamStatus === ChangeState.CanBePulled) {
          formApi.setValue('keepOpen', true);
        }

        setState((currentState) => ({
          status: upstreamStatus,
          masterStatus: currentState.masterStatus,
        }));
      } catch (error) {
        setState({
          status: ChangeState.Errored,
          masterStatus: ChangeState.Errored,
          errorMessage: error.message,
        });
      } finally {
        notifyOfChanges();
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
const PullChanges = (
  { client, formApi, notifyOfChanges }: PropsWithFormApi & PropsWithGitClient & PropsWithNotify,
) => {
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
        notifyOfChanges();
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
