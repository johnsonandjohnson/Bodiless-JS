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
  FC, useState, useEffect, useCallback,
} from 'react';
import {
  contextMenuForm,
  getUI,
  PageContextProvider,
  TMenuOption,
  useEditContext,
  useNotify,
} from '@bodiless/core';
import BackendClient from './BackendClient';
import CommitsList from './CommitsList';
import RemoteChanges from './RemoteChanges';
import Reset from './Reset';
import SaveChanges from './SaveChanges';
import { GitClient } from './types';

// const backendFilePath = process.env.BODILESS_BACKEND_DATA_FILE_PATH || '';
// const backendStaticPath = process.env.BODILESS_BACKEND_STATIC_PATH || '';
/**
 * DefinePlugin env var.
 *
 * All env vars are stringified by the Webpack DefinePlugin.
 * https://webpack.js.org/plugins/define-plugin/#usageGatsby.
 *
 * DefinePlugin is used by Gatsby to source env vars.
 * https://www.gatsbyjs.org/docs/environment-variables/#example.
 */
const canCommit = (process.env.BODILESS_BACKEND_COMMIT_ENABLED || '0') === '1';
const canAlertOnLoad = process.env.BODILESS_ALERT_ON_PAGE_LOAD_ENABLED || 1;

type Props = {
  client?: GitClient,
};

const formGetCommitsList = (client: GitClient) => contextMenuForm({
  // @todo: handle what happens when user selects a commit from the loaded list.
  submitValues: () => {},
})(
  ({ ui }: any) => {
    const { ComponentFormTitle } = getUI(ui);
    return (
      <>
        <ComponentFormTitle>Latest Commits</ComponentFormTitle>
        <CommitsList client={client} />
      </>
    );
  },
);

const formGitCommit = (client: GitClient) => contextMenuForm({
  submitValues: ({ keepOpen } : any) => keepOpen,
})(({ ui, formApi, formState }: any) => {
  const { ComponentFormText } = getUI(
    ui,
  );
  return (
    <>
      <ComponentFormText type="hidden" field="keepOpen" initialValue />
      <SaveChanges ui={ui} formState={formState} formApi={formApi} client={client} />
    </>
  );
});

const formGitPull = (client: GitClient, notifyOfChanges: ChangeNotifier) => contextMenuForm({
  submitValues: (values : any) => {
    const { keepOpen } = values;
    return keepOpen;
  },
  onClose: ({ refreshWhenDone }) => {
    if (refreshWhenDone) {
      window.location.reload();
    }
  },
})(({ ui }: any) => {
  const { ComponentFormTitle, ComponentFormText } = getUI(ui);
  return (
    <>
      <ComponentFormTitle>Pull Changes</ComponentFormTitle>
      <ComponentFormText type="hidden" field="keepOpen" initialValue={false} />
      <ComponentFormText type="hidden" field="mergeMaster" initialValue={false} />
      <ComponentFormText type="hidden" field="refreshWhenDone" initialValue={false} />
      <RemoteChanges client={client} notifyOfChanges={notifyOfChanges} />
    </>
  );
});

const formGitReset = (client: GitClient) => contextMenuForm({
  submitValues: (submittedValues: any) => {
    const { keepOpen } = submittedValues;
    if (keepOpen === false) window.location.reload();
    return keepOpen;
  },
})(
  ({ ui, formState, formApi }: any) => {
    const { ComponentFormText } = getUI(ui);
    return (
      <>
        <ComponentFormText type="hidden" field="keepOpen" initialValue />
        <Reset ui={ui} formState={formState} formApi={formApi} client={client} />
      </>
    );
  },
);

const defaultClient = new BackendClient();

const getMenuOptions = (
  client: GitClient = defaultClient,
  context: any,
  notifyOfChanges: ChangeNotifier,
): TMenuOption[] => {
  const saveChanges = canCommit ? formGitCommit(client) : undefined;
  return [
    {
      name: 'listCommits',
      icon: 'book',
      label: 'History',
      handler: () => formGetCommitsList(client),
    },
    {
      name: 'savechanges',
      icon: 'cloud_upload',
      label: 'Push',
      isDisabled: () => !canCommit,
      handler: () => saveChanges,
    },
    {
      name: 'Pull',
      label: 'Pull',
      icon: 'cloud_download',
      handler: () => formGitPull(client, notifyOfChanges),
    },
    {
      name: 'resetchanges',
      label: 'Revert',
      icon: 'undo',
      isHidden: () => !context.isEdit,
      handler: () => formGitReset(client),
    },
  ];
};

export type ChangeNotifier = () => Promise<void>;

const GitProvider: FC<Props> = ({ children, client = defaultClient }) => {
  const [notifications, setNotifications] = useState([] as any);
  const context = useEditContext();

  useNotify(notifications);

  // Quickly [double-]check for changes in the upstream and master branches
  // and send notifications to the "Alerts" section.
  // Will perform on page load and after each fetch or push action initiated from UI.
  const notifyOfChanges: ChangeNotifier = useCallback(
    async () => {
      try {
        const response = await client.getChanges();
        if (response.status !== 200) {
          throw new Error('Fetching upstream changes failed');
        }
        const updatedRemoteBranches = Object.keys(response.data).filter(branch => (
          ['upstream', 'production'].includes(branch) && response.data[branch].commits.length
        ));
        const isBranchOutdated = Boolean(updatedRemoteBranches.length);
        if (isBranchOutdated) {
          setNotifications([
            {
              id: 'upstreamChanges',
              message: 'Your branch is outdated. Please pull remote changes.',
            },
          ]);
        } else if (notifications.length) {
          setNotifications([]);
        }
      } catch {
        // Fail silently.
      }
    },
    [notifications, setNotifications],
  );

  useEffect(() => {
    if (canAlertOnLoad) {
      notifyOfChanges();
    }
  }, []);

  return (
    <PageContextProvider
      getMenuOptions={() => getMenuOptions(client, context, notifyOfChanges)}
      name="Git"
    >
      {children}
    </PageContextProvider>
  );
};

export default GitProvider;
