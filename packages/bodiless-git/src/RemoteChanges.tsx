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
import uniq from 'lodash/uniq';
import { useFormApi } from 'informed';
import { useEditContext, ContextMenuUI, getUI } from '@bodiless/core';
import type { ChangeNotifier } from './useGitButtons';

export type BranchUpdateType = {
  branch: string | null,
  commits: string[],
  files: string[];
};

export type ResponseData = {
  upstream: BranchUpdateType;
  production: BranchUpdateType,
  local: BranchUpdateType,
};

type PropsWithGitClient = {
  client: any;
};

type PropsWithFormApi = {
  formApi: any;
};

type PropsWithUi = {
  ui?: ContextMenuUI;
};

type PropsWithNotify = {
  notifyOfChanges: ChangeNotifier;
};

type MessageProps = {
  messageCode: MessageCode;
  messageData?: any;
};

enum MessageCode {
  Default = 0,
  PullErrored = 1000,
  PullNoChange = 1001,
  PullRestartRequired = 1002,
  PullSuccess = 1003,
  PullConflictConfirm = 1004,
  PullConflictAbort = 1005,
  PullMainAbort = 1006,
  PullUpstreamAbort = 1007,
  PullChangeAvailable = 1008,
  PullMainAvailable = 1009,
  PullNonContentOnly = 1010,
}

/**
 * Component for showing and pulling remote changes.
 *
 * @component
 * @param {BackendClient} client
 * @constructor
 */
const RemoteChanges = (
  { client, notifyOfChanges, ui }: PropsWithGitClient & PropsWithNotify & PropsWithUi
) => {
  const formApi = useFormApi();
  // @Todo revise the use of formState, possibly use informed multistep.
  if (formApi.getFormState().submitted) {
    return (
      <FetchChanges
        client={client}
        formApi={formApi}
        notifyOfChanges={notifyOfChanges}
        ui={ui}
      />
    );
  }
  return (
    <PullChanges
      client={client}
      formApi={formApi}
      notifyOfChanges={notifyOfChanges}
      ui={ui}
    />
  );
};

const mapResponse = (response: BranchUpdateType) => ({
  hasUpdates: !!response.commits.length || !!response.files.length,
  files: response.files,
});

const getRemoteStatus = (responseData: ResponseData) => ({
  upstream: mapResponse(responseData.upstream),
  production: mapResponse(responseData.production),
  local: mapResponse(responseData.local),
});

const isContentOnly = (files: string[]) => files.every(file => file.search(/\.json$/g) !== -1);

const FormMessages = ({ messageCode, messageData, ui } : MessageProps & PropsWithUi) => {
  const { ComponentFormWarning, Spinner } = getUI(ui);
  switch (messageCode) {
    case MessageCode.PullMainAvailable:
      return (<>There are main changes available to be pulled. Click check (✓) to initiate.</>);

    case MessageCode.PullConflictConfirm: {
      const pages = messageData.pages.map((page: string) => (<li>{page}</li>));
      return (
        <>
          <ComponentFormWarning>
            Changes you have recently made in your Edit Environment conflict with changes that
            have been made to production since the last time you pulled changes. You can choose
            to have your changes override the production changes in your changeset, by clicking
            the check. Or, you can dismiss this dialogue and contact your development team for
            assistance.
          </ComponentFormWarning>
          <div className="bl-py-1 bl-px-20">
            Conflict pages:
            {messageData.pages.length > 0 && <ul className="bl-list-disc bl-px-3">{pages}</ul> }
            {messageData.site.length > 0 && <p>A change that affects multiple pages</p> }
          </div>
        </>
      );
    }

    case MessageCode.PullConflictAbort:
      return (
        <ComponentFormWarning>
          {
            `Changes are available but cannot be pulled, contact your development team for \
assistance. (Code: ${MessageCode.PullConflictAbort})`
          }
        </ComponentFormWarning>
      );

    case MessageCode.PullNoChange:
      return (
        <>
          No changes are available, your Edit Environment is up to date!
        </>
      );

    case MessageCode.PullMainAbort:
      return (
        <>
          <ComponentFormWarning>
            There are changes on production which cannot be merged from the UI.
          </ComponentFormWarning>
        </>
      );

    case MessageCode.PullChangeAvailable:
      return (
        <>
          There are updates available to be pulled. Click check (✓) to initiate.
        </>
      );

    case MessageCode.PullRestartRequired:
      return (
        <ComponentFormWarning>
          {
        `Changes are available but cannot be pulled, contact your development team for \
assistance. (code ${MessageCode.PullRestartRequired})`
          }
        </ComponentFormWarning>
      );

    case MessageCode.PullUpstreamAbort:
      return (
        <ComponentFormWarning>
          Upstream changes are available but cannot be fetched via the UI.
        </ComponentFormWarning>
      );

    case MessageCode.PullNonContentOnly:
      return (
        <ComponentFormWarning>
          {
            `Changes are available but cannot be pulled, contact your development team for \
assistance. (code ${MessageCode.PullNonContentOnly})`
          }
        </ComponentFormWarning>
      );

    case MessageCode.PullErrored:
      return (
        <ComponentFormWarning>
          {
            `An error has occurred, please try Pull again in a few minutes.
            (code ${MessageCode.PullErrored})`
          }
        </ComponentFormWarning>
      );

    default:
      return <Spinner />;
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
  props: PropsWithFormApi & PropsWithGitClient & PropsWithNotify & PropsWithUi,
) => {
  const {
    client, formApi, notifyOfChanges, ui
  } = props;
  const [state, setState] = useState<MessageProps>({
    messageCode: MessageCode.Default,
    messageData: '',
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

        const { production, upstream, local } = getRemoteStatus(response.data);
        // @todo: refactor the if conditions.
        if (production.hasUpdates) {
          // @todo: refactor restart check with function.
          formApi.setValue('keepOpen', true);
          if (production.files.some(file => file.includes('package-lock.json'))) {
            setState({ messageCode: MessageCode.PullRestartRequired, messageData: [] });
            formApi.setValue('mergeMain', false);
            formApi.setValue('keepOpen', false);
          } else if (!local.hasUpdates && !upstream.hasUpdates) {
            // No local changes.
            setState({ messageCode: MessageCode.PullChangeAvailable, messageData: [] });
            formApi.setValue('mergeMain', true);
          } else {
            // Check production-upstream branch conflict.
            const upstreamConflicts = await client.getConflicts();

            if (upstreamConflicts.status !== 200) {
              throw new Error(`Error checking conflicts with the main branch, status=${response.status}`);
            }

            if (upstreamConflicts.data.hasConflict) {
              if (!isContentOnly(upstreamConflicts.data.files)) {
                setState({ messageCode: MessageCode.PullNonContentOnly, messageData: [] });
                formApi.setValue('mergeMain', false);
                formApi.setValue('keepOpen', false);
              } else if (upstream.hasUpdates) {
                // Production conflict with upstream with un-pulled upstream updates
                // Updates can't be merged.
                setState({ messageCode: MessageCode.PullConflictAbort, messageData: [] });
                formApi.setValue('mergeMain', false);
                formApi.setValue('keepOpen', false);
              } else {
                // Production conflict with upstream and no extra commits on upstream to local,
                // then check production/local conflict to get conflict file list.
                const localConflictsResponse = await client.getConflicts('edit');
                const pages = uniq([
                  ...upstreamConflicts.data.pages,
                  ...localConflictsResponse.data.pages,
                ]);
                const site = uniq([
                  ...upstreamConflicts.data.site,
                  ...localConflictsResponse.data.site,
                ]);
                setState({
                  messageCode: MessageCode.PullConflictConfirm,
                  messageData: { pages, site },
                });
                formApi.setValue('mergeMain', true);
              }
            } else {
              // No production/upstream conflict, further check produciton/local
              const localConflictsResponse = await client.getConflicts('edit');
              if (localConflictsResponse.data.hasConflict) {
                const { pages } = localConflictsResponse.data;
                const { site } = localConflictsResponse.data;
                setState({
                  messageCode: MessageCode.PullConflictConfirm,
                  messageData: { pages, site },
                });
                formApi.setValue('mergeMain', true);
              } else {
                // If there are conflicts between CHANGESET and EDIT, but no conflicts with
                // PRODUCTION, then these are resolved silently in favor of EDIT.
                setState({ messageCode: MessageCode.PullChangeAvailable, messageData: [] });
                formApi.setValue('mergeMain', true);
              }
            }
          }
        } else if (upstream.hasUpdates) {
          setState({ messageCode: MessageCode.PullChangeAvailable, messageData: [] });
          formApi.setValue('mergeMain', true);
          formApi.setValue('keepOpen', true);
        } else {
          setState({ messageCode: MessageCode.PullNoChange, messageData: [] });
          formApi.setValue('mergeMain', false);
          formApi.setValue('keepOpen', false);
        }
      } catch (error) {
        setState({
          messageCode: MessageCode.PullErrored,
          messageData: (error as any).message,
        });
      } finally {
        notifyOfChanges();
        context.hidePageOverlay();
      }
    })();
  }, []);
  const { messageCode, messageData } = state;
  return <FormMessages messageCode={messageCode} messageData={messageData} ui={ui} />;
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
  props: PropsWithFormApi & PropsWithGitClient & PropsWithNotify & PropsWithUi,
) => {
  const {
    client, formApi, notifyOfChanges, ui,
  } = props;
  const { Spinner } = getUI(ui);
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

        if (formApi.getValue('mergeMain')) {
          const mergeResponse = await client.mergeMain();
          if (mergeResponse.status !== 200) {
            throw new Error(`Error merging production changes to upstream, status=${mergeResponse.status}`);
          }
          formApi.setValue('mergeMain', false);
        }

        const response = await client.pull();
        if (response.status !== 200) {
          throw new Error(`Error pulling changes, status=${response.status}`);
        }
        setPullStatus({ complete: true });
        formApi.setValue('refreshWhenDone', true);
      } catch (error) {
        setPullStatus({
          complete: false,
          error: (error as any).message || 'An unexpected error has occurred.',
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
    return <>Pull success, your Edit Environment is up to date!</>;
  }
  return <Spinner />;
};

export default RemoteChanges;
export { PullChanges, FetchChanges };
