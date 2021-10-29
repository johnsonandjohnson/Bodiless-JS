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
  ComponentType,
  HTMLProps,
  useCallback, useEffect, useState,
} from 'react';
import {
  contextMenuForm,
  useMenuOptionUI,
  useEditContext,
  withMenuOptions,
  ContextMenuProvider,
  ContextSubMenu,
} from '@bodiless/core';
import { AxiosPromise } from 'axios';
import {
  addClasses, asToken, removeClasses, StylableProps,
} from '@bodiless/fclasses';
import { ComponentFormSpinner } from '@bodiless/ui';
import flow from 'lodash/flow';
import BackendClient from './BackendClient';
import handle from './ResponseHandler';

type Client = {
  deletePage: (path: string) => AxiosPromise<any>;
};

enum DeletePageState {
  Init,
  Pending,
  Complete,
  Errored,
}

type DeletePageProps = {
  status: DeletePageState;
  errorMessage?: string;
};

let actualState: number = -1;

const hasPageChild = async ({ path, client } : any) => {
  const result = await handle(client.directoryChild(path));
  if (result.response && result.message === 'Success') {
    return Promise.resolve();
  }
  return Promise.reject(new Error(result.message));
};

const deletePage = async ({ path, client } : any) => {
  const result = await handle(client.deletePage(path));
  if (result.response) {
    if (result.message !== 'Success' && typeof (result.message) === 'string') {
      return Promise.reject(new Error(result.message));
    }
    return Promise.resolve();
  }
  return Promise.reject(new Error('The page cannot be deleted.'));
};

const DeletePageForm = (props : DeletePageProps) => {
  const {
    status, errorMessage,
  } = props;
  const defaultUI = useMenuOptionUI();
  const {
    ComponentFormDescription,
    ComponentFormWarning,
    ComponentFormTitle,
    ComponentFormLabel,
  } = defaultUI;
  const formTitle = 'Delete Page';

  switch (status) {
    case DeletePageState.Init: {
      const CustomComponentFormLabel = flow(
        removeClasses('bl-text-xs'),
        addClasses('bl-font-bold bl-text-base'),
      )(ComponentFormLabel as ComponentType<StylableProps>);
      const ui: object = {
        ...defaultUI,
        ComponentFormLabel: CustomComponentFormLabel as ComponentType<HTMLProps<HTMLLabelElement>>,
        ComponentFormLink: asToken(removeClasses('bl-block'), addClasses('bl-italic')),
        ComponentFormWarning: removeClasses('bl-float-left'),
        ComponentFormTitle: addClasses('bl-italic'),
      };
      return (
        <>
          <ContextMenuProvider ui={ui}>
            <ComponentFormTitle>{formTitle}</ComponentFormTitle>
            <CustomComponentFormLabel>
              Are you sure you want to delete the current page?
            </CustomComponentFormLabel>
          </ContextMenuProvider>
        </>
      );
    }
    case DeletePageState.Pending:
      return (
        <>
          <ComponentFormTitle>Deleting Page</ComponentFormTitle>
          <ComponentFormSpinner />
        </>
      );
    case DeletePageState.Complete: {
      const CustomComponentFormLabel = flow(
        removeClasses('bl-text-xs'),
        addClasses('bl-font-bold bl-text-base'),
      )(ComponentFormLabel as ComponentType<StylableProps>);
      const ui: object = {
        ...defaultUI,
        ComponentFormLabel: CustomComponentFormLabel as ComponentType<HTMLProps<HTMLLabelElement>>,
      };
      return (
        <>
          <ContextMenuProvider ui={ui}>
            <ComponentFormTitle>{formTitle}</ComponentFormTitle>
            <CustomComponentFormLabel>Delete operation was successful.</CustomComponentFormLabel>
            <ComponentFormDescription>
              Upon closing this dialog you will be redirected to the deleted page’s parent page.
            </ComponentFormDescription>
          </ContextMenuProvider>

        </>
      );
    }
    case DeletePageState.Errored:
      return (
        <>
          <ComponentFormTitle>{formTitle}</ComponentFormTitle>
          <ComponentFormWarning>{errorMessage}</ComponentFormWarning>
        </>
      );
    default: return (<></>);
  }
};

const redirectPage = (values: {keepOpen: boolean, path?: string }) => {
  if (values.keepOpen || actualState === DeletePageState.Errored || typeof window === 'undefined') {
    actualState = -1;
    return;
  }

  actualState = -1;

  const { href } = window.location;
  const hrefArray = href.split('/');

  // Handle paths withtout '/' at the end.
  if (hrefArray[hrefArray.length - 1] !== '') hrefArray.push('');

  // Removes last child path from href array.
  hrefArray.splice(-2, 1);

  const parentHref = hrefArray.join('/');
  // Uses replace to redirect since child page no longer exists.
  window.location.replace(parentHref);
};

const formPageDel = (client: Client) => contextMenuForm({
  submitValues: ({ keepOpen }: any) => keepOpen,
  hasSubmit: ({ keepOpen }: any) => keepOpen,
  onClose: redirectPage,
})(({ formState, formApi } : any) => {
  const { ComponentFormText } = useMenuOptionUI();
  const {
    submits,
  } = formState;
  const [state, setState] = useState<DeletePageProps>({
    status: DeletePageState.Init,
  });
  const context = useEditContext();
  const path = (typeof window !== 'undefined') ? window.location.pathname : '';

  useEffect(() => {
    if (path === '/') {
      actualState = DeletePageState.Errored;
      setState({ status: DeletePageState.Errored, errorMessage: 'The page cannot be deleted.' });
      formApi.setValue('keepOpen', false);
    } else {
      hasPageChild({ path, client })
        .catch((err: Error) => {
          actualState = DeletePageState.Errored;
          setState({ status: DeletePageState.Errored, errorMessage: err.message });
          formApi.setValue('keepOpen', false);
        });
    }

    if (submits && path) {
      context.showPageOverlay({ hasSpinner: false });
      actualState = DeletePageState.Pending;
      setState({ status: DeletePageState.Pending });

      // Delete the page.
      deletePage({ path, client })
        .then(() => {
          actualState = DeletePageState.Complete;
          setState({ status: DeletePageState.Complete });
        })
        .catch((err: Error) => {
          actualState = DeletePageState.Errored;
          setState({ status: DeletePageState.Errored, errorMessage: err.message });
        })
        .finally(() => {
          context.hidePageOverlay();
          formApi.setValue('keepOpen', false);
        });
    }
  }, [submits]);
  const { status, errorMessage } = state;

  return (
    <>
      <ComponentFormText type="hidden" field="keepOpen" initialValue />
      <DeletePageForm
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
      name: 'deletepage',
      icon: 'delete',
      label: 'Delete',
      group: 'page-group',
      isHidden: useCallback(() => !context.isEdit, []),
      handler: () => formPageDel(defaultClient),
    },
  ];
  return menuOptions;
};

const withDeletePageButton = withMenuOptions({
  useMenuOptions,
  name: 'DeletePage',
  root: true,
});

export default withDeletePageButton;
