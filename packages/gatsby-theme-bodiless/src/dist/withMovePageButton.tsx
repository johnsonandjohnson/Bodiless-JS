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

/* eslint-disable no-alert */
import React, {
  useCallback,
  useEffect,
  useState,
  ComponentType,
  HTMLProps,
} from 'react';
import { flow } from 'lodash';
import {
  contextMenuForm,
  useMenuOptionUI,
  useEditContext,
  withMenuOptions,
  ContextMenuProvider,
  ContextSubMenu,
  useNode,
} from '@bodiless/core';
import { AxiosPromise } from 'axios';
import {
  addClasses, removeClasses, StylableProps,
} from '@bodiless/fclasses';
import { ComponentFormSpinner } from '@bodiless/ui';
import BackendClient from './BackendClient';
import handle from './ResponseHandler';
import { getPathValue, PageURLField } from './PageOperations';

type Client = {
  movePage: (origin: string, destination: string) => AxiosPromise<any>;
};

enum MovePageState {
  Init,
  Pending,
  Complete,
  Errored,
}

type MovePageProps = {
  status: MovePageState;
  errorMessage?: string;
};

let actualState: number = -1;

let destinationGlb: string = '';

const usePagePath = () => useNode().node.pagePath;

const hasPageChild = async ({ pathChild, client } : any) => {
  const result = await handle(client.directoryChild(pathChild));
  if (result.response && result.message === 'Success') {
    return Promise.resolve();
  }
  return Promise.reject(new Error(result.message));
};

const movePage = async ({ origin, destination, client } : any) => {
  try {
    await handle(client.clonePage(origin, destination));
  } catch (e) {
    return Promise.reject(new Error(e.message));
  }

  const result = await handle(client.directoryChild(origin));
  if (result.response && result.message === 'Success') {
    try {
      await handle(client.deletePage(origin));
    } catch (e) {
      return Promise.reject(new Error(e.message));
    }
  } else {
    try {
      await handle(client.removeFile(origin));
    } catch (e) {
      return Promise.reject(new Error(e.message));
    }
  }

  if (result.response) {
    if (result.message !== 'Success' && typeof (result.message) === 'string') {
      return Promise.reject(new Error(result.message));
    }
    return Promise.resolve();
  }
  return Promise.reject(new Error('The page cannot be moved.'));
};

const MovePageComp = (props : MovePageProps) => {
  const {
    status, errorMessage,
  } = props;
  const basePathValue = usePagePath();

  const defaultUI = useMenuOptionUI();
  const {
    ComponentFormLabel,
    ComponentFormLink,
    ComponentFormDescription,
    ComponentFormWarning,
    ComponentFormTitle,
  } = defaultUI;
  const formTitle = 'Move';
  switch (status) {
    case MovePageState.Init: {
      const CustomComponentFormLabel = flow(
        removeClasses('bl-text-xs'),
        addClasses('bl-font-bold bl-text-sm'),
      )(ComponentFormLabel as ComponentType<StylableProps>);
      const CustomComponentFormLink = flow(
        removeClasses('bl-block'),
        addClasses('bl-italic'),
      )(ComponentFormLink as ComponentType<StylableProps>);
      const CustomComponentFormWarning = flow(
        removeClasses('bl-float-left'),
      )(ComponentFormWarning);
      const ui: object = {
        ...defaultUI,
        ComponentFormLabel: CustomComponentFormLabel as ComponentType<HTMLProps<HTMLLabelElement>>,
        ComponentFormLink: CustomComponentFormLink as ComponentType<HTMLProps<HTMLAnchorElement>>,
        ComponentFormWarning: CustomComponentFormWarning,
      };
      return (
        <>
          <ContextMenuProvider ui={ui}>
            <ComponentFormTitle>{formTitle}</ComponentFormTitle>
            <ComponentFormDescription>Move this page to a new URL.</ComponentFormDescription>
            <CustomComponentFormLabel>Current URL</CustomComponentFormLabel>
            <ComponentFormDescription>{basePathValue}</ComponentFormDescription>
            <PageURLField
              validateOnChange
              validateOnBlur
            />
          </ContextMenuProvider>
        </>
      );
    }
    case MovePageState.Pending:
      return (
        <>
          <ComponentFormTitle>Moving Page</ComponentFormTitle>
          <ComponentFormSpinner />
        </>
      );
    case MovePageState.Complete:
      return (
        <>
          <ComponentFormTitle>{formTitle}</ComponentFormTitle>
          <ComponentFormDescription>
            Move operation was successful. Upon closing this dialog you will be redirected to the
            new page’s url.
          </ComponentFormDescription>
        </>
      );
    case MovePageState.Errored:
      return (
        <>
          <ComponentFormTitle>{formTitle}</ComponentFormTitle>
          <ComponentFormWarning>{errorMessage}</ComponentFormWarning>
        </>
      );
    default: return (<></>);
  }
};

const redirectPage = (values: {keepOpen: boolean, path?: string}) => {
  if (values.keepOpen || actualState === MovePageState.Errored || typeof window === 'undefined') {
    actualState = -1;
    return;
  }

  actualState = -1;

  // Uses replace to redirect since child page no longer exists.
  window.location.replace(destinationGlb);
};

const formPageMove = (client: Client) => contextMenuForm({
  submitValues: ({ keepOpen }: any) => keepOpen,
  hasSubmit: ({ keepOpen }: any) => keepOpen,
  onClose: redirectPage,
})(({ formState, formApi } : any) => {
  const { ComponentFormText } = useMenuOptionUI();

  const origin = usePagePath();

  const {
    submits, invalid, values,
  } = formState;
  const [state, setState] = useState<MovePageProps>({
    status: MovePageState.Init,
  });
  const context = useEditContext();
  const path = getPathValue(values);
  const pathChild = (typeof window !== 'undefined') ? window.location.pathname : '';

  useEffect(() => {
    if (pathChild === '/') {
      actualState = MovePageState.Errored;
      setState({ status: MovePageState.Errored, errorMessage: 'The page cannot be moved.' });
      formApi.setValue('keepOpen', false);
    } else {
      hasPageChild({ pathChild, client })
        .catch(() => {
          actualState = MovePageState.Errored;
          setState({ status: MovePageState.Errored, errorMessage: 'The page cannot be moved while it has child pages.' });
          formApi.setValue('keepOpen', false);
        });
    }

    if (submits && path && invalid === false) {
      const pathArray = path.split('/');
      pathArray.splice(-2, 1);
      const destination = pathArray.join('/');
      destinationGlb = path;
      const originClear = origin.slice(0, -1);

      if (destination === originClear) {
        actualState = MovePageState.Errored;
        setState({ status: MovePageState.Errored, errorMessage: 'The page cannot be moved.' });
        formApi.setValue('keepOpen', false);
      } else {
        context.showPageOverlay({ hasSpinner: false });
        actualState = MovePageState.Pending;
        setState({ status: MovePageState.Pending });

        movePage({
          origin,
          destination: path,
          client,
        })
          .then(() => {
            actualState = MovePageState.Complete;
            setState({ status: MovePageState.Complete });
          })
          .catch((err: Error) => {
            actualState = MovePageState.Errored;
            setState({ status: MovePageState.Errored, errorMessage: err.message });
          })
          .finally(() => {
            context.hidePageOverlay();
            formApi.setValue('keepOpen', false);
          });
      }
    }
  }, [submits]);
  const { status, errorMessage } = state;
  return (
    <>
      <ComponentFormText type="hidden" field="keepOpen" initialValue />
      <MovePageComp
        status={status}
        errorMessage={errorMessage}
      />
    </>
  );
});

const defaultClient = new BackendClient();

const useMenuOptions = () => {
  const context = useEditContext();

  const menuOptions = [
    {
      name: 'page-group',
      icon: 'description',
      label: 'Page',
      Component: ContextSubMenu,
    },
    {
      name: 'move',
      icon: 'drive_file_move',
      label: 'Move',
      group: 'page-group',
      isHidden: useCallback(() => !context.isEdit, []),
      handler: () => formPageMove(defaultClient),
    },
  ];
  return menuOptions;
};

const withMovePageButton = withMenuOptions({
  useMenuOptions,
  name: 'MovePage',
  root: true,
});

export default withMovePageButton;
