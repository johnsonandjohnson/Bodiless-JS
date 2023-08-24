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
  useState, useEffect, useCallback, useMemo,
} from 'react';
import {
  getUI,
  useGetter,
  useEditContext,
  ContextSubMenu,
  useRegisterMenuOptions,
  contextMenuForm,
  useNotify,
  BodilessBackendClient,
  PageEditContext,
} from '@bodiless/core';
import type { TMenuOption } from '@bodiless/core';
import CommitsList from './CommitsList';
import RemoteChanges from './RemoteChanges';
import Reset from './Reset';
import SaveChanges from './SaveChanges';
import { GitClient } from './types';

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

const formGetCommitsList = (client: GitClient) => contextMenuForm({
  // @todo: handle what happens when user selects a commit from the loaded list.
  submitValues: () => { },
  hasSubmit: false,
})(
  ({ ui }: any) => {
    const { ComponentFormTitle } = getUI(ui);
    return (
      <>
        <ComponentFormTitle>Latest Commits</ComponentFormTitle>
        <CommitsList client={client} ui={ui} />
      </>
    );
  },
);

const formGitCommit = (client: GitClient) => contextMenuForm({
  submitValues: ({ keepOpen }: any) => keepOpen,
  hasSubmit: ({ keepOpen }: any) => keepOpen,
})(({ ui, formApi, formState }: any) => {
  const { ComponentFormText } = getUI(
    ui,
  );
  return (
    <>
      <ComponentFormText type="hidden" name="keepOpen" initialValue />
      <SaveChanges ui={ui} formState={formState} formApi={formApi} client={client} />
    </>
  );
});

const formGitPull = (client: GitClient, notifyOfChanges?: ChangeNotifier) => contextMenuForm({
  submitValues: (values: any) => {
    const { keepOpen } = values;
    return keepOpen;
  },
  onClose: ({ refreshWhenDone }) => {
    if (refreshWhenDone) {
      window.location.reload();
    }
  },
  hasSubmit: ({ keepOpen }) => keepOpen as boolean,
})(({ ui }: any) => {
  const { ComponentFormTitle, ComponentFormText } = getUI(ui);
  return (
    <>
      <ComponentFormTitle>Pull Changes</ComponentFormTitle>
      <ComponentFormText type="hidden" name="keepOpen" initialValue={false} />
      <ComponentFormText type="hidden" name="mergeMain" initialValue={false} />
      <ComponentFormText type="hidden" name="refreshWhenDone" initialValue={false} />
      <RemoteChanges client={client} notifyOfChanges={notifyOfChanges} ui={ui} />
    </>
  );
});

const formGitReset = (client: GitClient) => contextMenuForm({
  submitValues: (submittedValues: any) => {
    const { keepOpen } = submittedValues;
    if (keepOpen === false) window.location.reload();
    return keepOpen;
  },
  onClose: ({ reload }) => {
    if (reload === true) {
      window.location.reload();
    }
  },
  hasSubmit: ({ keepOpen }) => keepOpen as boolean,
})(
  ({ ui, formState, formApi }: any) => {
    const { ComponentFormText } = getUI(ui);
    return (
      <>
        <ComponentFormText type="hidden" name="keepOpen" initialValue />
        <ComponentFormText type="hidden" name="reload" initialValue={false} />
        <Reset ui={ui} formState={formState} formApi={formApi} client={client} />
      </>
    );
  },
);

const defaultClient = new BodilessBackendClient();

export enum GitButtons {
  Push = 'saveChanges',
  File = 'file',
  Pull = 'pull',
  Revert = 'resetChanges',
  History = 'listCommits',
}

const getMenuOptions = (
  client: GitClient,
  context: any,
  notifyOfChanges?: ChangeNotifier,
  filter?: GitButtons[],
): TMenuOption[] => {
  const saveChanges = canCommit ? formGitCommit(client) : undefined;
  const buttons: TMenuOption[] = [
    {
      name: GitButtons.File,
      label: 'File',
      icon: 'cloud',
      Component: ContextSubMenu,
    },
    {
      name: GitButtons.Pull,
      label: 'Update',
      icon: 'cloud_download',
      handler: () => formGitPull(client, notifyOfChanges),
      group: 'file',
    },
    {
      name: GitButtons.Push,
      icon: 'cloud_upload',
      label: 'Save',
      isDisabled: () => !canCommit,
      handler: () => saveChanges,
      group: 'file',
    },
    {
      name: GitButtons.History,
      icon: 'book',
      label: 'History',
      handler: () => formGetCommitsList(client),
      group: 'file',
    },
    {
      name: GitButtons.Revert,
      label: 'Revert',
      icon: 'undo',
      isHidden: () => !context.isEdit,
      handler: () => formGitReset(client),
      group: 'file',
    },
  ];
  return buttons.filter(b => !filter || !filter.includes(b.name as GitButtons));
};

export type ChangeNotifier = () => Promise<void>;

const useGitNotify = ({ client = defaultClient } = {}) => {
  const [notifications, setNotifications] = useState([] as any);

  useNotify(notifications);

  // Quickly [double-]check for changes in the upstream and main branches
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

  return notifyOfChanges;
};

type UseGitButtonOptions = {
  client?: BodilessBackendClient,
  excludeButtons?: GitButtons[],
};

type UseGitButtons = (options?: UseGitButtonOptions) => void;

const useGitButtons: UseGitButtons = ({
  client = defaultClient,
  excludeButtons,
} = {}) => {
  const context = useEditContext();

  const notifyOfChanges = useGitNotify({ client });

  const menuOptions = useMemo(
    () => getMenuOptions(client, context, notifyOfChanges, excludeButtons), [notifyOfChanges],
  );

  useRegisterMenuOptions({
    getMenuOptions: useGetter(menuOptions),
    name: 'Git',
  }, PageEditContext.root);
};

export default useGitButtons;
